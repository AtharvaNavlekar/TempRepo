/**
 * GET /api/auth/check-email?email=xyz
 * Debounced email availability check
 */

import { NextRequest, NextResponse } from "next/server";
import { findByEmail } from "@/lib/db";

export async function GET(req: NextRequest) {
    const email = req.nextUrl.searchParams.get("email");

    if (!email) {
        return NextResponse.json({ available: false, error: "Email required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return NextResponse.json({ available: false, error: "Invalid email format" }, { status: 400 });
    }

    const taken = !!findByEmail(email.toLowerCase());
    return NextResponse.json({ available: !taken }, { status: 200 });
}
