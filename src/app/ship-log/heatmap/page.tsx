"use client";

import { motion } from "framer-motion";
import { BentoCard, ForgeButton } from "@/components/forge";
const SKILLS = [
    { name: "React", level: 95, category: "Frontend" },
    { name: "TypeScript", level: 92, category: "Frontend" },
    { name: "Node.js", level: 85, category: "Backend" },
    { name: "Rust", level: 78, category: "Systems" },
    { name: "Three.js", level: 72, category: "Frontend" },
    { name: "PostgreSQL", level: 88, category: "Backend" },
    { name: "Docker", level: 70, category: "DevOps" },
    { name: "Figma", level: 65, category: "Design" },
    { name: "WebAssembly", level: 60, category: "Systems" },
    { name: "GraphQL", level: 80, category: "Backend" },
    { name: "Solidity", level: 55, category: "Web3" },
    { name: "Go", level: 68, category: "Systems" },
];

const CATEGORY_COLORS: Record<string, string> = {
    Frontend: "bg-lime",
    Backend: "bg-cyber",
    Systems: "bg-acid",
    DevOps: "bg-yellow-500",
    Design: "bg-pink-500",
    Web3: "bg-blue-500",
};

const CATEGORY_TEXT_COLORS: Record<string, string> = {
    Frontend: "text-lime",
    Backend: "text-cyber",
    Systems: "text-acid",
    DevOps: "text-yellow-500",
    Design: "text-pink-500",
    Web3: "text-blue-500",
};

export default function SkillHeatmapPage() {
    const categories = [...new Set(SKILLS.map(s => s.category))];

    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans">

            <main className="max-w-6xl mx-auto px-6 py-32">
                <div className="mb-12">
                    <h1 className="font-clash font-bold text-5xl mb-4">Skill Heatmap</h1>
                    <p className="font-mono text-white/50 max-w-xl">
                        Your expertise, verified through shipped artifacts. Each bar represents extraction confidence from your DNA history.
                    </p>
                </div>

                {/* Category Legend */}
                <div className="flex flex-wrap gap-4 mb-12">
                    {categories.map(cat => (
                        <div key={cat} className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${CATEGORY_COLORS[cat]}`} />
                            <span className="font-mono text-xs text-white/60 uppercase tracking-widest">{cat}</span>
                        </div>
                    ))}
                </div>

                <BentoCard className="p-8">
                    <div className="space-y-5">
                        {SKILLS.sort((a, b) => b.level - a.level).map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="group"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="font-mono text-sm w-28 text-white/80 group-hover:text-white transition-colors">{skill.name}</span>
                                    <div className="flex-1 h-8 bg-white/5 rounded-sm overflow-hidden relative border border-white/5">
                                        <motion.div
                                            className={`h-full ${CATEGORY_COLORS[skill.category]} rounded-sm`}
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${skill.level}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.8, delay: index * 0.05, ease: "easeOut" }}
                                            style={{ opacity: 0.7 + (skill.level / 400) }}
                                        />
                                        <div className="absolute inset-y-0 right-3 flex items-center">
                                            <span className={`font-clash font-bold text-sm ${CATEGORY_TEXT_COLORS[skill.category]} opacity-0 group-hover:opacity-100 transition-opacity`}>
                                                {skill.level}%
                                            </span>
                                        </div>
                                    </div>
                                    <span className="font-mono text-[10px] text-white/30 w-16 text-right uppercase">{skill.category}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </BentoCard>

                <div className="mt-12 text-center">
                    <ForgeButton variant="secondary">EXPORT AS PDF</ForgeButton>
                </div>
            </main>
        </div>
    );
}
