/**
 * User routes — Express router
 * PATCH /user/profile — Update user profile
 * POST  /user/project — Add a project to builder profile
 */

import { Router, Request, Response } from "express";
import { verifyToken, COOKIE_NAME } from "../lib/auth";
import { findById, findByHandle, saveUser, toPublicUser, BuilderProfile, Project } from "../lib/db";
import { z } from "zod";

const router = Router();

const projectSchema = z.object({
    name: z.string().min(2, "Project name must be at least 2 characters"),
    description: z.string().min(10, "Description must be at least 10 characters").max(500),
    url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
    type: z.string().min(1, "Type is required"),
    tags: z.array(z.string()).max(5, "Maximum 5 tags allowed"),
});

/* ─── PATCH /user/profile ─────────────────────────────────────── */
router.patch("/profile", (req: Request, res: Response): void => {
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

        const { fullName, handle, country, profile: profileUpdates } = req.body;

        // Handle duplication check if it's being changed
        if (handle && handle !== user.handle && handle.length >= 3) {
            const existing = findByHandle(handle);
            if (existing) {
                res.status(409).json({ error: "Handle already taken" });
                return;
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
                ...profileUpdates,
            };
        }

        // Save back to DB
        const updatedUser = saveUser(user);

        res.json({ success: true, user: toPublicUser(updatedUser) });
    } catch (error) {
        console.error("API Error in PATCH /api/user/profile:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

/* ─── POST /user/project ──────────────────────────────────────── */
router.post("/project", (req: Request, res: Response): void => {
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

        const user = findById(decoded.userId);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        if (user.type !== "builder") {
            res.status(403).json({ error: "Only builders can add projects" });
            return;
        }

        // Validate payload
        const parsed = projectSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({
                error: "Validation failed",
                details: parsed.error.format(),
            });
            return;
        }

        const builderProfile = user.profile as BuilderProfile;
        const newProject: Project = {
            id: Math.random().toString(36).substring(2, 9),
            name: parsed.data.name,
            description: parsed.data.description,
            url: parsed.data.url || undefined,
            type: parsed.data.type,
            score: Math.floor(Math.random() * 500) + 100,
            date: new Date().toISOString().split("T")[0],
            tags: parsed.data.tags || [],
        };

        const existingProjects = builderProfile.projects || [];
        builderProfile.projects = [newProject, ...existingProjects];

        user.profile = builderProfile;
        saveUser(user);

        res.json({ message: "Project added successfully", project: newProject });
    } catch (error) {
        console.error("Profile Edit Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
