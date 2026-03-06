/**
 * Auth routes — Express router
 * POST /auth/register, GET /auth/me, POST /auth/logout,
 * GET /auth/check-email, GET /auth/check-handle
 */

import { Router, Request, Response } from "express";
import { ZodError } from "zod";
import {
    builderRegistrationSchema,
    companyRegistrationSchema,
} from "../lib/validation";
import { hashPassword, signToken, verifyToken, COOKIE_NAME, COOKIE_MAX_AGE } from "../lib/auth";
import { findByEmail, findByHandle, findById, saveUser, toPublicUser } from "../lib/db";
import type { User, PublicUser } from "../lib/db";
import crypto from "crypto";

const router = Router();

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

/* ─── POST /auth/register ─────────────────────────────────────── */
router.post("/register", async (req: Request, res: Response): Promise<void> => {
    const ip = req.headers["x-forwarded-for"] as string ?? req.ip ?? "unknown";
    if (isRateLimited(ip)) {
        res.status(429).json({
            success: false,
            error: "Too many registration attempts. Please try again in 15 minutes.",
        });
        return;
    }

    const body = req.body;

    // Choose schema based on account type
    const type = body?.type;
    if (type !== "builder" && type !== "company") {
        res.status(400).json({
            success: false,
            error: "Account type must be 'builder' or 'company'",
        });
        return;
    }

    const schema = type === "builder" ? builderRegistrationSchema : companyRegistrationSchema;

    let parsed;
    try {
        parsed = schema.parse(body);
    } catch (err) {
        if (err instanceof ZodError) {
            const fieldErrors = err.flatten().fieldErrors;
            const nestedErrors = err.flatten().formErrors;
            res.status(400).json({
                success: false,
                error: "Validation failed",
                fieldErrors,
                formErrors: nestedErrors,
            });
            return;
        }
        throw err;
    }

    // Duplicate checks
    if (findByEmail(parsed.email)) {
        res.status(409).json({
            success: false,
            error: "An account with this email already exists",
            field: "email",
        });
        return;
    }
    if (findByHandle(parsed.handle)) {
        res.status(409).json({
            success: false,
            error: "This handle is already taken",
            field: "handle",
        });
        return;
    }

    // Hash password
    const passwordHash = await hashPassword(parsed.password);
    const now = new Date().toISOString();

    // Build user record
    const user: User = {
        id: crypto.randomUUID(),
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
    const publicUser: PublicUser = toPublicUser(saved);

    // Set JWT cookie
    const token = signToken({
        userId: publicUser.id,
        email: publicUser.email,
        handle: publicUser.handle,
        type: publicUser.type,
    });

    res.cookie(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: COOKIE_MAX_AGE,
        path: "/",
    });

    res.status(201).json({
        success: true,
        message: "Account created successfully",
        user: publicUser,
    });
});

/* ─── GET /auth/me ────────────────────────────────────────────── */
router.get("/me", (req: Request, res: Response): void => {
    try {
        const token = req.cookies?.[COOKIE_NAME];
        if (!token) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        const payload = verifyToken(token);
        if (!payload) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        const user = findById(payload.userId);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        res.json(toPublicUser(user));
    } catch (error) {
        console.error("API Error in /api/auth/me:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

/* ─── POST /auth/logout ───────────────────────────────────────── */
router.post("/logout", (_req: Request, res: Response): void => {
    res.clearCookie(COOKIE_NAME, { path: "/" });
    res.json({ success: true, message: "Logged out successfully" });
});

/* ─── GET /auth/check-email?email=xyz ─────────────────────────── */
router.get("/check-email", (req: Request, res: Response): void => {
    const email = req.query.email as string | undefined;

    if (!email) {
        res.status(400).json({ available: false, error: "Email required" });
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        res.status(400).json({ available: false, error: "Invalid email format" });
        return;
    }

    const taken = !!findByEmail(email.toLowerCase());
    res.json({ available: !taken });
});

/* ─── GET /auth/check-handle?handle=xyz ───────────────────────── */
router.get("/check-handle", (req: Request, res: Response): void => {
    const handle = req.query.handle as string | undefined;

    if (!handle || handle.length < 3) {
        res.status(400).json({ available: false, error: "Handle too short" });
        return;
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(handle)) {
        res.status(400).json({
            available: false,
            error: "Invalid characters in handle",
        });
        return;
    }

    const clean = handle.toLowerCase().replace(/^@/, "");
    const taken = !!findByHandle(clean);

    res.json({ available: !taken });
});

export default router;
