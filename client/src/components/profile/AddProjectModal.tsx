"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ForgeButton } from "@/components/forge";
import { FormInput, FormTextarea, TagPicker } from "@/app/auth/create-account/FormField";
import { PublicUser, DepartmentConfig, ProjectCategory, ScoreParameter } from "@/lib/types";
import { apiFetch } from "@/lib/api";

const PROJECT_TYPES = ["SaaS", "Fintech", "Consumer App", "B2B / Enterprise", "Deep Tech", "Web3", "Marketplace", "AI / ML", "Developer Tools", "Infrastructure"];

const PROJECT_CATEGORIES: { value: ProjectCategory; label: string }[] = [
    { value: "code", label: "Code / Software" },
    { value: "architecture", label: "Architecture / System Design" },
    { value: "analysis", label: "Analysis / Data Report" },
    { value: "model", label: "ML Model / Algorithm" },
    { value: "automation", label: "Script / Automation" },
    { value: "hardware", label: "Hardware / IoT" },
    { value: "achievement", label: "Achievement" },
    { value: "other", label: "Other" },
];

// A list of common tags for projects
const PROJECT_TAGS = [
    "React", "Next.js", "TypeScript", "Node.js", "Python",
    "TailwindCSS", "PostgreSQL", "MongoDB", "Figma", "Docker",
    "OpenAI", "AWS", "Vercel"
];

interface AddProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: PublicUser;
}

export default function AddProjectModal({ isOpen, onClose }: AddProjectModalProps) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [type, setType] = useState("Full-Stack");
    const [tags, setTags] = useState<string[]>([]);

    // Ship Score additions
    const [category, setCategory] = useState<ProjectCategory>("code");
    const [department, setDepartment] = useState("");
    const [departmentsList, setDepartmentsList] = useState<{ id: string; name: string; icon: string; description: string }[]>([]);
    const [activeDepartment, setActiveDepartment] = useState<DepartmentConfig | null>(null);
    const [scoreInputs, setScoreInputs] = useState<Record<string, number>>({});

    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch dropdown list of departments on mount
    useEffect(() => {
        if (!isOpen) return;
        apiFetch("/score/departments")
            .then(res => res.json())
            .then(data => {
                if (data.departments) setDepartmentsList(data.departments);
            })
            .catch(console.error);
    }, [isOpen]);

    // Fetch specific department config when department changes
    useEffect(() => {
        if (!department) {
            setActiveDepartment(null);
            setScoreInputs({});
            return;
        }
        apiFetch(`/score/departments/${department}`)
            .then(res => res.json())
            .then(data => {
                if (data.department) {
                    setActiveDepartment(data.department);
                    const initInputs: Record<string, number> = {};
                    data.department.parameters.forEach((p: ScoreParameter) => {
                        initInputs[p.key] = p.inputType === "select" ? 0 : (p.min || 0);
                        if (p.inputType === "boolean") initInputs[p.key] = 0;
                    });
                    setScoreInputs(initInputs);
                }
            })
            .catch(console.error);
    }, [department]);

    // Cleanup when closing
    useEffect(() => {
        if (!isOpen) {
            setName("");
            setDescription("");
            setUrl("");
            setTags([]);
            setDepartment("");
            setCategory("code");
            setScoreInputs({});
            setActiveDepartment(null);
            setError(null);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleInputUpdate = (key: string, value: number) => {
        setScoreInputs(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        setError(null);

        if (!department) {
            setError("Department must be selected to compute the Ship Score.");
            setIsSaving(false);
            return;
        }

        try {
            const res = await apiFetch("/user/project", {
                method: "POST",
                body: JSON.stringify({
                    name,
                    description,
                    url: url,
                    type,
                    tags,
                    department,
                    category,
                    scoreInputs
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to add project");
            }

            // Successfully added, reload page to sync
            window.location.reload();
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "An error occurred");
            setIsSaving(false);
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/80 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="bg-obsidian border border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl"
                    initial={{ scale: 0.95, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                >
                    {/* Header */}
                    <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
                        <div>
                            <h2 className="font-clash font-bold text-2xl text-white">Launch New Venture</h2>
                            <p className="font-mono text-xs text-white/50 mt-1">Submit your venture to be evaluated and scored</p>
                        </div>
                        <button onClick={onClose} className="text-white/50 hover:text-white transition-colors p-2">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-grow space-y-6">
                        {error && (
                            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 font-mono text-sm">
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-6">
                                <FormInput
                                    label="Venture Name"
                                    placeholder="e.g. Neural Engine AI"
                                    value={name}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                                />

                                <FormTextarea
                                    label="Description"
                                    placeholder="What did you launch? What problem does it solve?"
                                    value={description}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                                    maxLen={500}
                                    currentLen={description.length}
                                    rows={4}
                                />

                                <FormInput
                                    label="Venture Link (Optional)"
                                    placeholder="https://..."
                                    value={url}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
                                />

                                <div>
                                    <label className="block font-mono text-xs text-white/50 mb-3 uppercase tracking-widest">
                                        Venture Type
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {PROJECT_TYPES.map((t) => (
                                            <button
                                                key={t}
                                                onClick={() => setType(t)}
                                                className={`px-4 py-2 rounded-lg font-mono text-xs border transition-colors ${type === t ? "bg-lime/10 border-lime text-lime" : "bg-white/5 border-white/10 text-white/60 hover:border-white/30"}`}
                                            >
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <TagPicker
                                    label="Tech Stack (Max 5)"
                                    options={PROJECT_TAGS}
                                    selected={tags}
                                    onChange={setTags}
                                    max={5}
                                    accentColor="gold"
                                />
                            </div>

                            {/* Scoring Section */}
                            <div className="space-y-6 md:pl-6 md:border-l border-white/10">
                                <div>
                                    <label className="block font-mono text-xs text-white/50 mb-3 uppercase tracking-widest">
                                        Venture Category
                                    </label>
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value as ProjectCategory)}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-lime/50 transition-colors"
                                    >
                                        {PROJECT_CATEGORIES.map(cat => (
                                            <option key={cat.value} value={cat.value} className="bg-obsidian text-white">{cat.label}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block font-mono text-xs text-white/50 mb-3 uppercase tracking-widest">
                                        Evaluation Department
                                    </label>
                                    <select
                                        value={department}
                                        onChange={(e) => setDepartment(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-lime/50 transition-colors"
                                    >
                                        <option value="" disabled className="bg-obsidian text-white/50">Select Department...</option>
                                        {departmentsList.map(dept => (
                                            <option key={dept.id} value={dept.id} className="bg-obsidian text-white">
                                                {dept.icon} {dept.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {activeDepartment && (
                                    <div className="mt-6 pt-6 border-t border-white/10 space-y-5">
                                        <div className="mb-4">
                                            <h3 className="font-clash font-semibold text-lime text-lg flex items-center gap-2">
                                                {activeDepartment.icon} Score Parameters
                                            </h3>
                                            <p className="font-mono text-xs text-white/40 mt-1">{activeDepartment.description}</p>
                                        </div>

                                        {activeDepartment.parameters.map((param) => (
                                            <div key={param.key} className="space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <label className="font-mono text-xs text-white/70">
                                                        {param.label} <span className="text-white/30 ml-1">({Math.round(param.weight * 100)}%)</span>
                                                    </label>
                                                    {param.inputType === 'slider' && (
                                                        <span className="font-mono text-xs text-cyber">{scoreInputs[param.key] || 0}</span>
                                                    )}
                                                </div>
                                                <p className="font-mono text-[10px] text-white/40 mb-2">{param.description}</p>

                                                {param.inputType === 'slider' && (
                                                    <input
                                                        type="range"
                                                        min={param.min || 0}
                                                        max={param.max || 100}
                                                        value={scoreInputs[param.key] || 0}
                                                        onChange={(e) => handleInputUpdate(param.key, parseInt(e.target.value))}
                                                        className="w-full accent-lime"
                                                    />
                                                )}

                                                {param.inputType === 'select' && param.options && (
                                                    <select
                                                        value={scoreInputs[param.key] || 0}
                                                        onChange={(e) => handleInputUpdate(param.key, parseInt(e.target.value))}
                                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-lime/50 transition-colors"
                                                    >
                                                        {param.options.map((opt, i) => (
                                                            <option key={i} value={i} className="bg-obsidian">{opt}</option>
                                                        ))}
                                                    </select>
                                                )}

                                                {param.inputType === 'boolean' && (
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleInputUpdate(param.key, 100)}
                                                            className={`flex-1 py-1.5 rounded-lg border font-mono text-xs transition-colors ${scoreInputs[param.key] === 100 ? "bg-lime/20 border-lime text-lime" : "bg-white/5 border-white/10 text-white/50"}`}
                                                        >
                                                            Yes
                                                        </button>
                                                        <button
                                                            onClick={() => handleInputUpdate(param.key, 0)}
                                                            className={`flex-1 py-1.5 rounded-lg border font-mono text-xs transition-colors ${(scoreInputs[param.key] || 0) === 0 ? "bg-red-500/20 border-red-500/50 text-red-400" : "bg-white/5 border-white/10 text-white/50"}`}
                                                        >
                                                            No
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-white/10 bg-white/[0.02] flex justify-end gap-4">
                        <ForgeButton variant="ghost" onClick={onClose} disabled={isSaving}>Cancel</ForgeButton>
                        <ForgeButton onClick={handleSave} disabled={isSaving} className="bg-lime text-obsidian border-none hover:bg-white min-w-[120px]">
                            {isSaving ? "EVALUATING..." : "LAUNCH & SCORE"}
                        </ForgeButton>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
