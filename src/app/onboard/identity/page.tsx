"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { BentoCard, GlitchText, PulseTag } from "@/components/forge";

const IDENTITIES = [
    {
        id: "tech",
        label: "ENGINEER",
        color: "#CCFF00", // Lime
        desc: "Code is law. Algorithms and architecture.",
        code: "sudo make ship"
    },
    {
        id: "creative",
        label: "CREATIVE",
        color: "#FF00FF", // Acid Pink
        desc: "Pixels, vectors, and sonic waves.",
        code: "export const vibe = 'immaculate';"
    },
    {
        id: "business",
        label: "HUSTLER",
        color: "#8A2BE2", // Cyber Purple
        desc: "Operations, capital, and global domination.",
        code: "revenue.scale(10x);"
    },
    {
        id: "physical",
        label: "CRAFTSMAN",
        color: "#FFFFFF", // White
        desc: "Atoms over bits. Hardware, fashion, mechanics.",
        code: "forge.hammer(steel);"
    }
];

export default function IdentitySelectionPage() {
    const router = useRouter();
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const handleSelect = (id: string) => {
        setSelectedId(id);
        setTimeout(() => {
            router.push(`/onboard/scraper?role=${id}`);
        }, 1200);
    };

    return (
        <div className="min-h-screen bg-obsidian flex flex-col p-6 md:p-12 relative overflow-hidden">
            {/* Dynamic Background */}
            <div
                className="absolute inset-0 transition-colors duration-700 ease-out opacity-10 pointer-events-none"
                style={{ backgroundColor: hoveredId ? IDENTITIES.find(i => i.id === hoveredId)?.color : 'transparent' }}
            />

            <div className="flex-grow flex flex-col max-w-7xl mx-auto w-full relative z-10 pt-10">

                <div className="mb-12">
                    <p className="font-mono text-white/50 text-sm tracking-widest uppercase mb-4">Step 1 // Choose Your Path</p>
                    <GlitchText text="SELECT YOUR" className="text-4xl md:text-6xl font-black text-white" speed="slow" />
                    <GlitchText text="PRIMARY ROLE." className="text-4xl md:text-6xl font-black text-white" speed="slow" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow pb-12">
                    <AnimatePresence>
                        {IDENTITIES.map((identity, index) => {
                            const isSelected = selectedId === identity.id;
                            const isFadingOut = selectedId !== null && selectedId !== identity.id;

                            if (isFadingOut) return null;

                            return (
                                <motion.div
                                    key={identity.id}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className={isSelected ? "md:col-span-2 h-full" : "h-full"}
                                >
                                    <BentoCard
                                        className={`h-full min-h-[250px] cursor-pointer transition-all duration-500 flex flex-col justify-between group overflow-hidden relative
                      ${isSelected ? 'scale-[1.02] bg-white/5' : 'hover:scale-[1.02]'}
                    `}
                                        style={{ borderColor: hoveredId === identity.id || isSelected ? identity.color : 'rgba(255,255,255,0.1)' }}
                                        onMouseEnter={() => setHoveredId(identity.id)}
                                        onMouseLeave={() => setHoveredId(null)}
                                        onClick={() => handleSelect(identity.id)}
                                    >
                                        {/* Hover Glow Component */}
                                        <div
                                            className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                                            style={{ background: `radial-gradient(circle at center, ${identity.color} 0%, transparent 70%)` }}
                                        />

                                        <div className="relative z-10">
                                            <div className="flex justify-between items-start mb-6">
                                                <h2 className="font-clash font-black text-4xl group-hover:-translate-y-1 transition-transform" style={{ color: hoveredId === identity.id || isSelected ? identity.color : 'white' }}>
                                                    {identity.label}
                                                </h2>
                                                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <span className="text-xl leading-none font-light" style={{ color: identity.color }}>↗</span>
                                                </div>
                                            </div>
                                            <p className="font-mono text-white/50 group-hover:text-white/80 transition-colors">
                                                {identity.desc}
                                            </p>
                                        </div>

                                        <div className="relative z-10 mt-auto pt-8">
                                            <div className="bg-black/50 p-4 rounded border border-white/5 font-mono text-xs text-white/40">
                                                <span className="text-lime">{"> "}</span>
                                                <span style={{ color: hoveredId === identity.id ? identity.color : '' }} className="transition-colors">{identity.code}</span>
                                            </div>
                                        </div>

                                        {isSelected && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-20"
                                            >
                                                <PulseTag status="live" label="CONFIRMING ROLE" className="mb-4" />
                                                <h3 className="font-clash font-bold text-3xl" style={{ color: identity.color }}>{identity.label} SELECTED</h3>
                                            </motion.div>
                                        )}
                                    </BentoCard>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

            </div>
        </div>
    );
}
