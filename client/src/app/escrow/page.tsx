"use client";
import { BentoCard, ForgeButton, PulseTag } from "@/components/forge";
import { motion } from "framer-motion";

const ESCROWS = [
    { id: "esc-01", bounty: "Real-Time Notification System", from: "NeonLabs", to: "0xNeo", amount: "$2,500", status: "staked" as const, releaseDate: "2026-03-15" },
    { id: "esc-02", bounty: "Mobile Onboarding Flow", from: "CreativeOS", to: "DesignYuki", amount: "$1,800", status: "building" as const, releaseDate: "2026-03-10" },
    { id: "esc-03", bounty: "Recipe API Integration", from: "FoodForge", to: "ChefMika", amount: "$1,200", status: "shipped" as const, releaseDate: "2026-03-02" },
];

export default function EscrowPage() {
    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans">
            <main className="max-w-5xl mx-auto px-6 py-32">
                <h1 className="font-clash font-bold text-5xl mb-2">Escrow Portal</h1>
                <p className="font-mono text-white/50 mb-12">Trustless payments. Funds locked until both parties confirm ship quality.</p>
                <div className="grid grid-cols-3 gap-6 mb-12">
                    <BentoCard className="p-6 text-center"><p className="font-clash font-bold text-3xl text-lime">$5,500</p><p className="font-mono text-[10px] text-white/30">IN ESCROW</p></BentoCard>
                    <BentoCard className="p-6 text-center"><p className="font-clash font-bold text-3xl text-cyber">$1,200</p><p className="font-mono text-[10px] text-white/30">READY TO RELEASE</p></BentoCard>
                    <BentoCard className="p-6 text-center"><p className="font-clash font-bold text-3xl text-acid">0</p><p className="font-mono text-[10px] text-white/30">DISPUTED</p></BentoCard>
                </div>
                <div className="space-y-4">
                    {ESCROWS.map((e, i) => (
                        <motion.div key={e.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                            <BentoCard className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div><h3 className="font-clash font-bold text-lg">{e.bounty}</h3><p className="font-mono text-xs text-white/40">{e.from} → {e.to} · Release: {e.releaseDate}</p></div>
                                <div className="flex items-center gap-4"><PulseTag status={e.status} /><span className="font-clash font-bold text-xl text-lime">{e.amount}</span>
                                    {e.status === "shipped" && <ForgeButton variant="primary" size="sm">RELEASE</ForgeButton>}
                                </div>
                            </BentoCard>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
}
