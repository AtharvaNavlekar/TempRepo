"use client";
import { BentoCard, ForgeButton, PulseTag } from "@/components/forge";
import { motion } from "framer-motion";

const MENTORS = [
    { name: "GuildMaster_Kai", expertise: "React Architecture", score: 12000, mentees: 8, status: "live" as const },
    { name: "SeniorDev_Luna", expertise: "Rust & Systems", score: 9500, mentees: 5, status: "shipped" as const },
    { name: "DesignSensei", expertise: "Product Design", score: 11000, mentees: 12, status: "live" as const },
];

export default function MentorshipPage() {
    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans">
            <main className="max-w-5xl mx-auto px-6 py-32">
                <h1 className="font-clash font-bold text-5xl mb-2">Mentorship Hub</h1>
                <p className="font-mono text-white/50 mb-12">Connect with high-score Guild Masters. Learn from builders who have shipped.</p>
                <div className="space-y-6">
                    {MENTORS.map((m, i) => (
                        <motion.div key={m.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                            <BentoCard className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-lime/40">
                                <div className="flex items-center gap-6">
                                    <div className="w-14 h-14 bg-lime/10 border border-lime/30 rounded-full flex items-center justify-center font-clash font-bold text-xl text-lime">{m.name[0]}</div>
                                    <div><h3 className="font-clash font-bold text-xl">{m.name}</h3><p className="font-mono text-xs text-white/40">{m.expertise} · {m.mentees} active mentees</p><PulseTag status={m.status} className="mt-2" /></div>
                                </div>
                                <div className="flex items-center gap-6"><div className="text-right"><p className="font-clash font-bold text-2xl text-lime">{m.score.toLocaleString()}</p><p className="font-mono text-[10px] text-white/30">SHIP SCORE</p></div><ForgeButton variant="primary" size="sm">REQUEST MENTORSHIP</ForgeButton></div>
                            </BentoCard>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
}
