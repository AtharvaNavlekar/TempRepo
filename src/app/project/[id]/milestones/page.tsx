"use client";
import { BentoCard } from "@/components/forge";
import { motion } from "framer-motion";

const MILESTONES = [
    { name: "Project Setup & Architecture", progress: 100, status: "COMPLETE" },
    { name: "Core Auth Module", progress: 100, status: "COMPLETE" },
    { name: "Identity Verification Engine", progress: 67, status: "IN PROGRESS" },
    { name: "Peer Review System", progress: 20, status: "IN PROGRESS" },
    { name: "Final QA & Ship", progress: 0, status: "PENDING" },
];

export default function MilestonesPage() {
    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans">
            <main className="max-w-5xl mx-auto px-6 py-32">
                <h1 className="font-clash font-bold text-4xl mb-2">Milestone Tracker</h1>
                <p className="font-mono text-white/50 text-sm mb-12">Visual progress bar for the entire sprint.</p>
                <div className="space-y-6">
                    {MILESTONES.map((m, i) => (
                        <motion.div key={m.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                            <BentoCard className="p-6">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="font-clash font-semibold text-lg">{m.name}</h3>
                                    <span className={`font-mono text-xs tracking-widest ${m.status === "COMPLETE" ? "text-lime" : m.status === "IN PROGRESS" ? "text-cyber" : "text-white/30"}`}>{m.status}</span>
                                </div>
                                <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div className={`h-full rounded-full ${m.progress === 100 ? "bg-lime" : "bg-cyber"}`} initial={{ width: 0 }} animate={{ width: `${m.progress}%` }} transition={{ duration: 0.8, delay: i * 0.1 }} />
                                </div>
                                <p className="font-mono text-xs text-white/30 mt-2 text-right">{m.progress}%</p>
                            </BentoCard>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
}
