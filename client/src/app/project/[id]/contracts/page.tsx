"use client";
import { BentoCard, ForgeButton, ShipScoreCounter } from "@/components/forge";
import { motion } from "framer-motion";

const CONTRACTS = [
    { builder: "0xNeo", hoursCommitted: 40, hoursLogged: 32, staked: 500, risk: "LOW" },
    { builder: "0xAlice", hoursCommitted: 30, hoursLogged: 28, staked: 300, risk: "LOW" },
    { builder: "DevMarcus", hoursCommitted: 25, hoursLogged: 10, staked: 400, risk: "HIGH" },
];
const RISK_COLORS: Record<string, string> = { LOW: "text-lime", MEDIUM: "text-yellow-400", HIGH: "text-acid" };

export default function ContractsHubPage() {
    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans">
            <main className="max-w-5xl mx-auto px-6 py-32">
                <h1 className="font-clash font-bold text-4xl mb-2">Commitment Contracts</h1>
                <p className="font-mono text-white/50 text-sm mb-12">Track hours, stakes, and ghosting risk for every builder.</p>
                <div className="space-y-4">
                    {CONTRACTS.map((c, i) => (
                        <motion.div key={c.builder} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                            <BentoCard className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex-1">
                                    <h3 className="font-clash font-bold text-lg">{c.builder}</h3>
                                    <p className="font-mono text-xs text-white/40">{c.hoursLogged}h / {c.hoursCommitted}h logged</p>
                                    <div className="w-full h-2 bg-white/5 rounded-full mt-2"><div className="h-full bg-lime rounded-full" style={{ width: `${(c.hoursLogged / c.hoursCommitted) * 100}%` }} /></div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="text-right"><p className="font-clash font-bold text-xl text-acid">{c.staked}</p><p className="font-mono text-[10px] text-white/30">STAKED</p></div>
                                    <span className={`font-mono text-xs font-bold ${RISK_COLORS[c.risk]}`}>{c.risk} RISK</span>
                                </div>
                            </BentoCard>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
}
