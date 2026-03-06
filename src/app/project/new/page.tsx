"use client";

import { motion } from "framer-motion";
import { BentoCard, ForgeButton, GlitchText, PulseTag } from "@/components/forge";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { IconRocket } from "@/components/icons";
const TEMPLATES = [
    { key: "code-lab", label: "Code Lab", icon: "IconShipScore", desc: "Full-stack development with CI/CD pipelines" },
    { key: "design-studio", label: "Design Studio", icon: "IconPalette", desc: "Visual design with Figma sync & handoff tools" },
    { key: "hardware-workshop", label: "Hardware Workshop", icon: "IconWrench", desc: "BOM tracking, PCB review, 3D print queue" },
    { key: "culinary-lab", label: "Culinary Lab", icon: "IconFlame", desc: "Recipe development & ingredient costing" },
    { key: "music-studio", label: "Music Studio", icon: "IconMusic", desc: "DAW sync, stem tracking, distribution" },
    { key: "writing-room", label: "Writing Room", icon: "IconPencil", desc: "Version control & editorial workflow" },
    { key: "open-source", label: "Open Source", icon: "IconGlobe", desc: "Contributor management & release pipeline" },
    { key: "startup-sprint", label: "Startup Sprint", icon: "IconRocket", desc: "Pitch deck, financial model, investor CRM" },
    { key: "hackathon", label: "Hackathon", icon: "⏱", desc: "Countdown timer + submission deadline" },
    { key: "research", label: "Research", icon: "IconFlame", desc: "Literature DB, experiments, paper drafting" },
    { key: "community", label: "Community", icon: "IconUsers", desc: "Event management & content calendar" },
    { key: "freelance", label: "Freelance", icon: "IconHire", desc: "Scope builder, milestone billing, client portal" },
];

const VISIBILITY_OPTIONS = ["PUBLIC", "GUILD-ONLY", "INVITE-ONLY", "PRIVATE"];

export default function NewProjectPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [template, setTemplate] = useState("code-lab");
    const [visibility, setVisibility] = useState("PUBLIC");
    const [stake, setStake] = useState(100);
    const [duration, setDuration] = useState(14);
    const [maxBuilders, setMaxBuilders] = useState(5);

    const handleSubmit = () => { router.push("/project/proj-new"); };

    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans">
            <main className="max-w-4xl mx-auto px-6 py-32">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="font-clash font-bold text-6xl mb-2"><GlitchText text="CREATE WAR ROOM" /></h1>
                    <p className="font-mono text-white/50 mb-12">Draft a new project. Stake your reputation. Recruit builders.</p>

                    {/* Step Indicator */}
                    <div className="flex gap-2 mb-12">
                        {[1, 2, 3].map(s => (
                            <div key={s} className={`flex-1 h-1.5 rounded-full transition-all ${s <= step ? "bg-lime" : "bg-white/10"}`} />
                        ))}
                    </div>
                </motion.div>

                {/* Step 1: Basics */}
                {step === 1 && (
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                        <BentoCard className="p-8 space-y-6">
                            <h2 className="font-clash font-bold text-2xl">Project Details</h2>
                            <div>
                                <label className="font-mono text-xs text-white/50 uppercase tracking-widest mb-2 block">Project Name *</label>
                                <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Give it a name that means something..." className="w-full bg-black/60 border border-white/10 rounded-bento-sm p-4 font-mono text-white focus:border-lime outline-none text-lg" />
                            </div>
                            <div>
                                <label className="font-mono text-xs text-white/50 uppercase tracking-widest mb-2 block">Description *</label>
                                <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="What are you building, why does it matter, and what does success look like?"
                                    className="w-full h-32 bg-black/60 border border-white/10 rounded-bento-sm p-4 font-mono text-white focus:border-lime outline-none resize-none" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="font-mono text-xs text-white/50 uppercase tracking-widest mb-2 block">Sprint Duration (Days)</label>
                                    <input type="number" min={7} max={90} value={duration} onChange={e => setDuration(Number(e.target.value))} className="w-full bg-black/60 border border-white/10 rounded-bento-sm p-4 font-mono text-white focus:border-lime outline-none" />
                                </div>
                                <div>
                                    <label className="font-mono text-xs text-white/50 uppercase tracking-widest mb-2 block">Max Builders</label>
                                    <input type="number" min={1} max={20} value={maxBuilders} onChange={e => setMaxBuilders(Number(e.target.value))} className="w-full bg-black/60 border border-white/10 rounded-bento-sm p-4 font-mono text-white focus:border-lime outline-none" />
                                </div>
                            </div>
                            <div>
                                <label className="font-mono text-xs text-white/50 uppercase tracking-widest mb-2 block">Visibility</label>
                                <div className="flex gap-2">
                                    {VISIBILITY_OPTIONS.map(v => (
                                        <button key={v} onClick={() => setVisibility(v)} className={`px-4 py-2 font-mono text-xs rounded-bento-sm border transition-all ${visibility === v ? "bg-lime/10 border-lime/40 text-lime" : "border-white/10 text-white/40 hover:text-white"}`}>{v}</button>
                                    ))}
                                </div>
                            </div>
                        </BentoCard>
                        <div className="text-right">
                            <ForgeButton variant="primary" onClick={() => setStep(2)}>NEXT: CHOOSE TEMPLATE →</ForgeButton>
                        </div>
                    </motion.div>
                )}

                {/* Step 2: Template */}
                {step === 2 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                        <h2 className="font-clash font-bold text-2xl mb-6">Choose War Room Template</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {TEMPLATES.map(t => (
                                <motion.button key={t.key} whileTap={{ scale: 0.97 }} onClick={() => setTemplate(t.key)}>
                                    <BentoCard className={`p-5 text-left h-full transition-all ${template === t.key ? "border-lime/50 bg-lime/5 shadow-glow" : "hover:border-white/20"}`}>
                                        <div className="text-2xl mb-2">{t.icon}</div>
                                        <h3 className="font-clash font-bold text-sm mb-1">{t.label}</h3>
                                        <p className="font-mono text-[10px] text-white/40">{t.desc}</p>
                                    </BentoCard>
                                </motion.button>
                            ))}
                        </div>
                        <div className="flex justify-between">
                            <ForgeButton variant="ghost" onClick={() => setStep(1)}>← BACK</ForgeButton>
                            <ForgeButton variant="primary" onClick={() => setStep(3)}>NEXT: STAKE & LAUNCH →</ForgeButton>
                        </div>
                    </motion.div>
                )}

                {/* Step 3: Stake & Launch */}
                {step === 3 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                        <BentoCard className="p-8 space-y-6">
                            <h2 className="font-clash font-bold text-2xl">Stake Your Reputation</h2>
                            <p className="font-mono text-sm text-white/40">Staking points signals commitment. Higher stakes attract better builders.</p>
                            <div>
                                <label className="font-mono text-xs text-white/50 uppercase tracking-widest mb-2 block">Stake Amount (Ship Score Points)</label>
                                <input type="range" min={50} max={1000} step={50} value={stake} onChange={e => setStake(Number(e.target.value))} className="w-full accent-lime" />
                                <div className="flex justify-between font-mono text-xs text-white/30 mt-1"><span>50 PTS</span><span className="text-lime font-bold text-lg">{stake} PTS</span><span>1000 PTS</span></div>
                            </div>
                        </BentoCard>

                        <BentoCard className="p-8 bg-gradient-to-br from-lime/5 to-transparent border-lime/20">
                            <h3 className="font-mono text-xs uppercase tracking-widest text-lime/70 mb-4">Summary Preview</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div><p className="font-mono text-xs text-white/30">NAME</p><p className="font-clash font-bold">{title || "Untitled Project"}</p></div>
                                <div><p className="font-mono text-xs text-white/30">TEMPLATE</p><p className="font-clash font-bold">{TEMPLATES.find(t => t.key === template)?.icon} {TEMPLATES.find(t => t.key === template)?.label}</p></div>
                                <div><p className="font-mono text-xs text-white/30">DURATION</p><p className="font-clash font-bold">{duration} days</p></div>
                                <div><p className="font-mono text-xs text-white/30">MAX BUILDERS</p><p className="font-clash font-bold">{maxBuilders}</p></div>
                                <div><p className="font-mono text-xs text-white/30">VISIBILITY</p><p className="font-clash font-bold">{visibility}</p></div>
                                <div><p className="font-mono text-xs text-white/30">STAKED</p><p className="font-clash font-bold text-lime">{stake} PTS</p></div>
                            </div>
                        </BentoCard>

                        <div className="flex justify-between">
                            <ForgeButton variant="ghost" onClick={() => setStep(2)}>← BACK</ForgeButton>
                            <ForgeButton variant="primary" onClick={handleSubmit} className="text-lg px-12 py-5"><IconRocket className="w-4 h-4 inline" /> LAUNCH WAR ROOM</ForgeButton>
                        </div>
                    </motion.div>
                )}
            </main>
        </div>
    );
}
