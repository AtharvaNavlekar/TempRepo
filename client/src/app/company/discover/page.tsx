"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ForgeButton, BentoCard, PulseTag } from "@/components/forge";
import { Rocket, Search } from "lucide-react";
import { apiFetch } from "@/lib/api";

/* ─── Types ─── */
interface FeedProject {
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

/* ─── Constants ─── */
const ALL_TAGS = [
    "React", "Next.js", "TypeScript", "Node.js", "Python",
    "TailwindCSS", "PostgreSQL", "MongoDB", "Figma", "Docker",
    "OpenAI", "AWS", "Vercel", "Flutter", "Swift",
];

const ALL_TYPES = ["Frontend", "Backend", "Full-Stack", "Design", "Mobile", "AI/ML", "Web3"];

/* ════════════════════════════════════════════════════════════
   INVITE MODAL
   ════════════════════════════════════════════════════════════ */
function InviteModal({ project, onClose }: { project: FeedProject; onClose: () => void }) {
    const [message, setMessage] = useState("");
    const [interviewLink, setInterviewLink] = useState("");
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSend = async () => {
        if (!interviewLink.trim()) {
            setError("Interview link is required");
            return;
        }
        setSending(true);
        setError(null);
        try {
            const res = await apiFetch("/invite", {
                method: "POST",
                body: JSON.stringify({
                    builderId: project.builderId,
                    projectId: project.id,
                    projectName: project.name,
                    message,
                    interviewLink,
                }),
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to send invite");
            }
            setSent(true);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "An error occurred");
            setSending(false);
        }
    };

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="bg-obsidian border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl"
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
                {sent ? (
                    <div className="p-10 text-center">
                        <div className="w-14 h-14 rounded-2xl bg-lime/10 flex items-center justify-center mb-4"><Rocket className="w-7 h-7 text-lime" /></div>
                        <h2 className="font-clash font-bold text-2xl text-lime mb-2">Invite Sent!</h2>
                        <p className="font-mono text-sm text-white/50 mb-6">
                            @{project.builderHandle} will see your interview invite.
                        </p>
                        <ForgeButton onClick={onClose} className="bg-lime text-obsidian border-none hover:bg-white">DONE</ForgeButton>
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 bg-white/[0.02]">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="font-clash font-bold text-xl text-white">Invite to Interview</h2>
                                    <p className="font-mono text-xs text-white/50 mt-1">
                                        Reach out to <span className="text-lime">@{project.builderHandle}</span> about <span className="text-cyber">{project.name}</span>
                                    </p>
                                </div>
                                <button onClick={onClose} className="text-white/50 hover:text-white transition-colors p-1">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="p-6 space-y-5">
                            {error && (
                                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 font-mono text-xs">
                                    {error}
                                </div>
                            )}

                            <div>
                                <label className="block font-mono text-[10px] text-white/50 uppercase tracking-widest mb-2">
                                    Interview / Meeting Link *
                                </label>
                                <input
                                    type="url"
                                    value={interviewLink}
                                    onChange={e => setInterviewLink(e.target.value)}
                                    placeholder="https://meet.google.com/... or https://calendly.com/..."
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-lime/50 transition-colors placeholder:text-white/20"
                                />
                            </div>

                            <div>
                                <label className="block font-mono text-[10px] text-white/50 uppercase tracking-widest mb-2">
                                    Personal Message (Optional)
                                </label>
                                <textarea
                                    value={message}
                                    onChange={e => setMessage(e.target.value)}
                                    placeholder="Tell them why you are impressed with their work..."
                                    rows={3}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-lime/50 transition-colors placeholder:text-white/20 resize-none"
                                />
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-white/10 bg-white/[0.02] flex justify-end gap-4">
                            <ForgeButton variant="ghost" onClick={onClose} disabled={sending}>Cancel</ForgeButton>
                            <ForgeButton
                                onClick={handleSend}
                                disabled={sending}
                                className="bg-lime text-obsidian border-none hover:bg-white min-w-[140px]"
                            >
                                {sending ? "SENDING..." : "SEND INVITE →"}
                            </ForgeButton>
                        </div>
                    </>
                )}
            </motion.div>
        </motion.div>
    );
}

/* ════════════════════════════════════════════════════════════
   MAIN PAGE
   ════════════════════════════════════════════════════════════ */
export default function CompanyDiscoverPage() {
    const [projects, setProjects] = useState<FeedProject[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [selectedType, setSelectedType] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [inviteTarget, setInviteTarget] = useState<FeedProject | null>(null);

    const fetchFeed = useCallback(async () => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams();
            if (selectedTags.length > 0) params.set("tags", selectedTags.join(","));
            if (selectedType) params.set("type", selectedType);
            if (searchQuery.trim()) params.set("q", searchQuery.trim());

            const res = await apiFetch(`/feed?${params.toString()}`);
            if (res.ok) {
                const data = await res.json();
                setProjects(data.projects);
            }
        } catch (e) {
            console.error("Feed fetch error:", e);
        } finally {
            setIsLoading(false);
        }
    }, [selectedTags, selectedType, searchQuery]);

    useEffect(() => {
        fetchFeed();
    }, [fetchFeed]);

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    const clearFilters = () => {
        setSelectedTags([]);
        setSelectedType("");
        setSearchQuery("");
    };

    return (
        <div className="min-h-[calc(100vh-5rem)] max-w-7xl mx-auto p-6 md:p-12">
            {/* Invite Modal */}
            <AnimatePresence>
                {inviteTarget && (
                    <InviteModal project={inviteTarget} onClose={() => setInviteTarget(null)} />
                )}
            </AnimatePresence>

            {/* ─── Page Header ─── */}
            <div className="mb-12 border-b border-white/10 pb-8">
                <PulseTag status="live" label="TALENT DISCOVERY" className="mb-4" />
                <h1 className="font-clash font-bold text-4xl md:text-5xl text-white mb-3">
                    Discover <span className="text-lime">Builders</span>
                </h1>
                <p className="font-mono text-sm text-white/50 max-w-xl">
                    Browse real shipped artifacts from our builder community. No resumes. No years-of-experience gates.
                    Just proof of work. Find what you need, invite the builder.
                </p>
            </div>

            {/* ─── Filter Bar ─── */}
            <BentoCard className="mb-10 p-6" accent="gold">
                <div className="space-y-6">
                    {/* Search */}
                    <div>
                        <label className="block font-mono text-[10px] text-white/40 uppercase tracking-widest mb-3">
                            Search Projects
                        </label>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            placeholder="Search by project name or description..."
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-lime/50 transition-colors placeholder:text-white/20"
                        />
                    </div>

                    {/* Type Filter */}
                    <div>
                        <label className="block font-mono text-[10px] text-white/40 uppercase tracking-widest mb-3">
                            Project Type
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {ALL_TYPES.map(type => (
                                <button
                                    key={type}
                                    onClick={() => setSelectedType(prev => prev === type ? "" : type)}
                                    className={`px-4 py-2 rounded-lg font-mono text-xs border transition-all duration-200 ${selectedType === type
                                        ? "bg-cyber/20 border-cyber text-cyber"
                                        : "bg-white/5 border-white/10 text-white/50 hover:border-white/30 hover:text-white/70"
                                        }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tag Filter */}
                    <div>
                        <label className="block font-mono text-[10px] text-white/40 uppercase tracking-widest mb-3">
                            Tech Stack / Skills
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {ALL_TAGS.map(tag => (
                                <button
                                    key={tag}
                                    onClick={() => toggleTag(tag)}
                                    className={`px-3 py-1.5 rounded-full font-mono text-[11px] border transition-all duration-200 ${selectedTags.includes(tag)
                                        ? "bg-lime/10 border-lime text-lime"
                                        : "bg-white/5 border-white/10 text-white/40 hover:border-white/20"
                                        }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Active Filters Summary */}
                    {(selectedTags.length > 0 || selectedType || searchQuery) && (
                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                            <p className="font-mono text-xs text-white/30">
                                {selectedTags.length > 0 && <span className="text-lime">{selectedTags.length} tags</span>}
                                {selectedType && <span className="text-cyber ml-3">{selectedType}</span>}
                                {searchQuery && <span className="text-white/50 ml-3">&quot;{searchQuery}&quot;</span>}
                            </p>
                            <button onClick={clearFilters} className="font-mono text-xs text-acid hover:text-white transition-colors">
                                ✕ Clear All
                            </button>
                        </div>
                    )}
                </div>
            </BentoCard>

            {/* ─── Results Count ─── */}
            <div className="flex items-center justify-between mb-8">
                <h2 className="font-clash font-bold text-2xl text-white">
                    {isLoading ? "Scanning..." : `${projects.length} Artifact${projects.length !== 1 ? "s" : ""} Found`}
                </h2>
                <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
                    Sorted by Ship Score
                </span>
            </div>

            {/* ─── Project Stream ─── */}
            {isLoading ? (
                <div className="space-y-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-48 rounded-bento bg-white/[0.02] border border-white/5 animate-pulse" />
                    ))}
                </div>
            ) : projects.length === 0 ? (
                <BentoCard className="p-12 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-4"><Search className="w-7 h-7 text-white/40" /></div>
                    <h3 className="font-clash font-bold text-xl text-white mb-2">No Artifacts Match</h3>
                    <p className="font-mono text-sm text-white/40 mb-6">
                        Try broadening your filters or search query.
                    </p>
                    <ForgeButton variant="ghost" onClick={clearFilters}>Clear Filters</ForgeButton>
                </BentoCard>
            ) : (
                <div className="space-y-6">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05, type: "spring", damping: 25 }}
                        >
                            <div className="group relative rounded-bento border border-white/[0.08] bg-white/[0.02] backdrop-blur-md hover:border-lime/30 transition-all duration-300 overflow-hidden">
                                {/* Score Badge */}
                                <div className="absolute top-5 right-5 flex items-center gap-1.5 bg-obsidian/80 border border-lime/20 rounded-full px-3 py-1.5">
                                    <span className="font-clash font-bold text-lime text-lg">{project.score}</span>
                                    <span className="font-mono text-[9px] text-white/30">PTS</span>
                                </div>

                                <div className="p-6 md:p-8">
                                    {/* Builder Info + Type */}
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lime/20 to-cyber/20 border border-white/10 flex items-center justify-center font-clash font-bold text-white text-sm">
                                            {project.builderName.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-mono text-sm text-white/80">
                                                <span className="text-lime">@{project.builderHandle}</span>
                                                <span className="text-white/20 mx-2">·</span>
                                                <span>{project.builderCraft}</span>
                                            </p>
                                            <p className="font-mono text-[10px] text-white/30">
                                                {project.builderCountry} · {project.builderAvailability}hrs/week
                                            </p>
                                        </div>
                                        <span className="ml-auto font-mono text-[10px] tracking-[0.2em] text-cyber uppercase bg-cyber/10 px-3 py-1 rounded border border-cyber/20">
                                            {project.type}
                                        </span>
                                    </div>

                                    {/* Project Title + Description */}
                                    <h3 className="font-clash font-bold text-2xl text-white mb-3 group-hover:text-lime transition-colors">
                                        {project.name}
                                    </h3>
                                    <p className="font-mono text-sm text-white/50 leading-relaxed mb-5 max-w-3xl">
                                        {project.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.tags.map((tag, i) => (
                                            <span
                                                key={i}
                                                className="px-2.5 py-1 rounded-full bg-white/[0.05] text-white/50 font-mono text-[10px] tracking-wider border border-white/[0.06]"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Footer — Date + Actions */}
                                    <div className="flex items-center justify-between pt-5 border-t border-white/[0.06]">
                                        <p className="font-mono text-[11px] text-white/30">{project.date}</p>
                                        <div className="flex gap-3">
                                            {project.url && (
                                                <a
                                                    href={project.url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="font-mono text-xs text-white/40 hover:text-lime transition-colors border border-white/10 px-4 py-2 rounded-lg hover:border-lime/30"
                                                >
                                                    VIEW PROJECT ↗
                                                </a>
                                            )}
                                            <ForgeButton
                                                onClick={() => setInviteTarget(project)}
                                                className="bg-lime text-obsidian border-none hover:bg-white text-xs"
                                            >
                                                INVITE TO INTERVIEW →
                                            </ForgeButton>
                                        </div>
                                    </div>
                                </div>

                                {/* Hover glow */}
                                <div className="absolute inset-0 rounded-bento opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-lime/[0.02] via-transparent to-cyber/[0.02]" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
