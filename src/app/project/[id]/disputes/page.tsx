"use client";
import { BentoCard, ForgeButton, PulseTag } from "@/components/forge";
import { motion } from "framer-motion";

const DISPUTES = [
    { id: 1, filed: "DevMarcus", against: "0xNeo", reason: "Missed 3 consecutive stand-ups. Hours not logged for Sprint 2.", status: "staked" as const, date: "2026-02-28" },
    { id: 2, filed: "0xAlice", against: "DevMarcus", reason: "Committed code that broke the staging environment without notification.", status: "building" as const, date: "2026-03-01" },
];

export default function DisputeCenterPage() {
    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans">
            <main className="max-w-5xl mx-auto px-6 py-32">
                <h1 className="font-clash font-bold text-4xl mb-2 text-acid">Dispute Center</h1>
                <p className="font-mono text-white/50 text-sm mb-12">Project-level disagreements. Resolved by the Court of Builders.</p>
                <div className="space-y-4">
                    {DISPUTES.map((d, i) => (
                        <motion.div key={d.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                            <BentoCard accent="acid" className="p-6">
                                <div className="flex justify-between items-start mb-3">
                                    <div><span className="font-clash font-bold text-acid">{d.filed}</span><span className="font-mono text-xs text-white/30"> vs </span><span className="font-clash font-bold">{d.against}</span></div>
                                    <PulseTag status={d.status} />
                                </div>
                                <p className="font-mono text-sm text-white/60 mb-4">{d.reason}</p>
                                <div className="flex justify-between items-center">
                                    <span className="font-mono text-xs text-white/30">{d.date}</span>
                                    <ForgeButton variant="danger" size="sm">VOTE ON RESOLUTION</ForgeButton>
                                </div>
                            </BentoCard>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
}
