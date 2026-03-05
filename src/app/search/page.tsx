"use client";

import { motion, AnimatePresence } from "framer-motion";
import { BentoCard, PulseTag, GlitchText, RenderIcon } from "@/components/forge";
import { useState } from "react";
import Link from "next/link";
import { IconSearch, IconClose, IconTerminal } from "@/components/icons";
const CATEGORIES = ["ALL", "CODE", "DESIGN", "HARDWARE", "CULINARY", "MUSIC", "WRITING", "MAKER"];
const SORT_OPTIONS = ["RELEVANCE", "SCORE ↓", "NEWEST", "ENDING SOON"];

const RESULTS = [
    { id: "proj-001", title: "Decentralized Identity Layer", type: "CODE", score: 2400, builders: 4, status: "building" as const, guild: "React Guild", description: "Self-sovereign identity protocol replacing centralized credentialing.", progress: 67, tags: ["Rust", "WASM"] },
    { id: "proj-002", title: "AI Recipe Engine", type: "CULINARY", score: 1800, builders: 3, status: "live" as const, guild: "Chef Guild", description: "Generative recipe creation with nutritional scoring.", progress: 85, tags: ["Python", "GPT-4"] },
    { id: "proj-003", title: "Zero-Waste Packaging", type: "DESIGN", score: 3200, builders: 2, status: "shipped" as const, guild: "Design Guild", description: "Compostable packaging designed with circular economy principles.", progress: 100, tags: ["Figma", "Blender"] },
    { id: "proj-004", title: "CNC Controller v2", type: "HARDWARE", score: 900, builders: 5, status: "staked" as const, guild: "Maker Guild", description: "Multi-axis CNC controller with real-time toolpath visualization.", progress: 22, tags: ["C++", "Arduino"] },
    { id: "proj-005", title: "Generative Ambient Album", type: "MUSIC", score: 600, builders: 2, status: "building" as const, guild: "Music Guild", description: "AI-assisted ambient compositions with live stem manipulation.", progress: 40, tags: ["Ableton", "Max/MSP"] },
    { id: "proj-006", title: "Cross-Platform Auth SDK", type: "CODE", score: 4100, builders: 3, status: "live" as const, guild: "React Guild", description: "Universal auth SDK supporting passkeys, OAuth, and Web3.", progress: 78, tags: ["TypeScript", "OAuth"] },
    { id: "bounty-001", title: "Real-Time Notification System", type: "CODE", score: 0, builders: 0, status: "live" as const, guild: "NeonLabs Bounty", description: "Build a scalable notification system using WebSocket connections.", progress: 0, tags: ["React", "WebSocket"] },
    { id: "user-neo", title: "0xNeo — Full-Stack Architect", type: "CODE", score: 12400, builders: 0, status: "shipped" as const, guild: "React Guild", description: "Top builder. 24 ships. 14-day active streak.", progress: 0, tags: ["React", "Rust", "Systems"] },
];

const TYPE_ICONS: Record<string, string> = { CODE: "IconShipScore", DESIGN: "IconPalette", HARDWARE: "IconWrench", CULINARY: "IconFlame", MUSIC: "IconMusic", WRITING: "IconPencil", MAKER: "IconHammer" };

export default function SearchPage() {
    const [activeCategory, setActiveCategory] = useState("ALL");
    const [sortBy, setSortBy] = useState("RELEVANCE");
    const [query, setQuery] = useState("");

    const filtered = RESULTS.filter(r => {
        const matchCategory = activeCategory === "ALL" || r.type === activeCategory;
        const matchQuery = !query || r.title.toLowerCase().includes(query.toLowerCase()) || r.description.toLowerCase().includes(query.toLowerCase());
        return matchCategory && matchQuery;
    });

    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans">
            <main className="max-w-6xl mx-auto px-6 py-32">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="font-clash font-bold text-6xl mb-8"><GlitchText text="SEARCH" /></h1>

                    {/* Search Input */}
                    <div className="relative mb-6">
                        <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search projects, builders, guilds, bounties..."
                            className="w-full bg-black/60 border-2 border-white/10 rounded-bento p-6 pl-16 font-mono text-white focus:border-lime outline-none transition-all text-lg placeholder:text-white/20 focus:shadow-glow" />
                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30 font-mono text-xl"><IconTerminal className="w-5 h-5" /></span>
                        {query && <button onClick={() => setQuery("")} className="absolute right-6 top-1/2 -translate-y-1/2 text-white/30 hover:text-white font-mono text-sm"><IconClose className="w-5 h-5" /></button>}
                    </div>

                    {/* Category + Sort */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
                        <div className="flex flex-wrap gap-2">
                            {CATEGORIES.map(cat => (
                                <motion.button key={cat} whileTap={{ scale: 0.95 }} onClick={() => setActiveCategory(cat)}
                                    className={`px-4 py-2 font-mono text-xs uppercase tracking-widest rounded-bento-sm border transition-all ${activeCategory === cat ? "bg-lime/10 border-lime/40 text-lime shadow-glow" : "border-white/10 text-white/40 hover:text-white hover:border-white/20"}`}>
                                    {TYPE_ICONS[cat] && <RenderIcon name={TYPE_ICONS[cat]} className="w-3 h-3 mr-2 inline-block" />}{cat}
                                </motion.button>
                            ))}
                        </div>
                        <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="bg-black/60 border border-white/10 rounded-bento-sm px-4 py-2 font-mono text-xs text-white/60 outline-none focus:border-lime">
                            {SORT_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>

                    {/* Results Count */}
                    <p className="font-mono text-xs text-white/30 mb-6">{filtered.length} result{filtered.length !== 1 ? "s" : ""} found</p>
                </motion.div>

                {/* Results */}
                <AnimatePresence mode="wait">
                    <motion.div key={activeCategory + query} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                        {filtered.map((r, i) => (
                            <motion.div key={r.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04, type: "spring", stiffness: 200, damping: 25 }}>
                                <Link href={r.id.startsWith("user") ? "/ship-log/0xNeo" : r.id.startsWith("bounty") ? `/bounties/${r.id}` : `/project/${r.id}`}>
                                    <BentoCard className="p-6 flex flex-col md:flex-row md:items-center gap-6 hover:border-lime/30 cursor-pointer group transition-all">
                                        <div className="flex items-center gap-4 flex-shrink-0">
                                            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                                                <RenderIcon name={TYPE_ICONS[r.type] || "IconPalette"} className="w-5 h-5 text-lime" />
                                            </div>
                                            <PulseTag status={r.status} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-clash font-bold text-lg group-hover:text-lime transition-colors">{r.title}</h3>
                                            <p className="font-mono text-xs text-white/40 mt-1">{r.guild} · {r.builders > 0 ? `${r.builders} builders` : "Individual"}</p>
                                            <p className="font-mono text-xs text-white/30 mt-2 line-clamp-1">{r.description}</p>
                                            {r.tags.length > 0 && <div className="flex gap-1.5 mt-2">{r.tags.map(t => <span key={t} className="px-2 py-0.5 bg-white/5 border border-white/8 rounded font-mono text-[9px] text-white/40">{t}</span>)}</div>}
                                        </div>
                                        {r.progress > 0 && (
                                            <div className="flex-shrink-0 w-24">
                                                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-1"><div className={`h-full rounded-full ${r.progress === 100 ? "bg-lime" : "bg-cyber"}`} style={{ width: `${r.progress}%` }} /></div>
                                                <p className="font-mono text-[10px] text-white/30 text-right">{r.progress}%</p>
                                            </div>
                                        )}
                                        <span className="font-clash font-bold text-lime text-xl flex-shrink-0">{r.score > 0 ? r.score.toLocaleString() : "—"}</span>
                                    </BentoCard>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {filtered.length === 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                        <p className="text-4xl mb-4"><IconSearch className="w-5 h-5" /></p>
                        <p className="font-clash font-bold text-xl mb-2">No results found</p>
                        <p className="font-mono text-sm text-white/40">Try adjusting your search or category filter.</p>
                    </motion.div>
                )}

                {/* Quick Links */}
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: "Browse Bounties", href: "/bounties", icon: "IconHire" },
                        { label: "Explore Guilds", href: "/guilds", icon: "IconUsers" },
                        { label: "Leaderboard", href: "/leaderboard", icon: "IconTrophy" },
                        { label: "Global Pulse", href: "/pulse", icon: "IconSignal" },
                    ].map(link => (
                        <Link key={link.href} href={link.href}>
                            <BentoCard className="p-5 text-center hover:border-lime/30 cursor-pointer group">
                                <RenderIcon name={link.icon} className="w-6 h-6 mx-auto text-white/40 group-hover:text-lime transition-colors mb-2" />
                                <p className="font-clash font-bold text-sm mt-2 group-hover:text-lime transition-colors">{link.label}</p>
                            </BentoCard>
                        </Link>
                    ))}
                </motion.div>
            </main>
        </div>
    );
}
