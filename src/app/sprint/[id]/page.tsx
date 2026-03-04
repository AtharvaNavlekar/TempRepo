"use client";
import { BentoCard, ForgeButton, PulseTag, ShipScoreCounter } from "@/components/forge";
import { motion } from "framer-motion";

const DELIVERABLES = [
    { name: "WebSocket Server Implementation", status: "COMPLETE", score: 450 },
    { name: "Client SDK & React Hooks", status: "IN REVIEW", score: 300 },
    { name: "Integration Tests (95% coverage)", status: "IN REVIEW", score: 200 },
    { name: "Documentation & Migration Guide", status: "PENDING", score: 150 },
];

export default function SprintSubmissionPage() {
    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans">
            <main className="max-w-4xl mx-auto px-6 py-32">
                <div className="flex justify-between items-start mb-8">
                    <div><PulseTag status="building" className="mb-2" /><h1 className="font-clash font-bold text-4xl">Sprint Submission</h1><p className="font-mono text-white/50 text-sm mt-2">Real-Time Notification System · NeonLabs</p></div>
                    <ShipScoreCounter value={1100} size="sm" />
                </div>

                <BentoCard className="p-8 mb-6">
                    <h3 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-4">Deliverables</h3>
                    <div className="space-y-4">
                        {DELIVERABLES.map((d, i) => (
                            <motion.div key={d.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex items-center justify-between p-4 bg-white/5 rounded-bento-sm">
                                <div><p className="font-clash font-semibold">{d.name}</p><span className={`font-mono text-[10px] ${d.status === "COMPLETE" ? "text-lime" : d.status === "IN REVIEW" ? "text-yellow-400" : "text-white/30"}`}>{d.status}</span></div>
                                <span className="font-clash font-bold text-lime">+{d.score}</span>
                            </motion.div>
                        ))}
                    </div>
                </BentoCard>

                <BentoCard className="p-8 mb-6">
                    <h3 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-4">Proof Links</h3>
                    <div className="space-y-2">
                        {["github.com/0xNeo/notification-ws", "figma.com/file/neon-notif-design", "staging.neonlabs.dev/notifications"].map(link => (
                            <div key={link} className="p-3 bg-white/5 rounded font-mono text-sm text-cyber flex items-center gap-2"><span className="text-lime">→</span>{link}</div>
                        ))}
                    </div>
                </BentoCard>

                <ForgeButton variant="primary" className="w-full py-5 text-lg">SUBMIT FOR REVIEW</ForgeButton>
            </main>
        </div>
    );
}
