"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FormInput, FormTextarea, FormSelect, TagPicker, RadioGroup, Toggle, FormSlider } from "@/app/auth/create-account/FormField";
import { ForgeButton } from "@/components/forge";
import { IconClose } from "@/components/icons";
import type { PublicUser, BuilderProfile } from "@/lib/types";
import { apiFetch } from "@/lib/api";
import { CRAFTS, SKILLS, GUILDS } from "@/app/auth/create-account/types";

// Extracted from arrays used in create-account pages
const EXP_LEVELS = [
    { value: "beginner", label: "EARLY-STAGE", desc: "0–1 yrs" },
    { value: "mid", label: "SCALING", desc: "1–3 yrs" },
    { value: "senior", label: "ESTABLISHED", desc: "3–7 yrs" },
    { value: "veteran", label: "SERIAL FOUNDER", desc: "7+ yrs" },
];

const EMP_STATUSES = [
    { value: "open", label: "OPEN TO COLLABORATE" },
    { value: "employed", label: "FOUNDING" },
    { value: "freelancing", label: "SOLOPRENEURING" },
    { value: "student", label: "ASPIRING FOUNDER" },
];

const WORK_PREFS = [
    { value: "remote", label: "REMOTE" },
    { value: "hybrid", label: "HYBRID" },
    { value: "onsite", label: "ON-SITE" },
    { value: "any", label: "ANY" },
];

const COMMITMENT_LEVELS = [
    { value: "casual", label: "CASUAL (0-10 hrs)", desc: "Just exploring or side ventures" },
    { value: "builder", label: "FOUNDER (10-30 hrs)", desc: "Consistent active contributor" },
    { value: "hardcore", label: "HARDCORE (40+ hrs)", desc: "100% dedicated to launching" },
];

interface Props {
    isOpen: boolean;
    onClose: () => void;
    user: PublicUser;
}

export default function EditProfileModal({ isOpen, onClose, user }: Props) {
    const isBuilder = user.type === "builder";

    // We only support Builder profile edits in this V1 component for simplicity
    const profile = user.profile as Partial<BuilderProfile>;

    // Local State
    const [fullName, setFullName] = useState(user.fullName || "");
    const [handle, setHandle] = useState(user.handle || "");
    const [country, setCountry] = useState(user.country || "");

    const [craft, setCraft] = useState(profile.craft || "");
    const [experienceLevel, setExperienceLevel] = useState(profile.experienceLevel || "");
    const [years, setYears] = useState(profile.yearsOfExperience || 0);
    const [skills, setSkills] = useState<string[]>(profile.skills || []);
    const [manifesto, setManifesto] = useState(profile.manifesto || "");
    const [bestProject, setBestProject] = useState(profile.bestProject || "");

    const [githubUrl, setGithubUrl] = useState(profile.githubUrl || "");
    const [employmentStatus, setEmploymentStatus] = useState(profile.employmentStatus || "");
    const [openToBounties, setOpenToBounties] = useState(profile.openToBounties || false);
    const [minBountyReward, setMinBountyReward] = useState(profile.minBountyReward || 500);
    const [workPreference, setWorkPreference] = useState(profile.workPreference || "");
    const [availability, setAvailability] = useState(profile.availability || 20);
    const [commitmentLevel, setCommitmentLevel] = useState(profile.commitmentLevel || "");
    const [guilds, setGuilds] = useState<string[]>(profile.guilds || []);

    const [activeTab, setActiveTab] = useState<"identity" | "professional" | "preferences">("identity");
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState("");

    if (!isOpen) return null;

    const handleSave = async () => {
        setIsSaving(true);
        setError("");

        const payload = {
            fullName,
            handle,
            country,
            profile: {
                craft,
                experienceLevel,
                yearsOfExperience: years,
                skills,
                manifesto,
                bestProject,
                githubUrl,
                employmentStatus,
                openToBounties,
                minBountyReward,
                workPreference,
                availability,
                commitmentLevel,
                guilds
            }
        };

        try {
            const res = await apiFetch("/user/profile", {
                method: "PATCH",
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to update profile");

            // Reload page to reflect fresh dashboard data
            window.location.reload();
        } catch (err: any) {
            setError(err.message || String(err));
            setIsSaving(false);
        }
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-obsidian/80 backdrop-blur-md" onClick={onClose} />

                <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-obsidian border border-white/10 rounded-bento shadow-2xl overflow-hidden">

                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/[0.02]">
                        <div>
                            <h2 className="font-clash font-bold text-2xl text-white">Edit Profile</h2>
                            <p className="font-mono text-[10px] text-white/50 uppercase tracking-widest mt-1">Update your CollabRise identity</p>
                        </div>
                        <button onClick={onClose} className="p-2 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                            <IconClose className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex px-6 space-x-6 border-b border-white/10 bg-white/[0.01]">
                        {(["identity", "professional", "preferences"] as const).map(tab => (
                            <button key={tab} onClick={() => setActiveTab(tab)} className={`py-4 font-mono text-[10px] uppercase tracking-widest border-b-2 transition-colors ${activeTab === tab ? "border-lime text-lime" : "border-transparent text-white/40 hover:text-white"}`}>
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-grow overflow-y-auto p-6 custom-scrollbar">
                        {error && <div className="mb-6 p-4 bg-acid/10 border border-acid/30 text-acid text-sm font-mono rounded-lg">{error}</div>}

                        {activeTab === "identity" && (
                            <div className="space-y-6">
                                <FormInput label="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Your Name" />
                                <FormInput label="Handle" value={handle} onChange={e => setHandle(e.target.value)} placeholder="username" prefix="@" />
                                <FormInput label="Country" value={country} onChange={e => setCountry(e.target.value)} placeholder="e.g. India" />
                                <FormTextarea label="Your Manifesto (Bio)" placeholder="What drives you to launch?" value={manifesto} onChange={e => setManifesto(e.target.value)} maxLength={200} />
                            </div>
                        )}

                        {activeTab === "professional" && (
                            <div className="space-y-6">
                                <FormSelect label="Primary Craft" value={craft} onChange={e => setCraft(e.target.value)} options={CRAFTS.map(c => ({ value: c, label: c }))} />
                                <div className="grid grid-cols-2 gap-4">
                                    <FormSelect label="Experience Level" value={experienceLevel} onChange={e => setExperienceLevel(e.target.value)} options={EXP_LEVELS.map(c => ({ value: c.value, label: c.label }))} />
                                    <FormSlider label="Years of Experience" value={years} onChange={setYears} min={0} max={20} format={(v: number) => v === 20 ? "20+" : v.toString()} />
                                </div>
                                <div>
                                    <label className="block font-mono text-xs text-white/70 uppercase tracking-widest mb-3">Skills & Tools</label>
                                    <TagPicker label="Skills" selected={skills} onChange={setSkills} options={SKILLS} max={10} />
                                </div>
                                <FormInput label="Best Venture Name" value={bestProject} onChange={e => setBestProject(e.target.value)} placeholder="Name of the best thing you've launched" />
                                <FormInput label="GitHub URL" value={githubUrl} onChange={e => setGithubUrl(e.target.value)} placeholder="https://github.com/..." />
                                <div>
                                    <label className="block font-mono text-xs text-white/70 uppercase tracking-widest mb-3">Guilds</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {GUILDS.map((g: string) => (
                                            <div key={g} onClick={() => setGuilds(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g].slice(0, 3))} className={`p-3 rounded-lg border cursor-pointer transition-all text-sm font-mono ${guilds.includes(g) ? 'bg-lime/10 border-lime/50 text-lime' : 'bg-black/30 border-white/5 text-white/50 hover:border-white/20'}`}>
                                                {g}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "preferences" && (
                            <div className="space-y-6">
                                <RadioGroup label="Current Employment Status" value={employmentStatus} onChange={setEmploymentStatus} options={EMP_STATUSES} />
                                <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                                    <Toggle label="Open to Strategic Bounties?" checked={openToBounties} onChange={setOpenToBounties} />
                                    {openToBounties && (
                                        <div className="mt-4 pt-4 border-t border-white/5">
                                            <FormSlider label="Minimum Bounty Reward (USD)" value={minBountyReward} onChange={setMinBountyReward} min={50} max={5000} step={50} format={(v: number) => `$${v}${v === 5000 ? "+" : ""}`} />
                                        </div>
                                    )}
                                </div>
                                <RadioGroup label="Work Preference" value={workPreference} onChange={setWorkPreference} options={WORK_PREFS} />
                                <FormSlider label="Availability (Hours / Week)" value={availability} onChange={setAvailability} min={0} max={60} step={5} format={(v: number) => v === 60 ? "60+" : v.toString()} />
                                <RadioGroup label="Commitment Level" value={commitmentLevel} onChange={setCommitmentLevel} options={COMMITMENT_LEVELS} />
                            </div>
                        )}
                    </div>

                    {/* Footer / Actions */}
                    <div className="p-6 border-t border-white/10 bg-black/40 flex justify-end gap-3">
                        <ForgeButton variant="ghost" onClick={onClose}>Cancel</ForgeButton>
                        <ForgeButton variant="primary" onClick={handleSave} loading={isSaving}>Save Changes</ForgeButton>
                    </div>

                </motion.div>
            </div>
        </AnimatePresence>
    );
}
