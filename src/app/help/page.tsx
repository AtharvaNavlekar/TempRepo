"use client";
import { BentoCard } from "@/components/forge";
import { motion } from "framer-motion";
const TOPICS = [
    { title: "Getting Started", articles: 8, icon: "IconRocket" },
    { title: "Ship Log & DNA Cards", articles: 12, icon: "IconDNA" },
    { title: "War Rooms & Projects", articles: 15, icon: "IconGuild" },
    { title: "Guilds & Community", articles: 9, icon: "IconUsers" },
    { title: "Bounties & Economy", articles: 11, icon: "IconHire" },
    { title: "Reputation & Scoring", articles: 7, icon: "IconChart" },
    { title: "API & Integrations", articles: 6, icon: "IconLink" },
    { title: "Trust & Disputes", articles: 5, icon: "IconScale" },
];

export default function HelpPage() {
    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans">
            <main className="max-w-5xl mx-auto px-6 py-32">
                <h1 className="font-clash font-bold text-5xl mb-2">Help Center</h1>
                <p className="font-mono text-white/50 mb-8">Everything you need to navigate the Forge.</p>
                <div className="mb-12"><input placeholder="Search documentation..." className="w-full bg-black/60 border border-white/10 rounded-bento-sm p-4 font-mono text-white focus:border-lime outline-none" /></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {TOPICS.map((t, i) => (
                        <motion.div key={t.title} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}>
                            <BentoCard className="p-6 hover:border-lime/30 cursor-pointer group text-center h-full">
                                <span className="text-3xl">{t.icon}</span>
                                <h3 className="font-clash font-bold text-base mt-3 group-hover:text-lime transition-colors">{t.title}</h3>
                                <p className="font-mono text-xs text-white/30 mt-1">{t.articles} articles</p>
                            </BentoCard>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
}
