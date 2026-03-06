"use client";

import { motion } from "framer-motion";
import { BentoCard, ForgeButton, GlitchText, PulseTag, ShipScoreCounter } from "@/components/forge";
import Link from "next/link";
import { useState } from "react";
import { IconCpu, IconScale, IconRocket, IconSignal, IconArchive, IconArrowRight } from "@/components/icons";
const WAR_ROOM_NAV = [
    { label: "Overview", href: "", icon: "IconPalette" },
    { label: "Milestones", href: "milestones", icon: "IconChart" },
    { label: "Assets", href: "assets", icon: "IconArchive" },
    { label: "Contracts", href: "contracts", icon: "IconClipboard" },
    { label: "Chat", href: "chat", icon: "IconChat" },
    { label: "Live", href: "live", icon: "IconSignal" },
    { label: "Disputes", href: "disputes", icon: "IconScale" },
    { label: "Ship", href: "ship", icon: "IconRocket" },
];

const TEAM = [
    { name: "0xNeo", role: "Lead Architect", score: 12400, avatar: "N", online: true },
    { name: "0xAlice", role: "Frontend", score: 7200, avatar: "A", online: true },
    { name: "DevMarcus", role: "Backend", score: 6100, avatar: "M", online: false },
    { name: "DesignYuki", role: "UI/UX", score: 6100, avatar: "Y", online: true },
];

const ACTIVITY = [
    { action: "pushed 14 commits", user: "0xNeo", time: "2m ago" },
    { action: "completed Milestone 2", user: "0xAlice", time: "1h ago" },
    { action: "uploaded design-v3.fig", user: "DesignYuki", time: "3h ago" },
    { action: "reviewed PR #42", user: "DevMarcus", time: "5h ago" },
    { action: "filed dispute on code quality", user: "0xAlice", time: "1d ago" },
];

const MILESTONES_PREVIEW = [
    { name: "Project Setup & Auth", progress: 100 },
    { name: "Core Business Logic", progress: 100 },
    { name: "Identity Verification", progress: 67 },
    { name: "Peer Review System", progress: 20 },
    { name: "QA & Ship", progress: 0 },
];

export default function WarRoomPage() {
    const [activeTab, setActiveTab] = useState("");

    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans">
            <main className="max-w-7xl mx-auto px-6 py-32">
                {/* Hero */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-4 mb-3">
                                <PulseTag status="building" />
                                <span className="font-mono text-xs text-white/30 uppercase tracking-widest"><IconCpu className="w-4 h-4 inline" /> React Guild</span>
                            </div>
                            <h1 className="font-clash font-bold text-5xl mb-2"><GlitchText text="DECENTRALIZED IDENTITY LAYER" /></h1>
                            <p className="font-mono text-white/50 max-w-2xl mt-2">Self-sovereign identity protocol replacing centralized credentialing. Built on zero-knowledge proofs with cross-chain verification.</p>
                        </div>
                        <div className="flex-shrink-0 text-right">
                            <ShipScoreCounter value={2400} size="md" />
                            <p className="font-mono text-xs text-white/30 mt-2">12 days remaining</p>
                        </div>
                    </div>
                </motion.div>

                {/* Sub-Navigation */}
                <div className="flex gap-1 mb-8 overflow-x-auto border-b border-white/10 pb-1">
                    {WAR_ROOM_NAV.map(nav => (
                        <Link key={nav.label} href={nav.href ? `/project/proj-001/${nav.href}` : "/project/proj-001"}>
                            <motion.button whileTap={{ scale: 0.95 }}
                                onClick={() => setActiveTab(nav.href)}
                                className={`px-5 py-3 font-mono text-xs uppercase tracking-widest whitespace-nowrap transition-all rounded-t-lg ${activeTab === nav.href ? "bg-white/5 text-lime border-b-2 border-lime" : "text-white/40 hover:text-white"}`}>
                                <span className="mr-1.5">{nav.icon}</span>{nav.label}
                            </motion.button>
                        </Link>
                    ))}
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column — 2/3 width */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Overall Progress */}
                        <BentoCard className="p-8">
                            <h3 className="font-clash font-semibold text-xl mb-6">Sprint Progress</h3>
                            <div className="space-y-4">
                                {MILESTONES_PREVIEW.map((m, i) => (
                                    <div key={m.name}>
                                        <div className="flex justify-between items-center mb-1.5">
                                            <span className="font-mono text-sm text-white/70">{m.name}</span>
                                            <span className={`font-mono text-xs font-bold ${m.progress === 100 ? "text-lime" : m.progress > 0 ? "text-cyber" : "text-white/20"}`}>{m.progress}%</span>
                                        </div>
                                        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div className={`h-full rounded-full ${m.progress === 100 ? "bg-lime" : "bg-cyber"}`} initial={{ width: 0 }} animate={{ width: `${m.progress}%` }} transition={{ duration: 0.8, delay: i * 0.1 }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/10">
                                <span className="font-mono text-xs text-white/30">Overall</span>
                                <span className="font-clash font-bold text-2xl text-lime">57%</span>
                            </div>
                        </BentoCard>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-4 gap-4">
                            {[
                                { label: "COMMITS", value: "247", color: "text-lime" },
                                { label: "HOURS LOGGED", value: "186h", color: "text-cyber" },
                                { label: "FILES CHANGED", value: "89", color: "text-acid" },
                                { label: "REVIEW CYCLES", value: "12", color: "text-yellow-400" },
                            ].map(stat => (
                                <BentoCard key={stat.label} className="p-4 text-center">
                                    <p className={`font-clash font-bold text-2xl ${stat.color}`}>{stat.value}</p>
                                    <p className="font-mono text-[10px] text-white/30 mt-1">{stat.label}</p>
                                </BentoCard>
                            ))}
                        </div>

                        {/* Activity Feed */}
                        <BentoCard className="p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-clash font-semibold text-xl">Recent Activity</h3>
                                <Link href="/project/proj-001/chat"><span className="font-mono text-xs text-lime hover:underline cursor-pointer">VIEW ALL →</span></Link>
                            </div>
                            <div className="space-y-3">
                                {ACTIVITY.map((a, i) => (
                                    <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                                        className="flex items-center gap-3 p-3 bg-white/[0.03] rounded-bento-sm hover:bg-white/[0.06] transition-colors">
                                        <div className="w-8 h-8 rounded-full bg-lime/10 flex items-center justify-center font-clash font-bold text-xs text-lime">{a.user[0]}</div>
                                        <div className="flex-1">
                                            <span className="font-clash font-bold text-sm text-white">{a.user}</span>
                                            <span className="font-mono text-sm text-white/40"> {a.action}</span>
                                        </div>
                                        <span className="font-mono text-[10px] text-white/30">{a.time}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </BentoCard>
                    </div>

                    {/* Right Sidebar */}
                    <div className="space-y-6">
                        {/* Team */}
                        <BentoCard className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-clash font-semibold text-lg">Team</h3>
                                <Link href="/project/recruit"><span className="font-mono text-xs text-lime hover:underline cursor-pointer">+ RECRUIT</span></Link>
                            </div>
                            <div className="space-y-3">
                                {TEAM.map(member => (
                                    <div key={member.name} className="flex items-center gap-3 p-2 rounded-bento-sm hover:bg-white/5 transition-colors cursor-pointer">
                                        <div className="relative">
                                            <div className="w-10 h-10 bg-lime/10 border border-lime/20 rounded-full flex items-center justify-center font-clash font-bold text-lime">{member.avatar}</div>
                                            {member.online && <div className="w-2.5 h-2.5 bg-lime rounded-full absolute -bottom-0.5 -right-0.5 border-2 border-obsidian" />}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-clash font-bold text-sm">{member.name}</p>
                                            <p className="font-mono text-[10px] text-white/30">{member.role} · {member.score.toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </BentoCard>

                        {/* Quick Actions */}
                        <BentoCard className="p-6">
                            <h3 className="font-clash font-semibold text-lg mb-4">Quick Actions</h3>
                            <div className="space-y-2">
                                <Link href="/project/proj-001/live" className="block"><ForgeButton variant="secondary" className="w-full text-left"><IconSignal className="w-4 h-4 inline" /> Start Live Build</ForgeButton></Link>
                                <Link href="/project/proj-001/ship" className="block"><ForgeButton variant="primary" className="w-full text-left"><IconRocket className="w-4 h-4 inline" /> Submit Ship</ForgeButton></Link>
                                <Link href="/project/proj-001/assets" className="block"><ForgeButton variant="ghost" className="w-full text-left"><IconArchive className="w-4 h-4 inline" /> Upload Asset</ForgeButton></Link>
                            </div>
                        </BentoCard>

                        {/* Tags */}
                        <BentoCard className="p-6">
                            <h3 className="font-clash font-semibold text-lg mb-4">Tech Stack</h3>
                            <div className="flex flex-wrap gap-2">
                                {["Rust", "WASM", "ZK-Proofs", "React", "TypeScript", "PostgreSQL", "Redis", "Docker"].map(tag => (
                                    <span key={tag} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-bento-sm font-mono text-xs text-white/50 hover:text-lime hover:border-lime/20 transition-colors cursor-pointer">{tag}</span>
                                ))}
                            </div>
                        </BentoCard>

                        {/* Danger Zone */}
                        <BentoCard accent="saffron" className="p-6">
                            <h3 className="font-clash font-semibold text-lg mb-2 text-acid">Danger Zone</h3>
                            <p className="font-mono text-xs text-white/30 mb-4">Actions that affect all team members and staked points.</p>
                            <div className="space-y-2">
                                <Link href="/project/proj-001/disputes"><ForgeButton variant="danger" size="sm" className="w-full"><IconScale className="w-4 h-4 inline" /> File Dispute</ForgeButton></Link>
                                <ForgeButton variant="ghost" size="sm" className="w-full"><IconArrowRight className="w-4 h-4 inline" /> Leave Project</ForgeButton>
                            </div>
                        </BentoCard>
                    </div>
                </div>
            </main>
        </div>
    );
}
