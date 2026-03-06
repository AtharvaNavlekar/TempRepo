import { NextResponse } from "next/server";
import { getAuthCookie } from "@/lib/auth";
import { findById, toPublicUser } from "@/lib/db";

export async function GET() {
    try {
        const payload = await getAuthCookie();
        if (!payload) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = findById(payload.userId);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json(toPublicUser(user));
    } catch (error) {
        console.error("API Error in /api/auth/me:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
