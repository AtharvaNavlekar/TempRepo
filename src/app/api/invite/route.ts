/**
 * POST /api/invite — Send an interview invite to a builder
 * GET  /api/invite — Fetch invites (company sees sent, builder sees received)
 */

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { findById } from "@/lib/db";
import fs from "fs";
import path from "path";

const INVITES_PATH = path.join(process.cwd(), "data", "invites.json");

interface Invite {
    id: string;
    companyId: string;
    companyName: string;
    builderId: string;
    builderHandle: string;
    projectId: string;
    projectName: string;
    message: string;
    interviewLink: string;
    status: "pending" | "accepted" | "declined";
    createdAt: string;
}

function ensureInvitesFile() {
    const dir = path.dirname(INVITES_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (!fs.existsSync(INVITES_PATH)) fs.writeFileSync(INVITES_PATH, "[]", "utf-8");
}

function getInvites(): Invite[] {
    ensureInvitesFile();
    try {
        return JSON.parse(fs.readFileSync(INVITES_PATH, "utf-8"));
    } catch {
        return [];
    }
}

function saveInvite(invite: Invite) {
    ensureInvitesFile();
    const invites = getInvites();
    invites.push(invite);
    fs.writeFileSync(INVITES_PATH, JSON.stringify(invites, null, 2), "utf-8");
}

export async function POST(req: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const decoded = await verifyToken(token) as { id: string } | null;
        if (!decoded?.id) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        const company = findById(decoded.id);
        if (!company || company.type !== "company") {
            return NextResponse.json({ error: "Only companies can send invites" }, { status: 403 });
        }

        const body = await req.json();
        const { builderId, projectId, projectName, message, interviewLink } = body;

        if (!builderId || !projectId || !interviewLink) {
            return NextResponse.json({ error: "builderId, projectId, and interviewLink are required" }, { status: 400 });
        }

        const builder = findById(builderId);
        if (!builder) {
            return NextResponse.json({ error: "Builder not found" }, { status: 404 });
        }

        const companyProfile = company.profile as { companyName?: string };

        const invite: Invite = {
            id: Math.random().toString(36).substring(2, 9),
            companyId: company.id,
            companyName: companyProfile.companyName || company.fullName,
            builderId: builder.id,
            builderHandle: builder.handle,
            projectId,
            projectName: projectName || "Unknown Project",
            message: message || "",
            interviewLink,
            status: "pending",
            createdAt: new Date().toISOString(),
        };

        saveInvite(invite);

        return NextResponse.json({ message: "Invite sent successfully", invite }, { status: 200 });
    } catch (error) {
        console.error("Invite Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const decoded = await verifyToken(token) as { id: string } | null;
        if (!decoded?.id) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        const invites = getInvites();
        const user = findById(decoded.id);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const filtered = user.type === "company"
            ? invites.filter(i => i.companyId === user.id)
            : invites.filter(i => i.builderId === user.id);

        return NextResponse.json({ invites: filtered });
    } catch (error) {
        console.error("Invite Fetch Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
