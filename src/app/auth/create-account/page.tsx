"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ForgeButton } from "@/components/forge";
import StepTypeSelect from "./StepTypeSelect";
import StepCore from "./StepCore";
import { StepBuilderDetails, StepCompanyDetails } from "./StepDetails";
import { StepBuilderPrefs, StepCompanyPrefs } from "./StepPrefs";
import { StepBuilderPersonality, StepCompanyCulture } from "./StepPersonality";
import StepReview from "./StepReview";
import type { FormState, AccountType } from "./types";
import { INITIAL_FORM_STATE } from "./types";

const STORAGE_KEY = "collabrise_registration";

const STEP_LABELS = ["Account Type", "Identity", "Profile", "Preferences", "Personality", "Review"];

/* ─── Validation helpers (client-side mirror of Zod) ─── */
function validateCore(data: FormState["core"]) {
    const e: Record<string, string> = {};
    if (!data.fullName.trim()) e.fullName = "Full name is required";
    if (!data.email.includes("@")) e.email = "Valid email required";
    if (data.password.length < 8) e.password = "Min 8 characters";
    if (!/[A-Z]/.test(data.password)) e.password = "Must contain uppercase";
    if (!/[0-9]/.test(data.password)) e.password = "Must contain a number";
    if (!/[^A-Za-z0-9]/.test(data.password)) e.password = "Must contain a special character";
    if (data.password !== data.confirmPassword) e.confirmPassword = "Passwords do not match";
    if (data.handle.length < 3) e.handle = "Minimum 3 characters";
    if (!/^[a-zA-Z0-9_-]+$/.test(data.handle)) e.handle = "Only letters, numbers, _ and -";
    if (!data.country) e.country = "Please select a country";
    return e;
}

function validateBuilderDetails(data: FormState["builderDetails"]) {
    const e: Record<string, string> = {};
    if (!data.craft) e.craft = "Select your primary craft";
    if (!data.experienceLevel) e.experienceLevel = "Select experience level";
    if (data.skills.length === 0) e.skills = "Add at least one skill";
    if (!data.employmentStatus) e.employmentStatus = "Select your current status";
    return e;
}

function validateCompanyDetails(data: FormState["companyDetails"]) {
    const e: Record<string, string> = {};
    if (!data.companyName.trim()) e.companyName = "Company name required";
    if (!data.industry) e.industry = "Select an industry";
    if (!data.companySize) e.companySize = "Select company size";
    if (!data.recruiterTitle.trim()) e.recruiterTitle = "Your title is required";
    return e;
}

function validateBuilderPrefs(data: FormState["builderPrefs"]) {
    const e: Record<string, string> = {};
    if (data.preferredProjectLength.length === 0) e.preferredProjectLength = "Select at least one option";
    if (!data.workPreference) e.workPreference = "Select a work preference";
    return e;
}

function validateCompanyPrefs(data: FormState["companyPrefs"]) {
    const e: Record<string, string> = {};
    if (data.hiringFor.length === 0) e.hiringFor = "Select at least one option";
    if (data.targetExperienceLevels.length === 0) e.targetExperienceLevels = "Select at least one";
    if (!data.remotePolicy) e.remotePolicy = "Select remote policy";
    if (!data.hqLocation.trim()) e.hqLocation = "HQ location required";
    return e;
}

function validateBuilderPersonality(data: FormState["builderPersonality"]) {
    const e: Record<string, string> = {};
    if (data.manifesto.trim().length < 10) e.manifesto = "Write at least 10 characters";
    if (!data.bestProject.trim()) e.bestProject = "Tell us your best project";
    if (!data.commitmentLevel) e.commitmentLevel = "Select commitment level";
    if (data.guilds.length === 0) e.guilds = "Join at least one guild";
    return e;
}

function validateCompanyCulture(data: FormState["companyCulture"]) {
    const e: Record<string, string> = {};
    if (data.companyDifferentiator.trim().length < 20) e.companyDifferentiator = "Write at least 20 characters";
    if (data.teamStack.length === 0) e.teamStack = "Add at least one technology";
    if (data.findBuildersVia.length === 0) e.findBuildersVia = "Select at least one method";
    return e;
}

function validateFinal(data: FormState["final"]) {
    const e: Record<string, string> = {};
    if (!data.agreedToTerms) e.agreedToTerms = "You must agree to the Terms of Service";
    if (!data.agreedToProtocol) e.agreedToProtocol = "You must agree to the Protocol Rules";
    return e;
}

/* ─── Build API payload ─── */
function buildPayload(form: FormState) {
    const base = {
        type: form.accountType,
        fullName: form.core.fullName,
        email: form.core.email,
        password: form.core.password,
        confirmPassword: form.core.confirmPassword,
        handle: form.core.handle,
        country: form.core.country,
        referralSource: form.final.referralSource,
        newsletterSubscribed: form.final.newsletterSubscribed,
        agreedToTerms: form.final.agreedToTerms,
        agreedToProtocol: form.final.agreedToProtocol,
    };
    if (form.accountType === "builder") {
        return {
            ...base,
            profile: {
                ...form.builderDetails,
                ...form.builderPrefs,
                ...form.builderPersonality,
            },
        };
    }
    return {
        ...base,
        profile: {
            ...form.companyDetails,
            ...form.companyPrefs,
            ...form.companyCulture,
        },
    };
}

/* ─── Success Screen ─── */
function SuccessScreen({ handle, type }: { handle: string; type: AccountType }) {
    const router = useRouter();
    useEffect(() => { setTimeout(() => router.push("/dashboard"), 3000); }, [router]);
    return (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16 space-y-6">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400, delay: 0.2 }} className="w-20 h-20 rounded-full bg-lime/10 border border-lime/30 flex items-center justify-center mx-auto">
                <span className="text-4xl">⚡</span>
            </motion.div>
            <div>
                <h2 className="font-clash font-black text-4xl text-white mb-2">ACCOUNT INITIALIZED</h2>
                <p className="font-mono text-white/50 text-sm">@{handle} · {type === "builder" ? "Builder" : "Company"}</p>
            </div>
            <p className="font-mono text-xs text-white/30">Redirecting to your dashboard...</p>
            <div className="flex justify-center gap-1">
                {[0, 1, 2].map(i => (
                    <motion.div key={i} className="w-2 h-2 rounded-full bg-lime" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }} />
                ))}
            </div>
        </motion.div>
    );
}

/* ─── Main Page ─── */
export default function CreateAccountPage() {
    const [form, setForm] = useState<FormState>(INITIAL_FORM_STATE);
    const [step, setStep] = useState(0);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [apiError, setApiError] = useState("");
    const [success, setSuccess] = useState(false);

    const isBuilder = form.accountType === "builder";

    // Persist to sessionStorage
    useEffect(() => { try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ form, step })); } catch { } }, [form, step]);
    useEffect(() => {
        try {
            const saved = sessionStorage.getItem(STORAGE_KEY);
            if (saved) { const parsed = JSON.parse(saved); setForm(parsed.form); setStep(parsed.step ?? 0); }
        } catch { }
    }, []);

    const validate = useCallback((targetStep: number): boolean => {
        let errs: Record<string, string> = {};
        if (targetStep === 1) errs = validateCore(form.core);
        else if (targetStep === 2) errs = isBuilder ? validateBuilderDetails(form.builderDetails) : validateCompanyDetails(form.companyDetails);
        else if (targetStep === 3) errs = isBuilder ? validateBuilderPrefs(form.builderPrefs) : validateCompanyPrefs(form.companyPrefs);
        else if (targetStep === 4) errs = isBuilder ? validateBuilderPersonality(form.builderPersonality) : validateCompanyCulture(form.companyCulture);
        else if (targetStep === 5) errs = validateFinal(form.final);
        setErrors(errs);
        return Object.keys(errs).length === 0;
    }, [form, isBuilder]);

    const goNext = () => { if (validate(step)) setStep(s => s + 1); };
    const goBack = () => { setErrors({}); setStep(s => s - 1); };

    const handleTypeSelect = (type: AccountType) => {
        setForm(f => ({ ...f, accountType: type }));
        setStep(1);
    };

    const handleSubmit = async () => {
        if (!validate(5)) return;
        setIsSubmitting(true);
        setApiError("");
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(buildPayload(form)),
            });
            const json = await res.json();
            if (!res.ok) {
                setApiError(json.error ?? "Registration failed. Please try again.");
                if (json.field === "email") { setStep(1); setErrors({ email: json.error }); }
                if (json.field === "handle") { setStep(1); setErrors({ handle: json.error }); }
                return;
            }
            sessionStorage.removeItem(STORAGE_KEY);
            setSuccess(true);
        } catch {
            setApiError("Network error. Please check your connection and try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (success) return (
        <div className="min-h-screen bg-obsidian flex items-center justify-center p-6">
            <SuccessScreen handle={form.core.handle} type={form.accountType!} />
        </div>
    );

    const stepTitles: Record<number, string> = {
        1: "Core Identity",
        2: isBuilder ? "Builder Profile" : "Company Info",
        3: isBuilder ? "Work Preferences" : "Hiring Preferences",
        4: isBuilder ? "Your Manifesto" : "Company Culture",
        5: "Review & Launch",
    };

    return (
        <div className="min-h-screen bg-obsidian flex items-start justify-center px-4 py-16">
            {/* Background glows */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-lime/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyber/5 rounded-full blur-[120px]" />
            </div>

            <div className="w-full max-w-2xl relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                    <p className="font-clash font-bold text-2xl text-white">COLLAB<span className="text-lime">RISE</span></p>
                    <p className="font-mono text-[11px] text-white/30 tracking-widest mt-1">ACCOUNT INITIALIZATION PROTOCOL</p>
                </div>

                {/* Progress Bar */}
                {step > 0 && (
                    <div className="mb-8">
                        <div className="flex justify-between mb-2">
                            {STEP_LABELS.slice(1).map((label, i) => {
                                const s = i + 1;
                                return (
                                    <span key={s} className={`font-mono text-[9px] uppercase tracking-wider ${step === s ? (isBuilder ? "text-lime" : "text-cyber") : step > s ? "text-white/40" : "text-white/15"}`}>
                                        {label}
                                    </span>
                                );
                            })}
                        </div>
                        <div className="h-0.5 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                className={`h-full rounded-full ${isBuilder ? "bg-lime" : "bg-cyber"}`}
                                animate={{ width: `${((step - 1) / 4) * 100}%` }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                            />
                        </div>
                    </div>
                )}

                {/* Card */}
                <div className="bg-white/[0.02] border border-white/10 rounded-bento backdrop-blur-sm p-8 md:p-10">
                    {step > 0 && (
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-1">
                                <span className={`font-mono text-[10px] ${isBuilder ? "text-lime/60" : "text-cyber/60"} uppercase tracking-[0.3em]`}>
                                    Step {step} of 5
                                </span>
                                {form.accountType && (
                                    <span className={`px-2 py-0.5 rounded font-mono text-[9px] uppercase ${isBuilder ? "bg-lime/10 text-lime border border-lime/20" : "bg-cyber/10 text-cyber border border-cyber/20"}`}>
                                        {form.accountType}
                                    </span>
                                )}
                            </div>
                            <h2 className="font-clash font-bold text-2xl text-white">{stepTitles[step]}</h2>
                        </div>
                    )}

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                        >
                            {step === 0 && <StepTypeSelect onSelect={handleTypeSelect} />}
                            {step === 1 && (
                                <StepCore
                                    data={form.core}
                                    accountType={form.accountType!}
                                    onChange={core => setForm(f => ({ ...f, core }))}
                                    errors={errors}
                                />
                            )}
                            {step === 2 && isBuilder && (
                                <StepBuilderDetails
                                    data={form.builderDetails}
                                    onChange={d => setForm(f => ({ ...f, builderDetails: d }))}
                                    errors={errors}
                                />
                            )}
                            {step === 2 && !isBuilder && (
                                <StepCompanyDetails
                                    data={form.companyDetails}
                                    onChange={d => setForm(f => ({ ...f, companyDetails: d }))}
                                    errors={errors}
                                />
                            )}
                            {step === 3 && isBuilder && (
                                <StepBuilderPrefs
                                    data={form.builderPrefs}
                                    onChange={d => setForm(f => ({ ...f, builderPrefs: d }))}
                                    errors={errors}
                                />
                            )}
                            {step === 3 && !isBuilder && (
                                <StepCompanyPrefs
                                    data={form.companyPrefs}
                                    onChange={d => setForm(f => ({ ...f, companyPrefs: d }))}
                                    errors={errors}
                                />
                            )}
                            {step === 4 && isBuilder && (
                                <StepBuilderPersonality
                                    data={form.builderPersonality}
                                    onChange={d => setForm(f => ({ ...f, builderPersonality: d }))}
                                    errors={errors}
                                />
                            )}
                            {step === 4 && !isBuilder && (
                                <StepCompanyCulture
                                    data={form.companyCulture}
                                    onChange={d => setForm(f => ({ ...f, companyCulture: d }))}
                                    errors={errors}
                                />
                            )}
                            {step === 5 && (
                                <StepReview
                                    form={form}
                                    finalData={form.final}
                                    onFinalChange={d => setForm(f => ({ ...f, final: d }))}
                                    onJumpToStep={setStep}
                                    errors={errors}
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* API Error */}
                    {apiError && (
                        <div className="mt-4 p-3 bg-acid/10 border border-acid/30 rounded-bento-sm">
                            <p className="font-mono text-xs text-acid">{apiError}</p>
                        </div>
                    )}

                    {/* Navigation */}
                    {step > 0 && (
                        <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/10">
                            <button
                                onClick={goBack}
                                className="font-mono text-xs text-white/40 hover:text-white transition-colors uppercase tracking-widest"
                            >
                                ← Back
                            </button>
                            {step < 5 ? (
                                <ForgeButton onClick={goNext} variant="primary" size="sm">
                                    Continue →
                                </ForgeButton>
                            ) : (
                                <ForgeButton
                                    onClick={handleSubmit}
                                    variant="primary"
                                    size="sm"
                                    loading={isSubmitting}
                                    className="min-w-[160px]"
                                >
                                    {isSubmitting ? "Initializing..." : "LAUNCH ACCOUNT →"}
                                </ForgeButton>
                            )}
                        </div>
                    )}
                </div>

                {/* Login link */}
                <p className="text-center font-mono text-[11px] text-white/25 mt-6">
                    Already have an account?{" "}
                    <a href="/auth/login" className="text-white/50 hover:text-lime transition-colors underline underline-offset-4">Sign In</a>
                </p>
            </div>
        </div>
    );
}
