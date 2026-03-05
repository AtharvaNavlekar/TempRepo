"use client";

import { motion } from "framer-motion";
import { BentoCard, ForgeButton, PulseTag, GlitchText } from "@/components/forge";
import Link from "next/link";
import { useState } from "react";
const GUILDS = [
    { slug: "react", name: "React Guild", members: 2400, projects: 142, ships: 890, status: "live" as const, icon: "IconCpu", description: "Component architecture, state machines, and server components.", topBuilder: "0xNeo", topScore: 12400, growth: "+12%" },
    { slug: "rust", name: "Rust Guild", members: 1800, projects: 89, ships: 560, status: "live" as const, icon: "IconCode", description: "Systems programming, zero-cost abstractions, memory safety.", topBuilder: "CryptoMage", topScore: 11800, growth: "+8%" },
    { slug: "design", name: "Design Guild", members: 3100, projects: 210, ships: 1200, status: "live" as const, icon: "IconPalette", description: "Product design, design systems, and user experience.", topBuilder: "DesignSensei", topScore: 11200, growth: "+15%" },
    { slug: "culinary", name: "Culinary Guild", members: 890, projects: 45, ships: 280, status: "building" as const, icon: "IconFlame", description: "Recipe development, food science, and restaurant tech.", topBuilder: "ChefMika", topScore: 4200, growth: "+22%" },
    { slug: "music", name: "Music Guild", members: 670, projects: 34, ships: 190, status: "building" as const, icon: "IconMusic", description: "Audio production, sound design, and generative music.", topBuilder: "SoundSmith", topScore: 3800, growth: "+18%" },
    { slug: "maker", name: "Maker Guild", members: 1200, projects: 78, ships: 400, status: "live" as const, icon: "IconWrench", description: "Physical fabrication, CNC, 3D printing, electronics.", topBuilder: "MakerJoe", topScore: 7800, growth: "+10%" },
    { slug: "writing", name: "Writing Guild", members: 1500, projects: 120, ships: 720, status: "live" as const, icon: "IconPencil", description: "Technical writing, content creation, and publishing.", topBuilder: "WriterAsh", topScore: 7200, growth: "+9%" },
    { slug: "woodworking", name: "Woodworking Guild", members: 430, projects: 22, ships: 110, status: "shipped" as const, icon: "IconWood", description: "Traditional joinery, CNC woodworking, furniture design.", topBuilder: "WoodMaster", topScore: 5400, growth: "+5%" },
];

const SORT_OPTIONS = ["MEMBERS ↓", "GROWTH ↓", "PROJECTS ↓", "NEWEST"];

export default function GuildDirectoryPage() {
    const [sortBy, setSortBy] = useState("MEMBERS ↓");
    const [searchQ, setSearchQ] = useState("");

    const filtered = GUILDS.filter(g => !searchQ || g.name.toLowerCase().includes(searchQ.toLowerCase()));

    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans">
            <main className="max-w-6xl mx-auto px-6 py-32">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="font-clash font-bold text-6xl mb-3"><GlitchText text="GUILD DIRECTORY" /></h1>
                    <p className="font-mono text-white/50 max-w-xl mb-8">Join your tribe. Rise through the ranks by shipping together. Every guild has its own culture, tools, and leaderboard.</p>

                    {/* Summary Stats */}
                    <div className="grid grid-cols-4 gap-4 mb-8">
                        {[
                            { label: "TOTAL GUILDS", value: GUILDS.length.toString(), color: "text-lime" },
                            { label: "TOTAL MEMBERS", value: GUILDS.reduce((s, g) => s + g.members, 0).toLocaleString(), color: "text-cyber" },
                            { label: "ACTIVE PROJECTS", value: GUILDS.reduce((s, g) => s + g.projects, 0).toLocaleString(), color: "text-acid" },
                            { label: "TOTAL SHIPS", value: GUILDS.reduce((s, g) => s + g.ships, 0).toLocaleString(), color: "text-yellow-400" },
                        ].map(s => (
                            <BentoCard key={s.label} className="p-4 text-center"><p className={`font-clash font-bold text-2xl ${s.color}`}>{s.value}</p><p className="font-mono text-[10px] text-white/30 mt-1">{s.label}</p></BentoCard>
                        ))}
                    </div>

                    {/* Search + Sort */}
                    <div className="flex gap-4 mb-10">
                        <input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Search guilds..." className="flex-1 bg-black/60 border border-white/10 rounded-bento-sm p-3 font-mono text-white focus:border-lime outline-none" />
                        <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="bg-black/60 border border-white/10 rounded-bento-sm px-4 py-3 font-mono text-xs text-white/60 outline-none focus:border-lime">
                            {SORT_OPTIONS.map(s => <option key={s}>{s}</option>)}
                        </select>
                    </div>
                </motion.div>

                {/* Guild Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filtered.map((g, i) => (
                        <motion.div key={g.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05, type: "spring", stiffness: 200 }}>
                            <Link href={`/guilds/${g.slug}`}>
                                <BentoCard className="p-6 h-full hover:border-lime/40 cursor-pointer group transition-all">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <span className="text-3xl">{g.icon}</span>
                                            <div>
                                                <h3 className="font-clash font-bold text-xl group-hover:text-lime transition-colors">{g.name}</h3>
                                                <PulseTag status={g.status} className="mt-1" />
                                            </div>
                                        </div>
                                        <span className="font-mono text-xs text-lime">{g.growth}</span>
                                    </div>
                                    <p className="font-mono text-xs text-white/40 mb-4">{g.description}</p>

                                    {/* Stats */}
                                    <div className="grid grid-cols-3 gap-3 mb-4">
                                        <div className="p-2 bg-white/5 rounded text-center"><p className="font-clash font-bold text-lg">{g.members.toLocaleString()}</p><p className="font-mono text-[9px] text-white/30">MEMBERS</p></div>
                                        <div className="p-2 bg-white/5 rounded text-center"><p className="font-clash font-bold text-lg">{g.projects}</p><p className="font-mono text-[9px] text-white/30">PROJECTS</p></div>
                                        <div className="p-2 bg-white/5 rounded text-center"><p className="font-clash font-bold text-lg">{g.ships}</p><p className="font-mono text-[9px] text-white/30">SHIPS</p></div>
                                    </div>

                                    {/* Top Builder */}
                                    <div className="flex items-center gap-2 p-2 bg-white/[0.03] rounded-bento-sm">
                                        <div className="w-7 h-7 bg-lime/10 rounded-full flex items-center justify-center font-clash font-bold text-xs text-lime">{g.topBuilder[0]}</div>
                                        <span className="font-mono text-xs text-white/50">Top: <span className="text-white">{g.topBuilder}</span></span>
                                        <span className="font-clash font-bold text-xs text-lime ml-auto">{g.topScore.toLocaleString()}</span>
                                    </div>
                                </BentoCard>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-16">
                    <BentoCard className="p-8 bg-gradient-to-br from-lime/5 to-transparent border-lime/20 inline-block">
                        <h3 className="font-clash font-bold text-2xl mb-2">Can&apos;t find your guild?</h3>
                        <p className="font-mono text-sm text-white/40 mb-4">Start your own. 50 members needed to become official.</p>
                        <ForgeButton variant="primary">PROPOSE NEW GUILD</ForgeButton>
                    </BentoCard>
                </motion.div>
            </main>
        </div>
    );
}
