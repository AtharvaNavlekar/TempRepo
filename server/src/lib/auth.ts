/**
 * auth.ts — Authentication utilities
 * Password hashing with bcrypt, JWT signing/verification.
 * Cookie management is handled by Express route handlers (not here).
 */

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET ?? "collabrise-dev-secret-change-in-prod-2026";
const JWT_EXPIRES_IN = "7d";
const BCRYPT_ROUNDS = 12;
export const COOKIE_NAME = "auth_token";
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 7 * 1000; // 7 days in ms

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
