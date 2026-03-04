"use client";

import { motion } from "framer-motion";
import { BentoCard, ForgeButton } from "@/components/forge";
import Navbar from "@/components/layout/Navbar";

const REVIEWS = [
    {
        id: "rev-1",
        author: "@0xAlice",
        role: "Frontend Architect",
        relationship: "Collaborated on [Neon DEX]",
        rating: "S-Tier",
        content: "Shipped the core state machine 3 days ahead of schedule. Refuses to write untyped code. Extremely low latency communication.",
        verified: true,
        stake: "+500 PTS"
    },
    {
        id: "rev-2",
        author: "@Bob_Builder",
        role: "Project Owner",
        relationship: "Hired for [Zero-Knowledge Auth]",
        rating: "A-Tier",
        content: "Bob handled the cryptology aspects flawlessly. Only downside was occasionally dropping off comms during deep work sprints, but the output quality was elite.",
        verified: true,
        stake: "+120 PTS"
    }
];

export default function PeerReviewWall() {
    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans selection:bg-purple-500/30">
            <Navbar />

            <main className="max-w-5xl mx-auto px-6 py-32">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-white/10 pb-8">
                    <div>
                        <h1 className="font-clash font-bold text-5xl mb-4 text-white">Peer Review Ledger</h1>
                        <p className="font-mono text-base text-white/50 max-w-xl">
                            Corporate references are fake. These are cryptographically signed attestations from builders who have actually been in the trenches with you.
                        </p>
                    </div>

                    <div className="text-right">
                        <p className="font-mono text-xs text-white/40 uppercase tracking-widest mb-1">Total Attestation Value</p>
                        <p className="font-clash font-bold text-3xl text-cyber">620 PTS</p>
                    </div>
                </div>

                <div className="space-y-8">
                    {REVIEWS.map((review, index) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <BentoCard className="p-8 relative overflow-hidden group hover:border-cyber/40 transition-colors">
                                {/* Watermark */}
                                <div className="absolute -right-8 -top-8 text-9xl font-clash font-bold text-white/[0.02] rotate-12 pointer-events-none select-none">
                                    {review.rating}
                                </div>

                                <div className="relative z-10 flex flex-col md:flex-row gap-8">
                                    <div className="w-full md:w-1/4 pb-6 md:pb-0 md:border-r border-white/10 pr-6">
                                        <h3 className="font-clash font-bold text-xl text-cyber mb-1">{review.author}</h3>
                                        <p className="font-mono text-xs text-white/50 mb-4">{review.role}</p>

                                        <div className="space-y-2">
                                            <div className="inline-block px-2 py-1 bg-white/5 border border-white/10 rounded font-mono text-[10px] text-white/40">
                                                {review.relationship}
                                            </div>
                                            {review.verified && (
                                                <div className="inline-block px-2 py-1 bg-cyber/10 border border-cyber/30 rounded font-mono text-[10px] text-cyber">
                                                    ✓ STAKE VERIFIED
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="w-full md:w-3/4">
                                        <blockquote className="font-mono text-base text-white/80 leading-relaxed italic mb-6">
                                            &quot;{review.content}&quot;
                                        </blockquote>

                                        <div className="flex items-center justify-between">
                                            <span className="font-clash font-bold text-lg">{review.rating} <span className="text-white/20 text-sm ml-2">RATING</span></span>
                                            <span className="font-mono text-xs text-cyber font-bold">{review.stake}</span>
                                        </div>
                                    </div>
                                </div>
                            </BentoCard>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <ForgeButton variant="secondary" className="w-full md:w-auto">
                        REQUEST ATTESTATION
                    </ForgeButton>
                </div>

            </main>
        </div>
    );
}
