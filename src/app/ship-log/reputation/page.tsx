"use client";

import { motion } from "framer-motion";
import { BentoCard, ShipScoreCounter, ForgeButton, PulseTag } from "@/components/forge";
const ACTIVE_STAKES = [
    { project: "CollabRise Core v2", staked: 500, deadline: "2026-03-15", risk: "LOW", daysLeft: 10 },
    { project: "Neon DEX Audit", staked: 1200, deadline: "2026-03-22", risk: "MEDIUM", daysLeft: 17 },
    { project: "ZK Identity Module", staked: 2000, deadline: "2026-04-01", risk: "HIGH", daysLeft: 27 },
];

const RISK_COLORS: Record<string, string> = {
    LOW: "text-lime border-lime/30 bg-lime/10",
    MEDIUM: "text-yellow-400 border-yellow-400/30 bg-yellow-400/10",
    HIGH: "text-acid border-acid/30 bg-acid/10",
};

export default function ReputationDashboardPage() {
    const totalStaked = ACTIVE_STAKES.reduce((sum, s) => sum + s.staked, 0);

    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans">

            <main className="max-w-6xl mx-auto px-6 py-32">
                <div className="mb-12">
                    <h1 className="font-clash font-bold text-5xl mb-4">Staked Reputation</h1>
                    <p className="font-mono text-white/50 max-w-xl">
                        Your score decays if you don&apos;t deliver. Every active stake is a bet on yourself.
                    </p>
                </div>

                {/* Top Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <BentoCard className="md:col-span-1 p-8 flex flex-col items-center justify-center bg-gradient-to-br from-lime/5 to-transparent border-lime/20">
                        <h3 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-4">Current Score</h3>
                        <ShipScoreCounter value={8442} size="lg" />
                    </BentoCard>

                    <BentoCard className="md:col-span-1 p-8 text-center">
                        <h3 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-4">Total Staked</h3>
                        <p className="font-clash font-bold text-6xl text-acid">{totalStaked}</p>
                        <p className="font-mono text-xs text-white/30 mt-2">Points at Risk</p>
                    </BentoCard>

                    <BentoCard className="md:col-span-1 p-8 text-center">
                        <h3 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-4">Decay Rate</h3>
                        <p className="font-clash font-bold text-6xl text-cyber">-2.4%</p>
                        <p className="font-mono text-xs text-white/30 mt-2">Per Week if Idle</p>
                        <PulseTag label="ACTIVE" status="live" className="mt-4" />
                    </BentoCard>
                </div>

                {/* Active Stakes Table */}
                <BentoCard className="p-8">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="font-clash font-semibold text-xl flex items-center gap-3">
                            <span className="w-2 h-6 bg-acid inline-block" />
                            Active Stakes
                        </h3>
                        <ForgeButton variant="danger" size="sm">STAKE MORE</ForgeButton>
                    </div>

                    <div className="space-y-4">
                        {ACTIVE_STAKES.map((stake, index) => (
                            <motion.div
                                key={stake.project}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-black/40 border border-white/10 hover:border-white/20 rounded-bento-sm transition-colors gap-4"
                            >
                                <div className="flex-1">
                                    <h4 className="font-clash font-bold text-lg">{stake.project}</h4>
                                    <p className="font-mono text-xs text-white/40 mt-1">Deadline: {stake.deadline} ({stake.daysLeft} days)</p>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="text-right">
                                        <p className="font-clash font-bold text-xl text-acid">{stake.staked}</p>
                                        <p className="font-mono text-[10px] text-white/30">PTS STAKED</p>
                                    </div>
                                    <span className={`px-3 py-1 font-mono text-[10px] uppercase tracking-widest rounded border ${RISK_COLORS[stake.risk]}`}>
                                        {stake.risk} RISK
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </BentoCard>

                {/* Decay Projection */}
                <BentoCard className="p-8 mt-8 bg-gradient-to-r from-acid/5 to-transparent border-acid/20">
                    <h3 className="font-clash font-semibold text-xl mb-6 text-acid">Decay Projection</h3>
                    <div className="grid grid-cols-4 gap-4">
                        {[
                            { label: "1 WEEK", value: "8,240", delta: "-202" },
                            { label: "2 WEEKS", value: "8,042", delta: "-400" },
                            { label: "1 MONTH", value: "7,600", delta: "-842" },
                            { label: "3 MONTHS", value: "6,000", delta: "-2,442" },
                        ].map(proj => (
                            <div key={proj.label} className="text-center">
                                <p className="font-clash font-bold text-2xl text-white">{proj.value}</p>
                                <p className="font-mono text-xs text-acid mt-1">{proj.delta}</p>
                                <p className="font-mono text-[10px] text-white/30 mt-1 uppercase">{proj.label}</p>
                            </div>
                        ))}
                    </div>
                </BentoCard>
            </main>
        </div>
    );
}
