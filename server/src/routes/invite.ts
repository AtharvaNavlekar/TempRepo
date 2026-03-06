/**
 * Invite routes — Express router
 * POST /invite — Send an interview invite to a builder
 * GET  /invite — Fetch invites (company sees sent, builder sees received)
 */

import { Router, Request, Response } from "express";
import { verifyToken, COOKIE_NAME } from "../lib/auth";
import { findById } from "../lib/db";
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

const router = Router();

/* ─── POST /invite ────────────────────────────────────────────── */
router.post("/", (req: Request, res: Response): void => {
    try {
        const token = req.cookies?.[COOKIE_NAME];
        if (!token) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        const decoded = verifyToken(token);
        if (!decoded?.userId) {
            res.status(401).json({ error: "Invalid token" });
            return;
        }

        const company = findById(decoded.userId);
        if (!company || company.type !== "company") {
            res.status(403).json({ error: "Only companies can send invites" });
            return;
        }

        const { builderId, projectId, projectName, message, interviewLink } = req.body;

        if (!builderId || !projectId || !interviewLink) {
            res.status(400).json({ error: "builderId, projectId, and interviewLink are required" });
            return;
        }

        const builder = findById(builderId);
        if (!builder) {
            res.status(404).json({ error: "Builder not found" });
            return;
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

        res.json({ message: "Invite sent successfully", invite });
    } catch (error) {
        console.error("Invite Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

/* ─── GET /invite ─────────────────────────────────────────────── */
router.get("/", (req: Request, res: Response): void => {
    try {
        const token = req.cookies?.[COOKIE_NAME];
        if (!token) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        const decoded = verifyToken(token);
        if (!decoded?.userId) {
            res.status(401).json({ error: "Invalid token" });
            return;
        }

        const invites = getInvites();
        const user = findById(decoded.userId);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        const filtered = user.type === "company"
            ? invites.filter(i => i.companyId === user.id)
            : invites.filter(i => i.builderId === user.id);

        res.json({ invites: filtered });
    } catch (error) {
        console.error("Invite Fetch Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
