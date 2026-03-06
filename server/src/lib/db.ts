/**
 * db.ts — File-based JSON user store
 * Enterprise-grade data access layer with full type safety.
 * Easily swappable with MongoDB/PostgreSQL by changing this file only.
 */

import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data", "users.json");

/* ─── User Types ─── */
export type AccountType = "builder" | "company";
export type WorkStatus = "employed" | "student" | "freelancing" | "open";
export type CommitmentLevel = "casual" | "builder" | "hardcore";
export type HiringType = "full-time" | "contract" | "bounty" | "internship";
export type ExperienceLevel = "beginner" | "mid" | "senior" | "veteran" | "expert";
export type RemotePolicy = "remote" | "hybrid" | "onsite" | "any";

export interface Project {
    id: string;
    name: string;
    description: string;
    url?: string;
    type: string;
    department: string;         // e.g. "software-engineering", "human-resources"
    category: "code" | "document" | "analysis" | "design" | "content" | "case-study" | "achievement" | "other";
    score: number;              // final Ship Score 0-100
    scoreInputs?: Record<string, number>;   // raw parameter inputs used to compute score
    scoreBreakdown?: {          // detailed per-parameter breakdown
        parameterKey: string;
        parameterLabel: string;
        rawValue: number;
        weight: number;
        weightedScore: number;
    }[];
    date: string;
    tags: string[];
}

export interface BuilderProfile {
    craft: string;
    experienceLevel: ExperienceLevel;
    yearsOfExperience: number;
    skills: string[];
    githubUrl?: string;
    portfolioUrl?: string;
    employmentStatus: WorkStatus;
    openToBounties: boolean;
    minBountyReward: number;
    preferredProjectLength: string[];
    workPreference: RemotePolicy;
    availability: number; // hrs/week
    manifesto: string;
    commitmentLevel: CommitmentLevel;
    guilds: string[];
    bestProject: string;
    projects?: Project[];
}

export interface CompanyProfile {
    companyName: string;
    companyLogoUrl?: string;
    industry: string;
    companySize: string;
    companyWebsite?: string;
    recruiterTitle: string;
    recruiterLinkedIn?: string;
    hiringFor: HiringType[];
    targetRoles: string[];
    targetExperienceLevels: ExperienceLevel[];
    minBudget: number;
    maxBudget: number;
    remotePolicy: RemotePolicy;
    hqLocation: string;
    teamStack: string[];
    companyDifferentiator: string;
    findBuildersVia: string[];
    recruitFromGuilds: string[];
}

export interface User {
    id: string;
    type: AccountType;
    fullName: string;
    email: string;
    passwordHash: string;
    handle: string;
    profilePhotoUrl?: string;
    country: string;
    createdAt: string;
    updatedAt: string;
    isVerified: boolean;
    referralSource?: string;
    newsletterSubscribed: boolean;
    profile: BuilderProfile | CompanyProfile;
}

export type PublicUser = Omit<User, "passwordHash">;

/* ─── DB Helpers ─── */
function ensureDbExists(): void {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (!fs.existsSync(DB_PATH)) fs.writeFileSync(DB_PATH, "[]", "utf-8");
}

export function getUsers(): User[] {
    ensureDbExists();
    try {
        const raw = fs.readFileSync(DB_PATH, "utf-8");
        return JSON.parse(raw) as User[];
    } catch {
        return [];
    }
}

export function findByEmail(email: string): User | undefined {
    return getUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function findByHandle(handle: string): User | undefined {
    return getUsers().find(
        (u) => u.handle.toLowerCase() === handle.toLowerCase().replace(/^@/, "")
    );
}

export function findById(id: string): User | undefined {
    return getUsers().find((u) => u.id === id);
}

export function saveUser(user: User): User {
    ensureDbExists();
    const users = getUsers();
    const existingIndex = users.findIndex((u) => u.id === user.id);
    if (existingIndex >= 0) {
        users[existingIndex] = { ...user, updatedAt: new Date().toISOString() };
    } else {
        users.push(user);
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2), "utf-8");
    return user;
}

export function toPublicUser(user: User): PublicUser {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...publicUser } = user;
    return publicUser;
}
