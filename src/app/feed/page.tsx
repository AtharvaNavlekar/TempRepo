"use client";

import { motion, AnimatePresence } from "framer-motion";
import { BentoCard, PulseTag, ForgeButton, GlitchText, RenderIcon } from "@/components/forge";
import Link from "next/link";
import { useState } from "react";
import { IconFlame, IconMenu, IconTerminal } from "@/components/icons";

const PROJECTS = [
    { id: "proj-001", title: "Decentralized Identity Layer", guild: "React Guild", guildIcon: "IconCpu", builders: 4, status: "building" as const, score: 2400, tags: ["Rust", "WASM", "ZK-Proofs"], daysLeft: 12, description: "Self-sovereign identity protocol replacing centralized credentialing.", progress: 67 },
    { id: "proj-002", title: "AI-Powered Recipe Engine", guild: "Chef Guild", guildIcon: "IconFlame", builders: 3, status: "live" as const, score: 1800, tags: ["Python", "GPT-4", "FastAPI"], daysLeft: 5, description: "Generative recipe creation with nutritional scoring and cost analysis.", progress: 85 },
    { id: "proj-003", title: "Zero-Waste Packaging Design", guild: "Design Guild", guildIcon: "IconPalette", builders: 2, status: "shipped" as const, score: 3200, tags: ["Figma", "Blender", "Sustainability"], daysLeft: 0, description: "Compostable packaging system designed with circular economy principles.", progress: 100 },
    { id: "proj-004", title: "Open-Source CNC Controller", guild: "Maker Guild", guildIcon: "IconWrench", builders: 5, status: "staked" as const, score: 900, tags: ["C++", "Arduino", "PCB Design"], daysLeft: 30, description: "Multi-axis CNC controller with real-time toolpath visualization.", progress: 22 },
    { id: "proj-005", title: "Ambient Generative Album", guild: "Music Guild", guildIcon: "IconMusic", builders: 2, status: "building" as const, score: 600, tags: ["Ableton", "Max/MSP", "Modular"], daysLeft: 21, description: "AI-assisted generative ambient compositions with live stem manipulation.", progress: 40 },
    { id: "proj-006", title: "Cross-Platform Auth SDK", guild: "React Guild", guildIcon: "IconCpu", builders: 3, status: "live" as const, score: 4100, tags: ["TypeScript", "OAuth", "WebAuthn"], daysLeft: 8, description: "Universal authentication SDK supporting passkeys, OAuth, and Web3 wallets.", progress: 78 },
    { id: "proj-007", title: "Artisan Bread Scoring System", guild: "Chef Guild", guildIcon: "IconFlame", builders: 1, status: "building" as const, score: 320, tags: ["IoT", "Computer Vision"], daysLeft: 45, description: "Camera + ML model that grades bread scoring patterns and crust quality.", progress: 15 },
    { id: "proj-008", title: "Woodworking Jig Library", guild: "Woodworking Guild", guildIcon: "IconWood", builders: 4, status: "shipped" as const, score: 2100, tags: ["CAD", "3D Print", "Parametric"], daysLeft: 0, description: "Open-source parametric jig designs for common woodworking operations.", progress: 100 },
    { id: "proj-009", title: "Portfolio Micro-Animations Kit", guild: "Design Guild", guildIcon: "IconPalette", builders: 2, status: "live" as const, score: 1500, tags: ["Framer Motion", "CSS", "SVG"], daysLeft: 3, description: "Drop-in animation library for developer portfolios with zero dependencies.", progress: 90 },
];

const FILTERS = ["ALL", "BUILDING", "LIVE", "SHIPPED", "STAKED"];

export default function FeedPage() {
    const [activeFilter, setActiveFilter] = useState("ALL");
    const [view, setView] = useState<"grid" | "list">("grid");

    const filtered = PROJECTS.filter(p => activeFilter === "ALL" || p.status === activeFilter.toLowerCase());

    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans">
            <main className="max-w-7xl mx-auto px-6 py-32">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
                    <div className="flex items-end justify-between mb-6">
                        <div>
                            <GlitchText text="DISCOVERY FEED" as="h1" className="text-6xl mb-3" />
                            <p className="font-mono text-white/50 max-w-lg">Active War Rooms across every guild. Filter by status, browse by craft, and find your next ship.</p>
                        </div>
                        <div className="flex gap-3">
                            <Link href="/search"><ForgeButton variant="secondary" size="sm"><IconTerminal className="w-4 h-4 inline" /> SEARCH</ForgeButton></Link>
                            <Link href="/project/new"><ForgeButton variant="primary" size="sm">+ NEW PROJECT</ForgeButton></Link>
                        </div>
                    </div>

                    {/* Stats Bar */}
                    <div className="grid grid-cols-4 gap-4 mb-8">
                        {[
                            { label: "ACTIVE ROOMS", value: "2,847", color: "text-lime" },
                            { label: "BUILDERS ONLINE", value: "1,203", color: "text-cyber" },
                            { label: "SHIPS TODAY", value: "47", color: "text-acid" },
                            { label: "TOTAL STAKED", value: "$142K", color: "text-yellow-400" },
                        ].map(stat => (
                            <BentoCard key={stat.label} className="p-4 text-center">
                                <p className={`font-clash font-bold text-2xl ${stat.color}`}>{stat.value}</p>
                                <p className="font-mono text-[10px] text-white/30 mt-1">{stat.label}</p>
                            </BentoCard>
                        ))}
                    </div>

                    {/* Filter + View Toggle */}
                    <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                            {FILTERS.map(f => (
                                <motion.button key={f} whileTap={{ scale: 0.95 }} onClick={() => setActiveFilter(f)}
                                    className={`px-4 py-2 font-mono text-xs uppercase tracking-widest rounded-bento-sm border transition-all ${activeFilter === f ? "bg-lime/10 border-lime/40 text-lime shadow-glow" : "border-white/10 text-white/40 hover:text-white hover:border-white/20"}`}>
                                    {f}
                                </motion.button>
                            ))}
                        </div>
                        <div className="flex gap-1 border border-white/10 rounded-bento-sm overflow-hidden">
                            <button onClick={() => setView("grid")} className={`px-3 py-2 font-mono text-xs ${view === "grid" ? "bg-white/10 text-white" : "text-white/30"}`}>▦</button>
                            <button onClick={() => setView("list")} className={`px-3 py-2 font-mono text-xs ${view === "list" ? "bg-white/10 text-white" : "text-white/30"}`}><IconMenu className="w-5 h-5" /></button>
                        </div>
                    </div>
                </motion.div>

                {/* Project Cards */}
                <AnimatePresence mode="wait">
                    <motion.div key={activeFilter + view} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className={view === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
                        {filtered.map((project, i) => (
                            <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04, type: "spring", stiffness: 200, damping: 25 }}>
                                <Link href={`/project/${project.id}`}>
                                    <BentoCard className={`h-full p-6 hover:border-lime/40 transition-all cursor-pointer group ${view === "list" ? "flex items-center gap-6" : ""}`}>
                                        {/* Status + Score */}
                                        <div className={`flex justify-between items-start ${view === "list" ? "flex-shrink-0 w-32" : "mb-4"}`}>
                                            <PulseTag status={project.status} />
                                            {view === "grid" && <span className="font-clash font-bold text-lime">{project.score} <span className="text-[10px] text-white/30">PTS</span></span>}
                                        </div>

                                        {/* Content */}
                                        <div className={view === "list" ? "flex-1" : ""}>
                                            <div className="flex items-center gap-2 mb-1">
                                                <RenderIcon name={project.guildIcon} className="w-4 h-4 text-lime" />
                                                <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">{project.guild}</span>
                                            </div>
                                            <h3 className="font-clash font-bold text-xl mb-2 group-hover:text-lime transition-colors">{project.title}</h3>
                                            <p className="font-mono text-xs text-white/40 mb-4 line-clamp-2">{project.description}</p>

                                            {/* Progress Bar */}
                                            <div className="mb-4">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="font-mono text-[10px] text-white/30">{project.builders} builders · {project.daysLeft > 0 ? `${project.daysLeft}d left` : "SHIPPED"}</span>
                                                    <span className="font-mono text-[10px] text-lime">{project.progress}%</span>
                                                </div>
                                                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                    <motion.div className={`h-full rounded-full ${project.progress === 100 ? "bg-lime" : "bg-cyber"}`} initial={{ width: 0 }} whileInView={{ width: `${project.progress}%` }} transition={{ duration: 0.8, delay: i * 0.05 }} viewport={{ once: true }} />
                                                </div>
                                            </div>

                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-1.5">
                                                {project.tags.map(t => <span key={t} className="px-2 py-0.5 bg-white/5 border border-white/8 rounded font-mono text-[10px] text-white/50">{t}</span>)}
                                            </div>
                                        </div>

                                        {view === "list" && <span className="font-clash font-bold text-lime text-xl flex-shrink-0">{project.score}</span>}
                                    </BentoCard>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* Trending Section */}
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-16">
                    <h2 className="font-clash font-bold text-2xl mb-6"><IconFlame className="w-4 h-4 inline" /> Trending This Week</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {PROJECTS.slice(0, 3).map((p, i) => (
                            <BentoCard key={p.id} className="p-5 flex items-center gap-4">
                                <span className="font-clash font-bold text-3xl text-lime/30">#{i + 1}</span>
                                <div><h4 className="font-clash font-bold text-sm">{p.title}</h4><p className="font-mono text-[10px] text-white/30">{p.guild} · {p.score} PTS</p></div>
                            </BentoCard>
                        ))}
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
