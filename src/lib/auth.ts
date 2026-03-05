/**
 * auth.ts — Authentication utilities
 * Password hashing with bcrypt, JWT signing/verification, cookie management.
 */

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import type { PublicUser } from "./db";

const JWT_SECRET = process.env.JWT_SECRET ?? "collabrise-dev-secret-change-in-prod-2026";
const JWT_EXPIRES_IN = "7d";
const BCRYPT_ROUNDS = 12;
const COOKIE_NAME = "auth_token";

export interface JWTPayload {
    userId: string;
    email: string;
    handle: string;
    type: "builder" | "company";
    iat?: number;
    exp?: number;
}

/* ─── Password ─── */
export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, BCRYPT_ROUNDS);
}

export async function comparePassword(
    password: string,
    hash: string
): Promise<boolean> {
    return bcrypt.compare(password, hash);
}

/* ─── JWT ─── */
export function signToken(payload: Omit<JWTPayload, "iat" | "exp">): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): JWTPayload | null {
    try {
        return jwt.verify(token, JWT_SECRET) as JWTPayload;
    } catch {
        return null;
    }
}

/* ─── Cookies ─── */
export async function setAuthCookie(user: PublicUser): Promise<string> {
    const token = signToken({
        userId: user.id,
        email: user.email,
        handle: user.handle,
        type: user.type,
    });

    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
    });

    return token;
}

export async function getAuthCookie(): Promise<JWTPayload | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    return verifyToken(token);
}

export async function clearAuthCookie(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
}
