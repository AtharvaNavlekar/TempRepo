"use client";

import { motion } from "framer-motion";
import { BentoCard, ForgeButton } from "@/components/forge";
import Navbar from "@/components/layout/Navbar";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PostMortemCreator() {
    const router = useRouter();
    const [lessons, setLessons] = useState<string[]>([""]);

    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans">
            <Navbar />

            <main className="max-w-4xl mx-auto px-6 py-32">
                <button
                    onClick={() => router.back()}
                    className="font-mono text-xs tracking-widest text-white/40 hover:text-white uppercase flex items-center gap-2 mb-12"
                >
                    ← INITIATE ABORT
                </button>

                <div className="mb-12">
                    <h1 className="font-clash font-bold text-4xl mb-4 text-acid">Execute Post-Mortem</h1>
                    <p className="font-mono text-white/60">Anatomy of a failure. Extract the DNA so the collective doesn&apos;t repeat the same mistake.</p>
                </div>

                <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); router.push('/ship-log/failures'); }}>

                    <BentoCard className="bg-black/40 p-8 space-y-6">
                        <div>
                            <label className="font-mono text-xs text-white/50 uppercase tracking-widest mb-2 block">Incident Designation</label>
                            <input
                                type="text"
                                placeholder="e.g. Dropped the prod database on a Friday"
                                className="w-full bg-black/60 border border-white/10 rounded-bento-sm p-4 font-mono text-white focus:border-acid outline-none transition-colors"
                                required
                            />
                        </div>

                        <div>
                            <label className="font-mono text-xs text-white/50 uppercase tracking-widest mb-2 block">Root Cause Analysis (RCA)</label>
                            <textarea
                                placeholder="Write exactly what went wrong. No corporate speak. The rawer the better."
                                className="w-full h-32 bg-black/60 border border-white/10 rounded-bento-sm p-4 font-mono text-white focus:border-acid outline-none transition-colors resize-none"
                                required
                            />
                        </div>
                    </BentoCard>

                    <BentoCard className="bg-black/40 p-8 space-y-6">
                        <div className="flex justify-between items-center mb-4">
                            <label className="font-mono text-xs text-white/50 uppercase tracking-widest">Extracted Lessons</label>
                            <button
                                type="button"
                                onClick={() => setLessons([...lessons, ""])}
                                className="font-mono text-xs text-acid hover:text-white"
                            >
                                + ADD LESSON
                            </button>
                        </div>

                        <div className="space-y-3">
                            {lessons.map((lesson, idx) => (
                                <div key={idx} className="flex gap-4">
                                    <div className="w-8 h-12 flex items-center justify-center font-mono text-white/20">
                                        {idx + 1}.
                                    </div>
                                    <input
                                        type="text"
                                        placeholder={`Critical takeaway ${idx + 1}`}
                                        className="flex-1 bg-black/60 border border-white/10 rounded-bento-sm px-4 font-mono text-white focus:border-acid outline-none transition-colors"
                                    />
                                </div>
                            ))}
                        </div>
                    </BentoCard>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex justify-end gap-4"
                    >
                        <ForgeButton variant="ghost" onClick={() => router.back()} type="button">
                            CANCEL
                        </ForgeButton>
                        <ForgeButton variant="danger" type="submit">
                            COMMIT FAILURE TO LEDGER
                        </ForgeButton>
                    </motion.div>
                </form>

            </main>
        </div>
    );
}
