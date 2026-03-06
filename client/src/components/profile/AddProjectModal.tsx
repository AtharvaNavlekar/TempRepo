"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ForgeButton } from "@/components/forge";
import { FormInput, FormTextarea, TagPicker } from "@/app/auth/create-account/FormField";
import { PublicUser } from "@/lib/types";
import { apiFetch } from "@/lib/api";

const PROJECT_TYPES = ["SaaS", "Fintech", "Consumer App", "B2B / Enterprise", "Deep Tech", "Web3", "Marketplace"];

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

    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleSave = async () => {
        setIsSaving(true);
        setError(null);

        try {
            const res = await apiFetch("/user/project", {
                method: "POST",
                body: JSON.stringify({
                    name,
                    description,
                    url: url,
                    type,
                    tags,
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
                    className="bg-obsidian border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl"
                    initial={{ scale: 0.95, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                >
                    {/* Header */}
                    <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
                        <div>
                            <h2 className="font-clash font-bold text-2xl text-white">Launch New Venture</h2>
                            <p className="font-mono text-xs text-white/50 mt-1">Add a venture to your venture log</p>
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
                            accentColor="cyber"
                        />
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-white/10 bg-white/[0.02] flex justify-end gap-4">
                        <ForgeButton variant="ghost" onClick={onClose} disabled={isSaving}>Cancel</ForgeButton>
                        <ForgeButton onClick={handleSave} disabled={isSaving} className="bg-lime text-obsidian border-none hover:bg-white min-w-[120px]">
                            {isSaving ? "LAUNCHING..." : "LAUNCH VENTURE"}
                        </ForgeButton>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
