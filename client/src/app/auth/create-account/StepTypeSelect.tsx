"use client";
import { motion } from "framer-motion";
import { Rocket, Handshake } from "lucide-react";
import type { ReactNode } from "react";
import type { AccountType, FormState } from "./types";

interface StepTypeProps {
    onSelect: (type: AccountType) => void;
}

const CARDS = [
    {
        type: "builder" as AccountType,
        emoji: <Rocket className="w-8 h-8 text-saffron" /> as ReactNode,
        title: "FOUNDER",
        subtitle: "Entrepreneur / Solopreneur",
        desc: "You launch ventures. Startups, products, or services — you scale ideas and want the world to see your proof of execution.",
        bullets: ["Showcase your Venture Log", "Secure strategic deals", "Join founder guilds", "Scale without pitch decks"],
        accent: "saffron",
        border: "hover:border-saffron/40 hover:shadow-luxury",
        glow: "bg-saffron/5",
        textAccent: "text-saffron",
    },
    {
        type: "company" as AccountType,
        emoji: <Handshake className="w-8 h-8 text-indigo" /> as ReactNode,
        title: "PARTNER",
        subtitle: "Investor / Ecosystem",
        desc: "You back founders. Provide capital, resources, or strategic support and find ventures based on what they've actually launched.",
        bullets: ["Post strategic bounties", "Browse Venture Logs", "Run venture challenges", "Back proven execution"],
        accent: "indigo",
        border: "hover:border-indigo/30 hover:shadow-luxury",
        glow: "bg-indigo/5",
        textAccent: "text-indigo",
    },
];

export default function StepTypeSelect({ onSelect }: StepTypeProps) {
    return (
        <div className="space-y-6">
            <div className="text-center mb-10">
                <p className="font-sans font-bold text-[11px] tracking-[0.3em] text-smoke/70 uppercase mb-3">Step 0 of 5</p>
                <h2 className="font-serif italic tracking-wide font-black text-3xl md:text-4xl text-ink mb-2">Who are you?</h2>
                <p className="font-sans font-medium text-sm text-smoke">Choose your account type to get started.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {CARDS.map((card, i) => (
                    <motion.button
                        key={card.type}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, type: "spring", stiffness: 300 }}
                        onClick={() => onSelect(card.type)}
                        className={`text-left p-8 rounded-bento bg-white/60 border border-ink/10 shadow-sm ${card.border} ${card.glow} hover:bg-white/80 backdrop-blur-xl transition-all duration-300 group`}
                    >
                        <div className="w-14 h-14 rounded-2xl bg-black/[0.03] border border-ink/10 flex items-center justify-center mb-4">{card.emoji}</div>
                        <p className={`font-sans font-black tracking-widest text-2xl ${card.textAccent} mb-1`}>{card.title}</p>
                        <p className="font-sans font-bold text-[11px] text-smoke mb-4 uppercase tracking-widest">{card.subtitle}</p>
                        <p className="font-sans font-medium text-[13px] text-smoke/80 leading-relaxed mb-6">{card.desc}</p>
                        <ul className="space-y-2">
                            {card.bullets.map(b => (
                                <li key={b} className="flex items-center gap-2 font-sans font-bold text-xs text-smoke">
                                    <span className={card.textAccent}>→</span> {b}
                                </li>
                            ))}
                        </ul>
                        <div className={`mt-6 pt-4 border-t border-ink/10 font-sans font-bold text-xs uppercase tracking-widest ${card.textAccent} group-hover:translate-x-1 transition-transform`}>
                            Continue as {card.title} →
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
}
