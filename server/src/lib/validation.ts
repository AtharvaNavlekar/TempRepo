/**
 * validation.ts — Zod schemas for registration
 * Server-side validation for Builder and Company account creation.
 * These schemas are the single source of truth — also used to infer TypeScript types.
 */

import { z } from "zod";

/* ─── Shared Rules ─────────────────────────────────────────────── */
const passwordSchema = z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password too long")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character");

const handleSchema = z
    .string()
    .min(3, "Handle must be at least 3 characters")
    .max(30, "Handle must be at most 30 characters")
    .regex(/^[a-zA-Z0-9_-]+$/, "Handle can only contain letters, numbers, underscores, and hyphens")
    .transform((v) => v.toLowerCase().replace(/^@/, ""));

const urlSchema = z.string().url("Must be a valid URL").optional().or(z.literal(""));

/* ─── Builder Profile Schema ───────────────────────────────────── */
const builderProfileSchema = z.object({
    craft: z.string().min(1, "Please select your primary craft"),
    experienceLevel: z.enum(["beginner", "mid", "senior", "veteran"] as const, {
        message: "Please select your experience level",
    }),
    yearsOfExperience: z.number().min(0).max(50),
    skills: z.array(z.string()).min(1, "Add at least one skill").max(20),
    githubUrl: urlSchema,
    portfolioUrl: urlSchema,
    employmentStatus: z.enum(["employed", "student", "freelancing", "open"]),
    openToBounties: z.boolean(),
    minBountyReward: z.number().min(0).max(100000),
    preferredProjectLength: z.array(z.string()).min(1, "Select at least one project length"),
    workPreference: z.enum(["remote", "hybrid", "onsite", "any"]),
    availability: z.number().min(1).max(80),
    manifesto: z
        .string()
        .min(10, "Write at least 10 characters")
        .max(300, "Keep it under 300 characters"),
    commitmentLevel: z.enum(["casual", "builder", "hardcore"]),
    guilds: z.array(z.string()).min(1, "Join at least one guild"),
    bestProject: z.string().min(2, "Tell us your best project").max(100),
});

/* ─── Company Profile Schema ─────────────────────────────────────── */
const companyProfileSchema = z.object({
    companyName: z.string().min(2, "Company name required").max(100),
    companyLogoUrl: z.string().optional(),
    industry: z.string().min(1, "Please select an industry"),
    companySize: z.enum(["1-10", "11-50", "51-200", "200+"] as const, {
        message: "Please select company size",
    }),
    companyWebsite: urlSchema,
    recruiterTitle: z.string().min(2, "Your role/title is required").max(100),
    recruiterLinkedIn: urlSchema,
    hiringFor: z
        .array(z.enum(["full-time", "contract", "bounty", "internship"]))
        .min(1, "Select at least one hiring type"),
    targetRoles: z.array(z.string()).min(1, "Add at least one target role"),
    targetExperienceLevels: z
        .array(z.enum(["beginner", "mid", "senior", "veteran", "expert"]))
        .min(1, "Select at least one experience level"),
    minBudget: z.number().min(0),
    maxBudget: z.number().min(0),
    remotePolicy: z.enum(["remote", "hybrid", "onsite", "any"]),
    hqLocation: z.string().min(2, "HQ location required").max(100),
    teamStack: z.array(z.string()).min(1, "Add at least one technology"),
    companyDifferentiator: z
        .string()
        .min(20, "Tell us what makes your team unique (min 20 chars)")
        .max(300),
    findBuildersVia: z
        .array(z.string())
        .min(1, "Select at least one discovery method"),
    recruitFromGuilds: z.array(z.string()).default([]),
});

/* ─── Registration Schemas (full payload) ────────────────────────── */
const coreSchema = z.object({
    type: z.enum(["builder", "company"]),
    fullName: z.string().min(2, "Full name required").max(100),
    email: z.string().email("Invalid email address").toLowerCase(),
    password: passwordSchema,
    confirmPassword: z.string(),
    handle: handleSchema,
    profilePhotoUrl: z.string().optional(),
    country: z.string().min(2, "Country required"),
    referralSource: z.string().optional(),
    newsletterSubscribed: z.boolean().default(false),
    agreedToTerms: z.boolean().refine((v) => v === true, {
        message: "You must agree to the Terms of Service",
    }),
    agreedToProtocol: z.boolean().refine((v) => v === true, {
        message: "You must agree to the Proof-of-Work Protocol",
    }),
});

export const builderRegistrationSchema = coreSchema
    .extend({ profile: builderProfileSchema })
    .refine((d) => d.password === d.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export const companyRegistrationSchema = coreSchema
    .extend({ profile: companyProfileSchema })
    .refine((d) => d.password === d.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    })
    .refine((d) => {
        const p = d.profile as z.infer<typeof companyProfileSchema>;
        return p.maxBudget >= p.minBudget;
    }, {
        message: "Max budget must be greater than or equal to min budget",
        path: ["profile", "maxBudget"],
    });

/* ─── TypeScript types inferred from schemas ─────────────────────── */
export type BuilderRegistrationPayload = z.infer<typeof builderRegistrationSchema>;
export type CompanyRegistrationPayload = z.infer<typeof companyRegistrationSchema>;
export type RegistrationPayload = BuilderRegistrationPayload | CompanyRegistrationPayload;
