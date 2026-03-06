"use client";
import { BentoCard, ForgeButton, PulseTag } from "@/components/forge";
import { motion } from "framer-motion";

const FLAGGED_USERS = [
    { name: "ShadowDev42", reason: "Suspected project plagiarism", reports: 3, status: "staked" as const },
    { name: "GhostBuilder", reason: "Abandoned 5 War Rooms in 30 days", reports: 1, status: "staked" as const },
    { name: "FakeDesigner", reason: "Using AI-generated portfolio passed as original work", reports: 7, status: "building" as const },
];

export default function ModerationPage() {
    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans">
            <main className="max-w-5xl mx-auto px-6 py-32">
                <h1 className="font-clash font-bold text-4xl mb-2 text-acid">User Moderation</h1>
                <p className="font-mono text-white/50 mb-12">Flagged accounts pending admin review.</p>
                <div className="space-y-4">
                    {FLAGGED_USERS.map((u, i) => (
                        <motion.div key={u.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                            <BentoCard accent="saffron" className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div><h3 className="font-clash font-bold text-lg text-acid">{u.name}</h3><p className="font-mono text-xs text-white/40">{u.reason}</p><p className="font-mono text-xs text-white/30 mt-1">{u.reports} report(s)</p></div>
                                <div className="flex items-center gap-3"><ForgeButton variant="ghost" size="sm">DISMISS</ForgeButton><ForgeButton variant="danger" size="sm">BAN</ForgeButton></div>
                            </BentoCard>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
}
