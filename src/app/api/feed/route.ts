/**
 * GET /api/feed — Project Aggregation Pipeline
 *
 * Pulls every project from every builder in the DB, attaches builder metadata,
 * and returns a flat, searchable array. Supports query-string filters:
 *   ?tags=React,Next.js   → projects that include ANY of these tags
 *   ?type=Frontend         → exact project-type match
 *   ?q=neural              → fuzzy name / description search
 *
 * By design there is NO experience-level filter.
 */

import { NextRequest, NextResponse } from "next/server";
import { getUsers, BuilderProfile } from "@/lib/db";

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

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = req.nextUrl;

        const tagFilter = searchParams.get("tags")?.split(",").map(t => t.trim().toLowerCase()).filter(Boolean) ?? [];
        const typeFilter = searchParams.get("type")?.trim().toLowerCase() ?? "";
        const query = searchParams.get("q")?.trim().toLowerCase() ?? "";

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

        // Tag filter – project must contain at least one of the requested tags
        if (tagFilter.length > 0) {
            filtered = filtered.filter(p =>
                p.tags.some(t => tagFilter.includes(t.toLowerCase()))
            );
        }

        // Type filter
        if (typeFilter) {
            filtered = filtered.filter(p => p.type.toLowerCase() === typeFilter);
        }

        // Free-text search on name + description
        if (query) {
            filtered = filtered.filter(
                p =>
                    p.name.toLowerCase().includes(query) ||
                    p.description.toLowerCase().includes(query)
            );
        }

        // Sort by score descending (highest quality projects first)
        filtered.sort((a, b) => b.score - a.score);

        return NextResponse.json({ projects: filtered, total: filtered.length });
    } catch (error) {
        console.error("Feed Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
