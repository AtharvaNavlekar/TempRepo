"use client";

import Link from "next/link";
import { BentoCard, GlitchText } from "@/components/forge";
import { motion } from "framer-motion";

export default function WaitlistPage() {
    return (
        <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center p-6 relative overflow-hidden">

            {/* Intense Red Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.1)_0%,transparent_70%)] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="w-full max-w-2xl relative z-10"
            >
                <BentoCard className="p-10 border-red-500/20 text-center relative overflow-hidden">

                    <div className="absolute top-0 right-0 p-4 border-l border-b border-red-500/20 bg-red-500/5 text-red-500 font-mono text-[10px] tracking-widest">
                        ERROR: NO PROOF OF WORK
                    </div>

                    <div className="w-20 h-20 rounded-full border border-red-500/30 flex items-center justify-center mx-auto mb-8 bg-red-500/10">
                        <span className="text-red-500 text-4xl block translate-y-[-2px]">×</span>
                    </div>

                    <GlitchText text="ACCESS DENIED" className="text-5xl font-black text-white mb-4" speed="fast" />

                    <p className="font-mono text-white/60 mb-8 leading-relaxed">
                        The Scraper failed to identify a sufficient shipping history. The Forge requires demonstrable proof-of-work.
                        Words are cheap. Code, designs, and shipped products are reality.
                    </p>

                    <div className="bg-black/50 border border-white/5 p-6 rounded-bento-sm text-left mb-8">
                        <h4 className="font-mono text-xs text-white/40 uppercase tracking-widest mb-4">Diagnostic Log</h4>
                        <div className="space-y-2 font-mono text-sm">
                            <p className="text-red-400">&gt; Github Commits: 0</p>
                            <p className="text-red-400">&gt; Figma Edits: 0</p>
                            <p className="text-red-400">&gt; Deployed URLs: 0</p>
                            <p className="text-white/30 mt-4">&gt; Recommendation: Build something. Return later.</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <Link href="/" className="font-mono text-xs text-white/30 hover:text-white uppercase tracking-widest transition-colors">
                            ← RETURN TO LANDING
                        </Link>
                    </div>

                </BentoCard>
            </motion.div>
        </div>
    );
}
