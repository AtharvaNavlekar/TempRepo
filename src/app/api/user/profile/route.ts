import { NextResponse } from "next/server";
import { getAuthCookie } from "@/lib/auth";
import { findById, saveUser, toPublicUser } from "@/lib/db";

export async function PATCH(req: Request) {
    try {
        const payload = await getAuthCookie();
        if (!payload) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = findById(payload.userId);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const body = await req.json();

        // Separate core identity updates from profile updates
        const { fullName, handle, country, profile: profileUpdates } = body;

        // Perform basic handle duplication check if it's being changed
        if (handle && handle !== user.handle && handle.length >= 3) {
            const { findByHandle } = await import("@/lib/db");
            const existing = findByHandle(handle);
            if (existing) {
                return NextResponse.json({ error: "Handle already taken" }, { status: 409 });
            }
        }

        // Apply Core updates
        if (fullName) user.fullName = fullName;
        if (handle) user.handle = handle;
        if (country) user.country = country;

        // Apply Profile deep merge updates
        if (profileUpdates && typeof profileUpdates === "object") {
            user.profile = {
                ...user.profile,
                ...profileUpdates
            };
        }

        // Save back to DB
        const updatedUser = saveUser(user);

        return NextResponse.json({ success: true, user: toPublicUser(updatedUser) });
    } catch (error) {
        console.error("API Error in PATCH /api/user/profile:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
