"use client";
import { BentoCard, ForgeButton } from "@/components/forge";
import { motion } from "framer-motion";

const PAYOUTS = [
    { id: "pay-01", description: "Real-Time Notifications (NeonLabs)", amount: "$2,500", date: "2026-03-15", status: "PENDING" },
    { id: "pay-02", description: "Recipe API (FoodForge)", amount: "$1,200", date: "2026-03-02", status: "PAID" },
    { id: "pay-03", description: "Design System Audit (CreativeOS)", amount: "$3,000", date: "2026-02-20", status: "PAID" },
    { id: "pay-04", description: "IoT Dashboard (MakerHQ)", amount: "$3,000", date: "2026-02-10", status: "PAID" },
];

const STATUS_COLORS: Record<string, string> = { PENDING: "text-yellow-400", PAID: "text-lime", DISPUTED: "text-acid" };

export default function PayoutsPage() {
    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans">
            <main className="max-w-5xl mx-auto px-6 py-32">
                <h1 className="font-clash font-bold text-5xl mb-2">Payout Dashboard</h1>
                <p className="font-mono text-white/50 mb-12">Track all incoming and outgoing payments.</p>
                <div className="grid grid-cols-3 gap-6 mb-12">
                    <BentoCard className="p-6 text-center"><p className="font-clash font-bold text-3xl text-lime">$9,700</p><p className="font-mono text-[10px] text-white/30">TOTAL EARNED</p></BentoCard>
                    <BentoCard className="p-6 text-center"><p className="font-clash font-bold text-3xl text-yellow-400">$2,500</p><p className="font-mono text-[10px] text-white/30">PENDING</p></BentoCard>
                    <BentoCard className="p-6 text-center"><p className="font-clash font-bold text-3xl text-cyber">$7,200</p><p className="font-mono text-[10px] text-white/30">PAID OUT</p></BentoCard>
                </div>
                <div className="space-y-3">
                    {PAYOUTS.map((p, i) => (
                        <motion.div key={p.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                            <BentoCard className="p-5 flex items-center justify-between">
                                <div><p className="font-clash font-bold">{p.description}</p><p className="font-mono text-xs text-white/30">{p.date}</p></div>
                                <div className="flex items-center gap-4"><span className={`font-mono text-xs font-bold ${STATUS_COLORS[p.status]}`}>{p.status}</span><span className="font-clash font-bold text-xl text-lime">{p.amount}</span></div>
                            </BentoCard>
                        </motion.div>
                    ))}
                </div>
                <div className="mt-8 text-right"><ForgeButton variant="primary">WITHDRAW TO BANK</ForgeButton></div>
            </main>
        </div>
    );
}
