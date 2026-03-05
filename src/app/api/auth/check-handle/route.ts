/**
 * GET /api/auth/check-handle?handle=xyz
 * Debounced handle availability check
 */

import { NextRequest, NextResponse } from "next/server";
import { findByHandle } from "@/lib/db";

export async function GET(req: NextRequest) {
    const handle = req.nextUrl.searchParams.get("handle");

    if (!handle || handle.length < 3) {
        return NextResponse.json({ available: false, error: "Handle too short" }, { status: 400 });
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(handle)) {
        return NextResponse.json(
            { available: false, error: "Invalid characters in handle" },
            { status: 400 }
        );
    }

    const clean = handle.toLowerCase().replace(/^@/, "");
    const taken = !!findByHandle(clean);

    return NextResponse.json({ available: !taken }, { status: 200 });
}
