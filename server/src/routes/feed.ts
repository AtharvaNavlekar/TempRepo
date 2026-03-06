/**
 * Feed routes — Express router
 * GET /feed — Project Aggregation Pipeline
 */

import { Router, Request, Response } from "express";
import { getUsers, BuilderProfile } from "../lib/db";

export interface FeedProject {
    id: string;
    name: string;
    description: string;
    url?: string;
    type: string;
    score: number;
    date: string;
    tags: string[];
    builderId: string;
    builderHandle: string;
    builderName: string;
    builderCraft: string;
    builderAvailability: number;
    builderCountry: string;
    builderAvatar?: string;
}

const router = Router();

router.get("/", (req: Request, res: Response): void => {
    try {
        const tagFilter = (req.query.tags as string)?.split(",").map(t => t.trim().toLowerCase()).filter(Boolean) ?? [];
        const typeFilter = (req.query.type as string)?.trim().toLowerCase() ?? "";
        const query = (req.query.q as string)?.trim().toLowerCase() ?? "";

        const users = getUsers();
        const feed: FeedProject[] = [];

        for (const user of users) {
            if (user.type !== "builder") continue;

            const profile = user.profile as BuilderProfile;
            const projects = profile.projects ?? [];

            for (const project of projects) {
                feed.push({
                    id: project.id,
                    name: project.name,
                    description: project.description,
                    url: project.url,
                    type: project.type,
                    score: project.score,
                    date: project.date,
                    tags: project.tags,
                    builderId: user.id,
                    builderHandle: user.handle,
                    builderName: user.fullName,
                    builderCraft: profile.craft,
                    builderAvailability: profile.availability,
                    builderCountry: user.country,
                    builderAvatar: user.profilePhotoUrl,
                });
            }
        }

        // ── Apply filters ──────────────────────────────────────────
        let filtered = feed;

        if (tagFilter.length > 0) {
            filtered = filtered.filter(p =>
                p.tags.some(t => tagFilter.includes(t.toLowerCase()))
            );
        }

        if (typeFilter) {
            filtered = filtered.filter(p => p.type.toLowerCase() === typeFilter);
        }

        if (query) {
            filtered = filtered.filter(
                p =>
                    p.name.toLowerCase().includes(query) ||
                    p.description.toLowerCase().includes(query)
            );
        }

        // Sort by score descending
        filtered.sort((a, b) => b.score - a.score);

        res.json({ projects: filtered, total: filtered.length });
    } catch (error) {
        console.error("Feed Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
