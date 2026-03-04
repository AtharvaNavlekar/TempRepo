"use client";
import { BentoCard, ForgeButton, PulseTag } from "@/components/forge";
import { motion } from "framer-motion";

const APPLICANTS = [
    { name: "0xNeo", score: 12400, match: 94, bounty: "Real-Time Notifications", status: "staked" as const },
    { name: "DevMarcus", score: 6800, match: 78, bounty: "Recipe API Integration", status: "building" as const },
    { name: "DesignYuki", score: 6100, match: 91, bounty: "Mobile Onboarding Flow", status: "shipped" as const },
];

export default function RecruitmentConsolePage() {
    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans">
            <main className="max-w-5xl mx-auto px-6 py-32">
                <h1 className="font-clash font-bold text-4xl mb-2">Recruitment Console</h1>
                <p className="font-mono text-white/50 mb-12">Review applicants based on Ship Score and bounty performance.</p>
                <div className="space-y-4">
                    {APPLICANTS.map((a, i) => (
                        <motion.div key={a.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                            <BentoCard className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-cyber/10 border border-cyber/30 rounded-full flex items-center justify-center font-clash font-bold text-cyber">{a.name[0]}</div>
                                    <div><h3 className="font-clash font-bold text-lg">{a.name}</h3><p className="font-mono text-xs text-white/40">Applied for: {a.bounty}</p></div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="text-center"><p className="font-clash font-bold text-lg text-lime">{a.score.toLocaleString()}</p><p className="font-mono text-[10px] text-white/30">SCORE</p></div>
                                    <div className="text-center"><p className="font-clash font-bold text-lg text-cyber">{a.match}%</p><p className="font-mono text-[10px] text-white/30">MATCH</p></div>
                                    <PulseTag status={a.status} />
                                    <ForgeButton variant="primary" size="sm">HIRE</ForgeButton>
                                </div>
                            </BentoCard>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
}
