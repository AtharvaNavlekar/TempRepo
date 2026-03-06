"use client";
import { BentoCard, ForgeButton, PulseTag } from "@/components/forge";
import { motion } from "framer-motion";

const DISPUTES = [
    { id: "disp-01", project: "CNC Controller v2", filed: "0xAlice", against: "RustNinja", reason: "Code quality below agreed standard. 40% test coverage instead of 90%.", votes: { guilty: 8, innocent: 3 }, status: "staked" as const },
    { id: "disp-02", project: "Recipe Marketplace", filed: "FoodForge", against: "ChefMika", reason: "Missed 3 consecutive sprint deadlines without communication.", votes: { guilty: 5, innocent: 5 }, status: "building" as const },
];

export default function AdminDisputesPage() {
    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans">
            <main className="max-w-5xl mx-auto px-6 py-32">
                <h1 className="font-clash font-bold text-4xl mb-2 text-acid">Dispute Resolution</h1>
                <p className="font-mono text-white/50 mb-12">Court of Builders. Final admin oversight on escalated disputes.</p>
                <div className="space-y-6">
                    {DISPUTES.map((d, i) => (
                        <motion.div key={d.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                            <BentoCard accent="saffron" className="p-8">
                                <div className="flex justify-between items-start mb-4">
                                    <div><h3 className="font-clash font-bold text-xl">{d.project}</h3><p className="font-mono text-xs text-white/40 mt-1">{d.filed} vs {d.against}</p></div>
                                    <PulseTag status={d.status} />
                                </div>
                                <p className="font-mono text-sm text-white/60 mb-4">{d.reason}</p>
                                <div className="flex items-center gap-6 mb-4">
                                    <div className="flex items-center gap-2"><span className="font-mono text-xs text-acid">GUILTY</span><span className="font-clash font-bold text-acid">{d.votes.guilty}</span></div>
                                    <div className="flex items-center gap-2"><span className="font-mono text-xs text-lime">INNOCENT</span><span className="font-clash font-bold text-lime">{d.votes.innocent}</span></div>
                                </div>
                                <div className="flex gap-3"><ForgeButton variant="ghost" size="sm">DISMISS</ForgeButton><ForgeButton variant="danger" size="sm">ENFORCE PENALTY</ForgeButton><ForgeButton variant="primary" size="sm">ACQUIT</ForgeButton></div>
                            </BentoCard>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
}
