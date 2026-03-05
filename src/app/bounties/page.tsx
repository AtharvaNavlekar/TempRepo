"use client";

import { motion } from "framer-motion";
import { BentoCard, ForgeButton, PulseTag, GlitchText } from "@/components/forge";
import Link from "next/link";
import { useState } from "react";
import { IconSearch } from "@/components/icons";

const BOUNTIES = [
    { id: "bounty-001", title: "Build a Real-Time Notification System", company: "NeonLabs", companyLogo: "N", reward: "$2,500", difficulty: "HARD", tags: ["React", "WebSocket", "Redis"], status: "live" as const, applicants: 12, daysLeft: 10, description: "Design and implement a scalable notification system using WebSocket with SSE fallback." },
    { id: "bounty-002", title: "Design a Mobile Onboarding Flow", company: "CreativeOS", companyLogo: "C", reward: "$1,800", difficulty: "MEDIUM", tags: ["Figma", "UX", "Motion"], status: "live" as const, applicants: 8, daysLeft: 6, description: "Create an engaging 5-screen mobile onboarding with micro-animations and gamification." },
    { id: "bounty-003", title: "Audit Smart Contract for DEX", company: "ChainVault", companyLogo: "V", reward: "$5,000", difficulty: "EXPERT", tags: ["Solidity", "Security", "EVM"], status: "staked" as const, applicants: 4, daysLeft: 18, description: "Comprehensive security audit on decentralized exchange smart contracts." },
    { id: "bounty-004", title: "Create a Recipe API Integration", company: "FoodForge", companyLogo: "F", reward: "$1,200", difficulty: "EASY", tags: ["Node.js", "REST", "MongoDB"], status: "building" as const, applicants: 16, daysLeft: 3, description: "Integrate Spoonacular API with cost optimization and nutritional analysis." },
    { id: "bounty-005", title: "Build IoT Sensor Dashboard", company: "MakerHQ", companyLogo: "M", reward: "$3,000", difficulty: "HARD", tags: ["Python", "MQTT", "D3.js"], status: "live" as const, applicants: 6, daysLeft: 14, description: "Real-time sensor data visualization with anomaly detection and alerting." },
    { id: "bounty-006", title: "Compose Ambient Soundtrack", company: "VibeStudios", companyLogo: "S", reward: "$800", difficulty: "MEDIUM", tags: ["Ableton", "Sound Design"], status: "shipped" as const, applicants: 22, daysLeft: 0, description: "30-minute ambient soundtrack for a meditation app with binaural beats." },
    { id: "bounty-007", title: "Design Landing Page for SaaS", company: "NeonLabs", companyLogo: "N", reward: "$2,000", difficulty: "MEDIUM", tags: ["Figma", "WebFlow", "Copy"], status: "live" as const, applicants: 14, daysLeft: 8, description: "High-conversion landing page with A/B test variants and analytics integration." },
    { id: "bounty-008", title: "Build CLI Tool for Data Migration", company: "DataForge", companyLogo: "D", reward: "$3,500", difficulty: "HARD", tags: ["Rust", "CLI", "PostgreSQL"], status: "live" as const, applicants: 5, daysLeft: 21, description: "Type-safe CLI tool for migrating data between PostgreSQL and MongoDB." },
];

const DIFF_COLORS: Record<string, string> = { EASY: "text-lime", MEDIUM: "text-yellow-400", HARD: "text-acid", EXPERT: "text-red-400" };
const FILTERS = ["ALL", "LIVE", "BUILDING", "SHIPPED", "STAKED"];
const DIFF_FILTERS = ["ALL", "EASY", "MEDIUM", "HARD", "EXPERT"];

export default function BountiesPage() {
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [diffFilter, setDiffFilter] = useState("ALL");

    const filtered = BOUNTIES.filter(b => {
        const matchStatus = statusFilter === "ALL" || b.status === statusFilter.toLowerCase();
        const matchDiff = diffFilter === "ALL" || b.difficulty === diffFilter;
        return matchStatus && matchDiff;
    });

    const totalValue = BOUNTIES.filter(b => b.status === "live").reduce((sum, b) => sum + parseInt(b.reward.replace(/[^0-9]/g, "")), 0);

    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans">
            <main className="max-w-6xl mx-auto px-6 py-32">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h1 className="font-clash font-bold text-6xl mb-3"><GlitchText text="CHALLENGE MARKETPLACE" /></h1>
                            <p className="font-mono text-white/50 max-w-lg">Paid bounties from verified companies. Ship it, get paid. No interviews, no résumés — just proof of work.</p>
                        </div>
                        <Link href="/jobs"><ForgeButton variant="secondary">REVERSE JOB BOARD →</ForgeButton></Link>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-4 gap-4 mb-8">
                        {[
                            { label: "OPEN BOUNTIES", value: BOUNTIES.filter(b => b.status === "live").length.toString(), color: "text-lime" },
                            { label: "TOTAL VALUE", value: `$${totalValue.toLocaleString()}`, color: "text-cyber" },
                            { label: "AVG REWARD", value: "$2,350", color: "text-acid" },
                            { label: "COMPLETED", value: "2,847", color: "text-yellow-400" },
                        ].map(s => (
                            <BentoCard key={s.label} className="p-4 text-center"><p className={`font-clash font-bold text-2xl ${s.color}`}>{s.value}</p><p className="font-mono text-[10px] text-white/30 mt-1">{s.label}</p></BentoCard>
                        ))}
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-4 mb-10">
                        <div className="flex gap-2">
                            <span className="font-mono text-xs text-white/30 self-center mr-1">STATUS:</span>
                            {FILTERS.map(f => (
                                <button key={f} onClick={() => setStatusFilter(f)} className={`px-3 py-1.5 font-mono text-xs uppercase rounded-bento-sm border transition-all ${statusFilter === f ? "bg-lime/10 border-lime/40 text-lime" : "border-white/10 text-white/40 hover:text-white"}`}>{f}</button>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <span className="font-mono text-xs text-white/30 self-center mr-1">LEVEL:</span>
                            {DIFF_FILTERS.map(d => (
                                <button key={d} onClick={() => setDiffFilter(d)} className={`px-3 py-1.5 font-mono text-xs uppercase rounded-bento-sm border transition-all ${diffFilter === d ? "bg-lime/10 border-lime/40 text-lime" : "border-white/10 text-white/40 hover:text-white"}`}>{d}</button>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Bounty Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filtered.map((b, i) => (
                        <motion.div key={b.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                            <Link href={`/bounties/${b.id}`}>
                                <BentoCard className="p-6 h-full hover:border-lime/40 cursor-pointer group transition-all">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-cyber/10 border border-cyber/20 rounded-lg flex items-center justify-center font-clash font-bold text-cyber">{b.companyLogo}</div>
                                            <div>
                                                <PulseTag status={b.status} />
                                                <p className="font-mono text-[10px] text-white/30 mt-1">{b.company}</p>
                                            </div>
                                        </div>
                                        <span className={`font-mono text-xs font-bold ${DIFF_COLORS[b.difficulty]}`}>{b.difficulty}</span>
                                    </div>
                                    <h3 className="font-clash font-bold text-lg mb-2 group-hover:text-lime transition-colors">{b.title}</h3>
                                    <p className="font-mono text-xs text-white/40 mb-4 line-clamp-2">{b.description}</p>

                                    <div className="flex flex-wrap gap-1.5 mb-4">
                                        {b.tags.map(t => <span key={t} className="px-2 py-0.5 bg-white/5 border border-white/8 rounded font-mono text-[10px] text-white/40">{t}</span>)}
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                        <div className="flex gap-4 font-mono text-xs text-white/30">
                                            <span>{b.applicants} applicants</span>
                                            <span>{b.daysLeft > 0 ? `${b.daysLeft}d left` : "CLOSED"}</span>
                                        </div>
                                        <span className="font-clash font-bold text-2xl text-lime">{b.reward}</span>
                                    </div>
                                </BentoCard>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-4xl mb-4"><IconSearch className="w-5 h-5" /></p>
                        <p className="font-clash font-bold text-xl mb-2">No bounties match your filters</p>
                        <p className="font-mono text-sm text-white/40">Try adjusting your status or difficulty filter.</p>
                    </div>
                )}
            </main>
        </div>
    );
}
