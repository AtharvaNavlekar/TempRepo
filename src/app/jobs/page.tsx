"use client";

import { motion } from "framer-motion";
import { BentoCard, ForgeButton, PulseTag, GlitchText, ShipScoreCounter } from "@/components/forge";
import Link from "next/link";

const BUILDERS = [
    { name: "0xNeo", title: "Full-Stack Architect", score: 12400, rate: "$120/hr", available: true, skills: ["React", "Rust", "Systems Design", "WebAssembly"], status: "live" as const, ships: 24, streak: 14, bio: "Building distributed systems since 2020. Shipped 24 projects across DeFi, identity, and developer tools.", guilds: ["React Guild", "Rust Guild"] },
    { name: "DesignSensei", title: "Product Designer", score: 11200, rate: "$100/hr", available: true, skills: ["Figma", "Design Systems", "User Research", "Prototyping"], status: "shipped" as const, ships: 19, streak: 12, bio: "Design lead with 10 years in product. Focus on design systems and user research methodology.", guilds: ["Design Guild"] },
    { name: "RustNinja", title: "Systems Engineer", score: 8900, rate: "$150/hr", available: false, skills: ["Rust", "C++", "WASM", "Performance", "Compilers"], status: "building" as const, ships: 14, streak: 6, bio: "Low-level systems builder. Compiler design, game engines, and high-performance computing.", guilds: ["Rust Guild", "Maker Guild"] },
    { name: "ChefMika", title: "Culinary Engineer", score: 4200, rate: "$80/hr", available: true, skills: ["Recipe Dev", "Cost Analysis", "Nutrition", "Food Science"], status: "live" as const, ships: 8, streak: 3, bio: "Michelin-trained chef turned food-tech builder. Merging gastronomy with AI.", guilds: ["Culinary Guild"] },
    { name: "WriterAsh", title: "Technical Writer", score: 7200, rate: "$90/hr", available: true, skills: ["Documentation", "API Docs", "Tutorials", "Content Strategy"], status: "live" as const, ships: 18, streak: 7, bio: "Making complex systems understandable. 300+ articles published across dev publications.", guilds: ["Writing Guild"] },
    { name: "MakerJoe", title: "Hardware Engineer", score: 7800, rate: "$110/hr", available: false, skills: ["PCB Design", "3D Printing", "Arduino", "IoT"], status: "building" as const, ships: 11, streak: 5, bio: "Physical prototyping specialist. From concept to manufactured product in 90 days.", guilds: ["Maker Guild"] },
];

export default function JobsPage() {
    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans">
            <main className="max-w-6xl mx-auto px-6 py-32">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h1 className="font-clash font-bold text-6xl mb-3"><GlitchText text="REVERSE JOB BOARD" /></h1>
                            <p className="font-mono text-white/50 max-w-lg">Builders list their availability. Companies come to them. No cold outreach. No résumés. Just Ship Score.</p>
                        </div>
                        <Link href="/bounties"><ForgeButton variant="secondary">← BOUNTY MARKETPLACE</ForgeButton></Link>
                    </div>

                    {/* How it works */}
                    <div className="grid grid-cols-3 gap-4 mb-12">
                        {[
                            { step: "01", label: "Ship projects", desc: "Build your Ship Score through real work" },
                            { step: "02", label: "Set availability", desc: "Toggle your status and set your rate" },
                            { step: "03", label: "Get hired", desc: "Companies reach out based on your proof of work" },
                        ].map(s => (
                            <BentoCard key={s.step} className="p-5 text-center">
                                <span className="font-clash font-bold text-3xl text-lime/30">{s.step}</span>
                                <h4 className="font-clash font-bold mt-2">{s.label}</h4>
                                <p className="font-mono text-[10px] text-white/30 mt-1">{s.desc}</p>
                            </BentoCard>
                        ))}
                    </div>
                </motion.div>

                {/* Builder Cards */}
                <div className="space-y-6">
                    {BUILDERS.map((b, i) => (
                        <motion.div key={b.name} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                            <BentoCard className={`p-8 hover:border-lime/30 transition-all ${!b.available ? "opacity-60" : ""}`}>
                                <div className="flex flex-col md:flex-row md:items-start gap-6">
                                    {/* Avatar + Status */}
                                    <div className="flex-shrink-0">
                                        <div className="relative">
                                            <div className="w-20 h-20 bg-lime/10 border-2 border-lime/20 rounded-full flex items-center justify-center font-clash font-bold text-3xl text-lime">{b.name[0]}</div>
                                            {b.available && <div className="w-4 h-4 bg-lime rounded-full absolute -bottom-0.5 -right-0.5 border-2 border-obsidian" />}
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="font-clash font-bold text-2xl">{b.name}</h3>
                                            <PulseTag status={b.available ? "live" : "building"} label={b.available ? "AVAILABLE" : "BUSY"} />
                                        </div>
                                        <p className="font-mono text-sm text-white/40 mb-2">{b.title}</p>
                                        <p className="font-mono text-xs text-white/50 mb-4 max-w-xl">{b.bio}</p>

                                        {/* Skills */}
                                        <div className="flex flex-wrap gap-1.5 mb-3">
                                            {b.skills.map(s => <span key={s} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-bento-sm font-mono text-[10px] text-white/50">{s}</span>)}
                                        </div>

                                        {/* Guilds */}
                                        <div className="flex gap-2">
                                            {b.guilds.map(g => <span key={g} className="font-mono text-[10px] text-cyber">{g}</span>)}
                                        </div>
                                    </div>

                                    {/* Stats + Rate */}
                                    <div className="flex-shrink-0 flex flex-col items-end gap-3">
                                        <div className="text-right">
                                            <ShipScoreCounter value={b.score} size="sm" />
                                        </div>
                                        <div className="grid grid-cols-3 gap-3 text-center">
                                            <div className="p-2 bg-white/5 rounded"><p className="font-clash font-bold">{b.ships}</p><p className="font-mono text-[9px] text-white/30">SHIPS</p></div>
                                            <div className="p-2 bg-white/5 rounded"><p className="font-clash font-bold text-lime">{b.streak}d</p><p className="font-mono text-[9px] text-white/30">STREAK</p></div>
                                            <div className="p-2 bg-white/5 rounded"><p className="font-clash font-bold">{b.rate}</p><p className="font-mono text-[9px] text-white/30">RATE</p></div>
                                        </div>
                                        {b.available && <ForgeButton variant="primary" size="sm">CONTACT</ForgeButton>}
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
