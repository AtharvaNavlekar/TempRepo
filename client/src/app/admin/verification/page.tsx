"use client";
import { BentoCard, ForgeButton, PulseTag } from "@/components/forge";
import { motion } from "framer-motion";

const QUEUE = [
    { builder: "NewBuilder_01", type: "GitHub Verification", submitted: "2h ago", links: "github.com/newbuilder01", status: "building" as const },
    { builder: "ChefMasterX", type: "Portfolio Verification", submitted: "6h ago", links: "chefmasterx.com/portfolio", status: "building" as const },
    { builder: "CodeRunner99", type: "Figma Verification", submitted: "1d ago", links: "figma.com/@coderunner99", status: "staked" as const },
];

export default function VerificationQueuePage() {
    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans">
            <main className="max-w-5xl mx-auto px-6 py-32">
                <div className="flex justify-between items-end mb-12">
                    <div><h1 className="font-clash font-bold text-4xl mb-2">Verification Queue</h1><p className="font-mono text-white/50">Manual verification for flagged oracles.</p></div>
                    <span className="font-mono text-sm text-yellow-400">{QUEUE.length} pending</span>
                </div>
                <div className="space-y-4">
                    {QUEUE.map((q, i) => (
                        <motion.div key={q.builder} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                            <BentoCard className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div><h3 className="font-clash font-bold text-lg">{q.builder}</h3><p className="font-mono text-xs text-white/40">{q.type} · {q.submitted}</p><p className="font-mono text-xs text-cyber mt-1">{q.links}</p></div>
                                <div className="flex items-center gap-3"><PulseTag status={q.status} /><ForgeButton variant="ghost" size="sm">REJECT</ForgeButton><ForgeButton variant="primary" size="sm">VERIFY</ForgeButton></div>
                            </BentoCard>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
}
