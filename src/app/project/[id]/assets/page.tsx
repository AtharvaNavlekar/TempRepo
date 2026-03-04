"use client";
import { BentoCard, ForgeButton } from "@/components/forge";
import { motion } from "framer-motion";

const ASSETS = [
    { name: "architecture-v3.fig", type: "FIGMA", size: "24 MB", date: "2026-02-28" },
    { name: "auth-module.zip", type: "CODE", size: "1.2 MB", date: "2026-02-25" },
    { name: "user-flow-recording.mp4", type: "VIDEO", size: "89 MB", date: "2026-02-20" },
    { name: "brand-guidelines.pdf", type: "DOCUMENT", size: "4.7 MB", date: "2026-02-18" },
];

const TYPE_COLORS: Record<string, string> = { FIGMA: "text-cyber", CODE: "text-lime", VIDEO: "text-acid", DOCUMENT: "text-yellow-400" };

export default function AssetVaultPage() {
    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans">
            <main className="max-w-5xl mx-auto px-6 py-32">
                <div className="flex justify-between items-end mb-12">
                    <div><h1 className="font-clash font-bold text-4xl mb-2">Asset Vault</h1><p className="font-mono text-white/50 text-sm">All project artifacts stored and fingerprinted.</p></div>
                    <ForgeButton variant="primary" size="sm">UPLOAD ASSET</ForgeButton>
                </div>
                <div className="space-y-3">
                    {ASSETS.map((a, i) => (
                        <motion.div key={a.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                            <BentoCard className="p-5 flex items-center justify-between hover:border-lime/30 cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <span className={`font-mono text-xs font-bold ${TYPE_COLORS[a.type] || "text-white/40"}`}>{a.type}</span>
                                    <div><p className="font-mono text-sm text-white">{a.name}</p><p className="font-mono text-[10px] text-white/30">{a.size} · {a.date}</p></div>
                                </div>
                                <ForgeButton variant="ghost" size="sm">DOWNLOAD</ForgeButton>
                            </BentoCard>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
}
