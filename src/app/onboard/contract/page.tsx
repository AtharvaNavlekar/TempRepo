"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BentoCard, ShipScoreCounter } from "@/components/forge";
import { useCollabRiseStore } from "@/store/store";

export default function CommitmentContractPage() {
    const router = useRouter();
    const shipScore = useCollabRiseStore(state => state.shipScore);
    const [stakedAmount, setStakedAmount] = useState(0);

    const maxStake = Math.floor(shipScore * 0.2); // You can stake up to 20% of your score

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStakedAmount(parseInt(e.target.value));
    };

    return (
        <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center p-6 relative">
            <div className="w-full max-w-4xl relative z-10">

                <div className="text-center mb-12">
                    <p className="font-mono text-red-500/70 text-sm tracking-widest uppercase mb-4 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]">
                        Phase 4 // Skin In The Game
                    </p>
                    <h1 className="font-clash font-black text-4xl md:text-5xl text-white mb-4">
                        The Commitment Contract.
                    </h1>
                    <p className="font-mono text-white/60 max-w-2xl mx-auto text-sm leading-relaxed">
                        If you say you&apos;re going to build it, you build it. Stake a portion of your baseline Ship Score.
                        If you ship on time, you gain a multiplier. If you fail, the staked points are burned forever.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <BentoCard className="p-8 flex flex-col justify-center items-center text-center">
                        <h3 className="font-mono text-xs text-white/50 uppercase tracking-widest mb-6">Current Baseline Score</h3>
                        <ShipScoreCounter value={shipScore} size="lg" />
                        <div className="mt-8 w-full">
                            <div className="flex justify-between text-xs font-mono text-white/50 mb-2">
                                <span>0 PTS</span>
                                <span className="text-lime">MAX {maxStake} PTS</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max={maxStake}
                                value={stakedAmount}
                                onChange={handleSliderChange}
                                className="w-full h-2 bg-black/50 rounded-full appearance-none outline-none overflow-hidden cursor-pointer"
                                style={{
                                    background: `linear-gradient(to right, #CCFF00 0%, #CCFF00 ${(stakedAmount / maxStake) * 100}%, rgba(0,0,0,0.5) ${(stakedAmount / maxStake) * 100}%, rgba(0,0,0,0.5) 100%)`
                                }}
                            />
                        </div>
                    </BentoCard>

                    <BentoCard className="p-8 border border-white/10 relative overflow-hidden flex flex-col justify-center">
                        {/* Background Burn Effect */}
                        <div
                            className="absolute inset-x-0 bottom-0 bg-red-500/10 blur-xl transition-all duration-300"
                            style={{ height: `${(stakedAmount / maxStake) * 100}%`, opacity: stakedAmount > 0 ? 1 : 0 }}
                        />

                        <div className="relative z-10">
                            <h3 className="font-clash font-bold text-2xl text-white mb-6">Risk Assessment</h3>

                            <div className="space-y-4 font-mono text-sm">
                                <div className="flex justify-between items-center p-3 bg-white/5 rounded border border-white/5">
                                    <span className="text-white/60">Staked Points:</span>
                                    <span className="text-white font-bold">{stakedAmount}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-lime/10 rounded border border-lime/20">
                                    <span className="text-lime/80">Success Reward (+1.5x):</span>
                                    <span className="text-lime font-bold">+{Math.floor(stakedAmount * 1.5)}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-red-500/10 rounded border border-red-500/20">
                                    <span className="text-red-400">Failure Penalty (Burn):</span>
                                    <span className="text-red-500 font-bold">-{stakedAmount}</span>
                                </div>
                            </div>
                        </div>
                    </BentoCard>

                </div>

                <div className="mt-10 flex justify-center">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <button
                            onClick={() => router.push('/onboard/guilds')}
                            className={`font-clash font-black text-xl py-5 px-12 rounded-bento-sm transition-all duration-300 shadow-xl
                ${stakedAmount > 0
                                    ? 'bg-red-500 text-white hover:bg-red-400 hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] border-none'
                                    : 'bg-white/10 text-white/30 border border-white/10 hover:bg-white/20 hover:text-white'}
              `}
                        >
                            {stakedAmount > 0 ? "I ACCEPT THE RISK" : "SKIP WITHOUT STAKING"}
                        </button>
                    </motion.div>
                </div>

            </div>
        </div>
    );
}
