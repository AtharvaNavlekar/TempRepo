"use client";
import { BentoCard, ForgeButton } from "@/components/forge";
export default function FinancePage() {
    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans">
            <main className="max-w-6xl mx-auto px-6 py-32">
                <h1 className="font-clash font-bold text-4xl mb-2">Financial Dashboard</h1>
                <p className="font-mono text-white/50 mb-12">All bounty payments, escrow status, and platform revenue.</p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    <BentoCard className="p-6 text-center"><p className="font-clash font-bold text-3xl text-lime">$142K</p><p className="font-mono text-[10px] text-white/30">TOTAL VOLUME</p></BentoCard>
                    <BentoCard className="p-6 text-center"><p className="font-clash font-bold text-3xl text-cyber">$23K</p><p className="font-mono text-[10px] text-white/30">IN ESCROW</p></BentoCard>
                    <BentoCard className="p-6 text-center"><p className="font-clash font-bold text-3xl text-lime">$119K</p><p className="font-mono text-[10px] text-white/30">RELEASED</p></BentoCard>
                    <BentoCard className="p-6 text-center"><p className="font-clash font-bold text-3xl text-acid">$1.2K</p><p className="font-mono text-[10px] text-white/30">DISPUTED</p></BentoCard>
                </div>
                <BentoCard className="p-8"><h3 className="font-clash font-semibold text-lg mb-4">Recent Transactions</h3>
                    <div className="space-y-2">
                        {[
                            { desc: "NeonLabs → 0xNeo", amount: "+$2,500", type: "BOUNTY" },
                            { desc: "CreativeOS → DesignSensei", amount: "+$1,800", type: "BOUNTY" },
                            { desc: "Platform Fee", amount: "-$430", type: "FEE" },
                            { desc: "ChainVault → Escrow", amount: "$5,000", type: "ESCROW" },
                        ].map(tx => (
                            <div key={tx.desc} className="flex items-center justify-between p-3 bg-white/5 rounded-bento-sm">
                                <div><p className="font-mono text-sm">{tx.desc}</p><span className="font-mono text-[10px] text-white/30">{tx.type}</span></div>
                                <span className={`font-clash font-bold ${tx.amount.startsWith("-") ? "text-acid" : "text-lime"}`}>{tx.amount}</span>
                            </div>
                        ))}
                    </div>
                </BentoCard>
            </main>
        </div>
    );
}
