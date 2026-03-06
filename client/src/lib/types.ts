/**
 * types.ts — Shared frontend types
 * Types that the frontend needs that were previously imported from backend libs.
 */

export interface JWTPayload {
    userId: string;
    email: string;
    handle: string;
    type: "builder" | "company";
    iat?: number;
    exp?: number;
}

/* ─── DB Types (mirrored from server) ─── */
export type AccountType = "builder" | "company";
export type WorkStatus = "employed" | "student" | "freelancing" | "open";
export type CommitmentLevel = "casual" | "builder" | "hardcore";
export type HiringType = "full-time" | "contract" | "bounty" | "internship";
export type ExperienceLevel = "beginner" | "mid" | "senior" | "veteran" | "expert";
export type RemotePolicy = "remote" | "hybrid" | "onsite" | "any";

export interface ScoreParameter {
    key: string;
    label: string;
    description: string;
    weight: number;
    inputType: "slider" | "boolean" | "select";
    min?: number;
    max?: number;
    options?: string[];
}

export interface DepartmentConfig {
    id: string;
    name: string;
    icon: string;
    description: string;
    parameters: ScoreParameter[];
}

export type ProjectCategory = "code" | "architecture" | "analysis" | "model" | "automation" | "hardware" | "achievement" | "other";

export interface Project {
    id: string;
    name: string;
    description: string;
    url?: string;
    type: string;
    department?: string;
    category?: ProjectCategory | string;
    score: number;
    scoreInputs?: Record<string, number>;
    scoreBreakdown?: {
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
    availability: number;
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

