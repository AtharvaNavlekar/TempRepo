"use client";
import { motion } from "framer-motion";
import type { AccountType, FormState } from "./types";

interface StepTypeProps {
    onSelect: (type: AccountType) => void;
}

const CARDS = [
    {
        type: "builder" as AccountType,
        emoji: "🚀",
        title: "FOUNDER",
        subtitle: "Entrepreneur / Solopreneur",
        desc: "You launch ventures. Startups, products, or services — you scale ideas and want the world to see your proof of execution.",
        bullets: ["Showcase your Venture Log", "Secure strategic deals", "Join founder guilds", "Scale without pitch decks"],
        accent: "lime",
        border: "hover:border-lime/50",
        glow: "bg-lime/5",
        textAccent: "text-lime",
    },
    {
        type: "company" as AccountType,
        emoji: "🤝",
        title: "PARTNER",
        subtitle: "Investor / Ecosystem",
        desc: "You back founders. Provide capital, resources, or strategic support and find ventures based on what they've actually launched.",
        bullets: ["Post strategic bounties", "Browse Venture Logs", "Run venture challenges", "Back proven execution"],
        accent: "cyber",
        border: "hover:border-cyber/50",
        glow: "bg-cyber/5",
        textAccent: "text-cyber",
    },
];

export default function StepTypeSelect({ onSelect }: StepTypeProps) {
    return (
        <div className="space-y-6">
            <div className="text-center mb-10">
                <p className="font-mono text-[11px] tracking-[0.3em] text-white/30 uppercase mb-3">Step 0 of 5</p>
                <h2 className="font-clash font-bold text-3xl md:text-4xl text-white mb-2">Who are you?</h2>
                <p className="font-mono text-sm text-white/40">Choose your account type to get started.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {CARDS.map((card, i) => (
                    <motion.button
                        key={card.type}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, type: "spring", stiffness: 300 }}
                        onClick={() => onSelect(card.type)}
                        className={`text-left p-8 rounded-bento bg-white/[0.02] border border-white/10 ${card.border} ${card.glow} hover:bg-white/[0.04] transition-all duration-300 group`}
                    >
                        <div className="text-4xl mb-4">{card.emoji}</div>
                        <p className={`font-clash font-black text-2xl ${card.textAccent} mb-1`}>{card.title}</p>
                        <p className="font-mono text-xs text-white/40 mb-4 uppercase tracking-widest">{card.subtitle}</p>
                        <p className="font-mono text-sm text-white/60 leading-relaxed mb-6">{card.desc}</p>
                        <ul className="space-y-2">
                            {card.bullets.map(b => (
                                <li key={b} className="flex items-center gap-2 font-mono text-xs text-white/50">
                                    <span className={card.textAccent}>→</span> {b}
                                </li>
                            ))}
                        </ul>
                        <div className={`mt-6 pt-4 border-t border-white/10 font-mono text-xs ${card.textAccent} group-hover:translate-x-1 transition-transform`}>
                            Continue as {card.title} →
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
}
