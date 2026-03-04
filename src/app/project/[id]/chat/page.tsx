"use client";
import { BentoCard, ForgeButton } from "@/components/forge";
import { motion } from "framer-motion";

const THREADS = [
    { id: 1, author: "0xNeo", message: "Started Sprint 3 — focusing on the peer review subsystem. Need feedback on the blind attestation model.", time: "2h ago", replies: 4 },
    { id: 2, author: "0xAlice", message: "PR #42 is ready for review. Refactored the state machine for commitment contracts.", time: "5h ago", replies: 2 },
    { id: 3, author: "DevMarcus", message: "Found a concurrency bug in the score aggregator. Posting the stack trace below.", time: "1d ago", replies: 7 },
];

export default function ChatArchivePage() {
    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans">
            <main className="max-w-5xl mx-auto px-6 py-32">
                <div className="flex justify-between items-end mb-12">
                    <div><h1 className="font-clash font-bold text-4xl mb-2">Thread Archive</h1><p className="font-mono text-white/50 text-sm">All project communication in one place.</p></div>
                    <ForgeButton variant="primary" size="sm">NEW THREAD</ForgeButton>
                </div>
                <div className="space-y-4">
                    {THREADS.map((t, i) => (
                        <motion.div key={t.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                            <BentoCard className="p-6 hover:border-cyber/30 cursor-pointer group">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-clash font-bold text-base group-hover:text-cyber transition-colors">{t.author}</h3>
                                    <span className="font-mono text-xs text-white/30">{t.time}</span>
                                </div>
                                <p className="font-mono text-sm text-white/60 mb-3">{t.message}</p>
                                <span className="font-mono text-xs text-cyber">{t.replies} replies</span>
                            </BentoCard>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
}
