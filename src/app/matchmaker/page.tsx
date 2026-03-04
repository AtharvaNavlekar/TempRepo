"use client";
import { BentoCard, ForgeButton, PulseTag } from "@/components/forge";
import { motion } from "framer-motion";

const MATCHES = [
    { name: "0xAlice", role: "Frontend Architect", compatibility: 94, style: "Deep Focus Async", status: "live" as const },
    { name: "ChefMika", role: "Culinary Engineer", compatibility: 72, style: "Sprint Bursts", status: "building" as const },
    { name: "RustNinja", role: "Systems Engineer", compatibility: 88, style: "Pair Programming", status: "shipped" as const },
];

export default function MatchmakerPage() {
    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans">
            <main className="max-w-4xl mx-auto px-6 py-32">
                <h1 className="font-clash font-bold text-5xl mb-2 text-cyber">Pair-Builder Matchmaker</h1>
                <p className="font-mono text-white/50 mb-12">Find your co-builder. Compatibility based on psychometric DNA and shipping history.</p>
                <div className="space-y-6">
                    {MATCHES.map((m, i) => (
                        <motion.div key={m.name} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1, type: "spring" }}>
                            <BentoCard className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-cyber/40 group">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 bg-cyber/10 border border-cyber/30 rounded-full flex items-center justify-center font-clash font-bold text-2xl text-cyber">{m.name[0]}</div>
                                    <div><h3 className="font-clash font-bold text-xl group-hover:text-cyber transition-colors">{m.name}</h3><p className="font-mono text-xs text-white/40">{m.role} · {m.style}</p><PulseTag status={m.status} className="mt-2" /></div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="text-center"><p className="font-clash font-bold text-4xl text-cyber">{m.compatibility}%</p><p className="font-mono text-[10px] text-white/30">MATCH</p></div>
                                    <ForgeButton variant="secondary" size="sm">CONNECT</ForgeButton>
                                </div>
                            </BentoCard>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
}
