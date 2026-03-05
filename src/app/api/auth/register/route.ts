/**
 * POST /api/auth/register
 * Enterprise-grade registration handler with:
 *  - Zod schema validation (builder vs company discriminated union)
 *  - Duplicate email/handle detection
 *  - bcrypt password hashing
 *  - JWT session cookie
 *  - Structured error responses
 */

import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import {
    builderRegistrationSchema,
    companyRegistrationSchema,
} from "@/lib/validation";
import { hashPassword, setAuthCookie } from "@/lib/auth";
import { findByEmail, findByHandle, saveUser, toPublicUser } from "@/lib/db";
import type { User } from "@/lib/db";

function generateId(): string {
    // crypto.randomUUID available in Node 19+ and all modern environments
    return crypto.randomUUID();
}

/* ─── Rate Limiting (in-memory, production should use Redis) ──── */
const registerAttempts = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = { max: 5, windowMs: 15 * 60 * 1000 }; // 5 per 15 min

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = registerAttempts.get(ip);
    if (!entry || now > entry.resetAt) {
        registerAttempts.set(ip, { count: 1, resetAt: now + RATE_LIMIT.windowMs });
        return false;
    }
    if (entry.count >= RATE_LIMIT.max) return true;
    entry.count++;
    return false;
}

/* ─── Handler ─────────────────────────────────────────────────── */
export async function POST(req: NextRequest) {
    // Rate limit by IP
    const ip = req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "unknown";
    if (isRateLimited(ip)) {
        return NextResponse.json(
            { success: false, error: "Too many registration attempts. Please try again in 15 minutes." },
            { status: 429 }
        );
    }

    let body: unknown;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json(
            { success: false, error: "Invalid request body" },
            { status: 400 }
        );
    }

    // Choose schema based on account type
    const type = (body as Record<string, unknown>)?.type;
    if (type !== "builder" && type !== "company") {
        return NextResponse.json(
            { success: false, error: "Account type must be 'builder' or 'company'" },
            { status: 400 }
        );
    }

    const schema = type === "builder" ? builderRegistrationSchema : companyRegistrationSchema;

    let parsed;
    try {
        parsed = schema.parse(body);
    } catch (err) {
        if (err instanceof ZodError) {
            const fieldErrors = err.flatten().fieldErrors;
            const nestedErrors = err.flatten().formErrors;
            return NextResponse.json(
                {
                    success: false,
                    error: "Validation failed",
                    fieldErrors,
                    formErrors: nestedErrors,
                },
                { status: 400 }
            );
        }
        throw err;
    }

    // Duplicate checks
    if (findByEmail(parsed.email)) {
        return NextResponse.json(
            { success: false, error: "An account with this email already exists", field: "email" },
            { status: 409 }
        );
    }
    if (findByHandle(parsed.handle)) {
        return NextResponse.json(
            { success: false, error: "This handle is already taken", field: "handle" },
            { status: 409 }
        );
    }

    // Hash password
    const passwordHash = await hashPassword(parsed.password);
    const now = new Date().toISOString();

    // Build user record
    const user: User = {
        id: generateId(),
        type: parsed.type,
        fullName: parsed.fullName,
        email: parsed.email,
        passwordHash,
        handle: parsed.handle,
        profilePhotoUrl: parsed.profilePhotoUrl,
        country: parsed.country,
        createdAt: now,
        updatedAt: now,
        isVerified: false,
        referralSource: parsed.referralSource,
        newsletterSubscribed: parsed.newsletterSubscribed ?? false,
        profile: parsed.profile,
    };

    // Persist
    const saved = saveUser(user);
    const publicUser = toPublicUser(saved);

    // Set JWT cookie
    await setAuthCookie(publicUser);

    return NextResponse.json(
        {
            success: true,
            message: "Account created successfully",
            user: publicUser,
        },
        { status: 201 }
    );
}
