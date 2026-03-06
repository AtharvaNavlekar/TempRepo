import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { findById, saveUser, User, BuilderProfile, Project } from "@/lib/db";
import { z } from "zod";

const projectSchema = z.object({
    name: z.string().min(2, "Project name must be at least 2 characters"),
    description: z.string().min(10, "Description must be at least 10 characters").max(500),
    url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
    type: z.string().min(1, "Type is required"),
    tags: z.array(z.string()).max(5, "Maximum 5 tags allowed"),
});

export async function POST(req: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const decoded = await verifyToken(token) as { id: string } | null;
        if (!decoded || !decoded.id) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        const user = findById(decoded.id);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        if (user.type !== "builder") {
            return NextResponse.json({ error: "Only builders can add projects" }, { status: 403 });
        }

        const body = await req.json();

        // Validate payload
        const parsed = projectSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json({
                error: "Validation failed",
                details: parsed.error.format()
            }, { status: 400 });
        }

        const builderProfile = user.profile as BuilderProfile;
        const newProject: Project = {
            id: Math.random().toString(36).substring(2, 9),
            name: parsed.data.name,
            description: parsed.data.description,
            url: parsed.data.url || undefined,
            type: parsed.data.type,
            score: Math.floor(Math.random() * 500) + 100, // random ship score for now
            date: new Date().toISOString().split('T')[0],
            tags: parsed.data.tags || [],
        };

        const existingProjects = builderProfile.projects || [];
        builderProfile.projects = [newProject, ...existingProjects];

        // Save back to db
        user.profile = builderProfile;
        saveUser(user);

        return NextResponse.json({ message: "Project added successfully", project: newProject }, { status: 200 });

    } catch (error) {
        console.error("Profile Edit Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
