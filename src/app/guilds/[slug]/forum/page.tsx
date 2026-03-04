"use client";
import { BentoCard, ForgeButton } from "@/components/forge";
import { motion } from "framer-motion";
import { IconChat } from "@/components/icons";
const POSTS = [
    { id: 1, author: "0xNeo", title: "Best practices for React Server Components in 2026", replies: 23, upvotes: 89, time: "3h ago" },
    { id: 2, author: "0xAlice", title: "Should we standardize our state management approach?", replies: 45, upvotes: 112, time: "8h ago" },
    { id: 3, author: "RustNinja", title: "RFC: Adding Rust-compiled WASM modules to the guild toolkit", replies: 67, upvotes: 201, time: "1d ago" },
    { id: 4, author: "DesignYuki", title: "Design token sync between Figma and code — solved?", replies: 12, upvotes: 56, time: "2d ago" },
];

export default function GuildForumPage() {
    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans">
            <main className="max-w-5xl mx-auto px-6 py-32">
                <div className="flex justify-between items-end mb-12">
                    <div><h1 className="font-clash font-bold text-4xl mb-2">Guild Forum</h1><p className="font-mono text-white/50 text-sm">Discuss, debate, and decide. No corporate tone allowed.</p></div>
                    <ForgeButton variant="primary" size="sm">NEW POST</ForgeButton>
                </div>
                <div className="space-y-3">
                    {POSTS.map((p, i) => (
                        <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                            <BentoCard className="p-5 hover:border-cyber/30 cursor-pointer group">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1"><h3 className="font-clash font-bold text-base mb-1 group-hover:text-cyber transition-colors">{p.title}</h3><p className="font-mono text-xs text-white/40">{p.author} · {p.time}</p></div>
                                    <div className="flex items-center gap-4 font-mono text-xs text-white/40">
                                        <span>▲ {p.upvotes}</span><span><IconChat className="w-4 h-4 inline" /> {p.replies}</span>
                                    </div>
                                </div>
                            </BentoCard>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
}
