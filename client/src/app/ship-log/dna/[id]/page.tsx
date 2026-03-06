"use client";

import { motion } from "framer-motion";
import { BentoCard, ShipScoreCounter, ForgeButton } from "@/components/forge";
import { useRouter } from "next/navigation";

export default function DNADeepDivePage() {
    const router = useRouter();

    // In a real app, you would fetch the DNA data based on the ID.
    // For now, mock data based on the route.
    const mockData = {
        title: "CollabRise Protocol Core",
        type: "ARCHITECTURE",
        score: 1450,
        date: "2026-02-14",
        status: "VERIFIED",
        description: "Architected and deployed the core peer-to-peer reputation logic using Rust and WebAssembly, enabling trustless tracking of builder contributions without a centralized database.",
        metrics: [
            { label: "LINES OF CODE", value: "2.4K" },
            { label: "PEER RATING", value: "9.8/10" },
            { label: "TIME TO SHIP", value: "14 Days" },
            { label: "COMPLEXITY", value: "S-Tier" }
        ],
        stack: ["Rust", "WASM", "Next.js", "Zustand"],
        peers: ["@cyberpunk_dev", "@alice_design"]
    };

    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans">

            <main className="max-w-6xl mx-auto px-6 py-32">
                <button
                    onClick={() => router.back()}
                    className="font-mono text-xs tracking-widest text-white/40 hover:text-white uppercase flex items-center gap-2 mb-12 transition-colors"
                >
                    ← BACK TO TIMELINE
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Info Column */}
                    <div className="lg:col-span-8 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="pb-8 border-b border-white/10"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <span className="px-3 py-1 font-mono text-xs uppercase tracking-widest text-lime border border-lime/30 bg-lime/10 rounded">
                                    {mockData.type}
                                </span>
                                <span className="font-mono text-xs text-white/40">{mockData.date}</span>
                            </div>
                            <h1 className="font-clash font-bold text-5xl md:text-6xl mb-6 leading-tight">
                                {mockData.title}
                            </h1>
                            <p className="font-mono text-base text-white/60 leading-relaxed max-w-3xl">
                                {mockData.description}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <h3 className="font-mono text-sm uppercase tracking-widest text-white/40 mb-6">Tech Stack & Tools</h3>
                            <div className="flex flex-wrap gap-3">
                                {mockData.stack.map(tech => (
                                    <span key={tech} className="px-4 py-2 bg-white/5 border border-white/10 rounded-bento-sm font-mono text-sm">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mt-12 p-6 border border-white/10 bg-black/40 rounded-bento-sm"
                        >
                            <h3 className="font-clash text-xl mb-4 text-white/80">Proof of Work</h3>
                            <div className="h-48 bg-white/5 border border-white/10 rounded flex items-center justify-center font-mono text-white/20">
                                [Cryptographic Signature Log / Commit Hash Matrix Visuals would go here]
                            </div>
                        </motion.div>
                    </div>

                    {/* Meta Data Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        <BentoCard className="p-8 text-center bg-gradient-to-br from-lime/5 to-transparent border-lime/20">
                            <h3 className="font-mono text-xs uppercase tracking-widest text-lime/70 mb-4">Value Generated</h3>
                            <ShipScoreCounter value={mockData.score} size="md" />
                            <div className="mt-4 inline-block px-3 py-1 font-mono text-[10px] text-lime border border-lime/30 bg-lime/10 rounded tracking-widest">
                                {mockData.status}
                            </div>
                        </BentoCard>

                        <BentoCard className="p-6">
                            <h3 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-6">DNA Extraction Metrics</h3>
                            <div className="space-y-4">
                                {mockData.metrics.map(metric => (
                                    <div key={metric.label} className="flex justify-between items-center border-b border-white/5 pb-2">
                                        <span className="font-mono text-xs text-white/50">{metric.label}</span>
                                        <span className="font-clash font-semibold text-white">{metric.value}</span>
                                    </div>
                                ))}
                            </div>
                        </BentoCard>

                        <BentoCard className="p-6 bg-cyber/5 border-cyber/20">
                            <h3 className="font-mono text-xs uppercase tracking-widest text-cyber mb-4">Verified By Peers</h3>
                            <div className="flex flex-wrap gap-2">
                                {mockData.peers.map(peer => (
                                    <span key={peer} className="text-sm font-mono text-white/80 hover:text-cyber cursor-pointer transition-colors">
                                        {peer}
                                    </span>
                                ))}
                            </div>
                            <ForgeButton variant="ghost" className="w-full mt-6 text-xs text-cyber hover:text-white border-cyber/30">
                                VIEW ATTESTATIONS
                            </ForgeButton>
                        </BentoCard>
                    </div>
                </div>
            </main>
        </div>
    );
}
