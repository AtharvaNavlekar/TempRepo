"use client";

import { motion } from "framer-motion";
import { BentoCard, GlitchText, ForgeButton } from "@/components/forge";
import Navbar from "@/components/layout/Navbar";
import Link from "next/link";

const FAILURES = [
    {
        id: "fail-001",
        title: "Database Lock Contention (Production Drop)",
        date: "2025-08-14",
        lessons: ["Implement connection pooling", "Write better migrations", "Test under load"],
        recovered: true,
        pointsGained: 450
    },
    {
        id: "fail-002",
        title: "Lost 4 Weeks Building the Wrong Feature",
        date: "2025-03-21",
        lessons: ["Talk to users first", "Set tighter feedback loops"],
        recovered: true,
        pointsGained: 210
    },
    {
        id: "fail-003",
        title: "Burnout - Dropped Client Project",
        date: "2024-11-09",
        lessons: ["Enforce strict async boundaries", "Don't overcommit sweat equity"],
        recovered: false,
        pointsGained: 0
    }
];

export default function FailureVaultPage() {
    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans selection:bg-acid/30">
            <Navbar />

            <main className="max-w-6xl mx-auto px-6 py-32">

                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <div className="flex items-center gap-4 mb-4">
                            <h1 className="font-clash font-bold text-5xl md:text-6xl text-acid">
                                <GlitchText text="THE FAILURE VAULT" />
                            </h1>
                        </div>
                        <p className="font-mono text-base text-white/50 max-w-2xl">
                            Corporate culture hides failure. We index it. Documenting your fuck-ups is the fastest way to prove you actually ship.
                        </p>
                    </div>

                    <Link href="/ship-log/failures/new">
                        <ForgeButton variant="danger" icon={<span className="text-xl">!</span>}>
                            LOG A POST-MORTEM
                        </ForgeButton>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {FAILURES.map((failure, index) => (
                        <motion.div
                            key={failure.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                        >
                            <BentoCard
                                accent={failure.recovered ? "acid" : "default"}
                                className={`h-full flex flex-col justify-between ${!failure.recovered ? "opacity-50 grayscale" : "bg-acid/[0.03]"}`}
                            >
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="font-mono text-xs text-acid/60">{failure.date}</span>
                                        {failure.recovered && (
                                            <span className="font-mono text-[10px] bg-acid/10 text-acid px-2 py-0.5 rounded border border-acid/20">
                                                +{failure.pointsGained} PTS
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="font-clash font-bold text-xl text-white mb-4 line-clamp-2">
                                        {failure.title}
                                    </h3>

                                    <div className="space-y-2 mb-6">
                                        <p className="font-mono text-xs text-white/30 uppercase tracking-widest mb-2">Lessons Extracted:</p>
                                        {failure.lessons.map((lesson, i) => (
                                            <div key={i} className="flex gap-2 font-mono text-sm text-white/70">
                                                <span className="text-acid">›</span> {lesson}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <ForgeButton variant="ghost" size="sm" className="w-full text-acid hover:text-white border-acid/20">
                                    READ LOG
                                </ForgeButton>
                            </BentoCard>
                        </motion.div>
                    ))}

                    <BentoCard className="flex flex-col items-center justify-center text-center p-8 border-dashed border-white/20 bg-transparent hover:border-acid/50 hover:bg-acid/5 transition-all">
                        <div className="w-12 h-12 rounded-full border border-acid/30 flex items-center justify-center text-acid mb-4">
                            +
                        </div>
                        <h3 className="font-clash font-semibold text-white/50">Survive Another Crash</h3>
                        <p className="font-mono text-sm text-white/30 mt-2">Log your next failure to earn resilience multiplier points.</p>
                    </BentoCard>
                </div>
            </main>
        </div>
    );
}
