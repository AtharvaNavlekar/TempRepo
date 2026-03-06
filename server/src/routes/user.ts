/**
 * User routes — Express router
 * PATCH /user/profile — Update user profile
 * POST  /user/project — Add a project to builder profile
 */

import { Router, Request, Response } from "express";
import { verifyToken, COOKIE_NAME } from "../lib/auth";
import { findById, findByHandle, saveUser, toPublicUser, BuilderProfile, Project } from "../lib/db";
import { computeShipScore, getDepartmentConfig } from "../lib/ship-score";
import { z } from "zod";

const router = Router();

const projectSchema = z.object({
    name: z.string().min(2, "Project name must be at least 2 characters"),
    description: z.string().min(10, "Description must be at least 10 characters").max(500),
    url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
    type: z.string().min(1, "Type is required"),
    department: z.string().min(1, "Department is required"),
    category: z.enum(["code", "document", "analysis", "design", "content", "case-study", "achievement", "other"]),
    tags: z.array(z.string()).max(5, "Maximum 5 tags allowed"),
    scoreInputs: z.record(z.string(), z.number()).optional(),
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

        if (handle && handle !== user.handle && handle.length >= 3) {
            const existing = findByHandle(handle);
            if (existing) {
                res.status(409).json({ error: "Handle already taken" });
                return;
            }
        }

        if (fullName) user.fullName = fullName;
        if (handle) user.handle = handle;
        if (country) user.country = country;

        if (profileUpdates && typeof profileUpdates === "object") {
            user.profile = {
                ...user.profile,
                ...profileUpdates,
            };
        }

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

        console.log("INCOMING PROJECT DATA:", JSON.stringify(req.body, null, 2));

        const parsed = projectSchema.safeParse(req.body);
        if (!parsed.success) {
            console.error("VALIDATION FAILED:", JSON.stringify(parsed.error.format(), null, 2));
            res.status(400).json({
                error: "Validation failed",
                details: parsed.error.format(),
            });
            return;
        }

        // Validate department exists in the engine
        const deptConfig = getDepartmentConfig(parsed.data.department);
        if (!deptConfig) {
            res.status(400).json({ error: `Unknown department: "${parsed.data.department}"` });
            return;
        }

        // Compute Ship Score dynamically using the scoring engine
        const scoreInputs: Record<string, number> = parsed.data.scoreInputs ? { ...parsed.data.scoreInputs } : {};
        const scoreResult = computeShipScore(parsed.data.department, scoreInputs);

        const builderProfile = user.profile as BuilderProfile;
        const newProject: Project = {
            id: Math.random().toString(36).substring(2, 9),
            name: parsed.data.name,
            description: parsed.data.description,
            url: parsed.data.url || undefined,
            type: parsed.data.type,
            department: parsed.data.department,
            category: parsed.data.category,
            score: scoreResult.totalScore,
            scoreInputs: scoreInputs,
            scoreBreakdown: scoreResult.breakdown,
            date: new Date().toISOString().split("T")[0],
            tags: parsed.data.tags || [],
        };

        const existingProjects = builderProfile.projects || [];
        builderProfile.projects = [newProject, ...existingProjects];

        user.profile = builderProfile;
        saveUser(user);

        res.json({ message: "Project added successfully", project: newProject, scoreResult });
    } catch (error) {
        console.error("Profile Edit Error:", error);
        if (error instanceof Error) {
            console.error(error.stack);
        }
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
