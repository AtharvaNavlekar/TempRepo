"use client";

import { motion } from "framer-motion";
import { BentoCard, ForgeButton, GlitchText, PulseTag } from "@/components/forge";
import { useState } from "react";
import { IconSuccess } from "@/components/icons";

const ROLES_NEEDED = [
    { title: "Systems Engineer", skills: ["Rust", "WASM", "Performance"], commitment: "20h/week", importance: "CRITICAL", filled: false },
    { title: "Security Auditor", skills: ["Solidity", "ZK-Proofs", "Cryptography"], commitment: "10h/week", importance: "HIGH", filled: false },
    { title: "Technical Writer", skills: ["Docs", "API Reference", "Tutorials"], commitment: "8h/week", importance: "MEDIUM", filled: true },
];

const CANDIDATES = [
    { name: "CryptoMage", score: 11800, skills: ["Rust", "Cryptography", "Systems"], compatibility: 96, status: "shipped" as const, ships: 21 },
    { name: "RustNinja", score: 8400, skills: ["Rust", "C++", "WASM"], compatibility: 91, status: "live" as const, ships: 12 },
    { name: "SecAuditor_K", score: 9200, skills: ["Solidity", "Security", "ZK"], compatibility: 88, status: "shipped" as const, ships: 15 },
    { name: "DocsMaster", score: 5600, skills: ["Technical Writing", "Docs", "Open Source"], compatibility: 82, status: "live" as const, ships: 8 },
    { name: "WasmWizard", score: 7100, skills: ["WASM", "Rust", "Performance"], compatibility: 79, status: "building" as const, ships: 9 },
];

const IMPORTANCE_COLORS: Record<string, string> = { CRITICAL: "text-acid", HIGH: "text-yellow-400", MEDIUM: "text-cyber", LOW: "text-white/40" };

export default function TeamRecruiterPage() {
    const [selectedRole, setSelectedRole] = useState(0);

    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans">
            <main className="max-w-6xl mx-auto px-6 py-32">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="font-clash font-bold text-5xl mb-2"><GlitchText text="TEAM RECRUITER" /></h1>
                    <p className="font-mono text-white/50 mb-12">AI-powered candidate matching based on Ship Score, skill overlap, and working style DNA.</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left: Roles Needed */}
                    <div className="space-y-4">
                        <h3 className="font-clash font-semibold text-lg mb-2">Open Roles</h3>
                        {ROLES_NEEDED.map((role, i) => (
                            <motion.div key={role.title} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                                <BentoCard onClick={() => setSelectedRole(i)}
                                    className={`p-5 cursor-pointer transition-all ${selectedRole === i ? "border-lime/40 bg-lime/5" : "hover:border-white/20"} ${role.filled ? "opacity-50" : ""}`}>
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-clash font-bold">{role.title}</h4>
                                        <span className={`font-mono text-[10px] font-bold ${IMPORTANCE_COLORS[role.importance]}`}>{role.importance}</span>
                                    </div>
                                    <p className="font-mono text-xs text-white/30 mb-2">{role.commitment}</p>
                                    <div className="flex flex-wrap gap-1">
                                        {role.skills.map(s => <span key={s} className="px-2 py-0.5 bg-white/5 rounded font-mono text-[10px] text-white/40">{s}</span>)}
                                    </div>
                                    {role.filled && <span className="font-mono text-xs text-lime mt-2 block"><IconSuccess className="w-4 h-4 inline" /> FILLED</span>}
                                </BentoCard>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right: Matched Candidates */}
                    <div className="lg:col-span-2">
                        <h3 className="font-clash font-semibold text-lg mb-4">Best Matches for: <span className="text-lime">{ROLES_NEEDED[selectedRole].title}</span></h3>
                        <div className="space-y-4">
                            {CANDIDATES.map((c, i) => (
                                <motion.div key={c.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                                    <BentoCard className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-lime/30 group">
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <div className="w-14 h-14 bg-lime/10 border border-lime/20 rounded-full flex items-center justify-center font-clash font-bold text-xl text-lime">{c.name[0]}</div>
                                                <div className="absolute -top-1 -right-1 w-7 h-7 bg-obsidian border border-lime/30 rounded-full flex items-center justify-center font-clash font-bold text-[10px] text-lime">{c.compatibility}</div>
                                            </div>
                                            <div>
                                                <h4 className="font-clash font-bold text-lg group-hover:text-lime transition-colors">{c.name}</h4>
                                                <p className="font-mono text-xs text-white/40">{c.ships} ships · Score: {c.score.toLocaleString()}</p>
                                                <div className="flex flex-wrap gap-1 mt-2">
                                                    {c.skills.map(s => <span key={s} className="px-2 py-0.5 bg-white/5 border border-white/8 rounded font-mono text-[9px] text-white/40">{s}</span>)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-center">
                                                <p className="font-clash font-bold text-3xl text-cyber">{c.compatibility}%</p>
                                                <p className="font-mono text-[10px] text-white/30">MATCH</p>
                                            </div>
                                            <PulseTag status={c.status} />
                                            <ForgeButton variant="primary" size="sm">INVITE</ForgeButton>
                                        </div>
                                    </BentoCard>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
