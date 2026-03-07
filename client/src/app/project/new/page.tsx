"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Rocket, Zap, Palette, Wrench, Flame, Music, PenTool, Globe, Timer, Microscope, Users, Briefcase } from "lucide-react";

const TEMPLATES = [
    { key: "code-lab", label: "Code Lab", icon: <Zap size={24} />, desc: "Full-stack development with CI/CD" },
    { key: "design-studio", label: "Design Studio", icon: <Palette size={24} />, desc: "Visual design with handoff tools" },
    { key: "hardware", label: "Hardware Workshop", icon: <Wrench size={24} />, desc: "BOM tracking, PCB, 3D print" },
    { key: "culinary", label: "Culinary Lab", icon: <Flame size={24} />, desc: "Recipe dev & ingredient costing" },
    { key: "music", label: "Music Studio", icon: <Music size={24} />, desc: "DAW sync, stems, distribution" },
    { key: "writing", label: "Writing Room", icon: <PenTool size={24} />, desc: "Version control & editorial" },
    { key: "open-source", label: "Open Source", icon: <Globe size={24} />, desc: "Contributor management & releases" },
    { key: "startup", label: "Startup Sprint", icon: <Rocket size={24} />, desc: "Pitch deck, financials, CRM" },
    { key: "hackathon", label: "Hackathon", icon: <Timer size={24} />, desc: "Countdown & submission deadline" },
    { key: "research", label: "Research", icon: <Microscope size={24} />, desc: "Literature DB & experiments" },
    { key: "community", label: "Community", icon: <Users size={24} />, desc: "Event management & content" },
    { key: "freelance", label: "Freelance", icon: <Briefcase size={24} />, desc: "Scope builder & milestone billing" },
];
const VISIBILITY_OPTIONS = ["Public", "Guild-Only", "Invite-Only", "Private"];

const inputStyle: React.CSSProperties = {
    width: "100%", padding: "14px 18px", background: "var(--parchment)", border: "1px solid rgba(13,13,13,.1)",
    borderRadius: 12, fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "var(--ink)", outline: "none", transition: "border-color .2s"
};

export default function NewProjectPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [title, setTitle] = useState(""); const [description, setDescription] = useState("");
    const [template, setTemplate] = useState("code-lab"); const [visibility, setVisibility] = useState("Public");
    const [stake, setStake] = useState(100); const [duration, setDuration] = useState(14); const [maxBuilders, setMaxBuilders] = useState(5);

    return (
        <div className="luxury-page">
            <div style={{ background: "var(--parchment)", padding: "80px 0 48px", borderBottom: "1px solid rgba(13,13,13,.08)" }}>
                <div className="luxury-container" style={{ maxWidth: 800, margin: "0 auto" }}>
                    <p className="luxury-overline" style={{ marginBottom: 12 }}>New Venture</p>
                    <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 400, color: "var(--ink)", marginBottom: 12 }}>
                        Create <em className="gold-shimmer-text">Venture</em>
                    </h1>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "var(--smoke)" }}>Draft a new project. Stake your reputation. Recruit founders.</p>
                    <div style={{ display: "flex", gap: 8, marginTop: 24 }}>
                        {[1, 2, 3].map(s => <div key={s} style={{ flex: 1, height: 3, borderRadius: 9999, background: s <= step ? "#C9A353" : "rgba(13,13,13,.1)", transition: "background .3s" }} />)}
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 16px 80px" }}>
                {step === 1 && (
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <div className="luxury-card" style={{ padding: 36 }}>
                            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.3rem", fontWeight: 400, color: "var(--ink)", marginBottom: 24 }}>Project Details</h2>
                            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                                <div><label className="luxury-overline" style={{ display: "block", marginBottom: 8 }}>Venture Name *</label><input value={title} onChange={e => setTitle(e.target.value)} placeholder="Give it a name that means something..." style={inputStyle} onFocus={e => (e.currentTarget.style.borderColor = "#C9A353")} onBlur={e => (e.currentTarget.style.borderColor = "rgba(13,13,13,.1)")} /></div>
                                <div><label className="luxury-overline" style={{ display: "block", marginBottom: 8 }}>Description *</label><textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="What are you building and why does it matter?" style={{ ...inputStyle, height: 110, resize: "none" as const }} onFocus={e => (e.currentTarget.style.borderColor = "#C9A353")} onBlur={e => (e.currentTarget.style.borderColor = "rgba(13,13,13,.1)")} /></div>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                                    <div><label className="luxury-overline" style={{ display: "block", marginBottom: 8 }}>Sprint Duration (Days)</label><input type="number" min={7} max={90} value={duration} onChange={e => setDuration(Number(e.target.value))} style={inputStyle} onFocus={e => (e.currentTarget.style.borderColor = "#C9A353")} onBlur={e => (e.currentTarget.style.borderColor = "rgba(13,13,13,.1)")} /></div>
                                    <div><label className="luxury-overline" style={{ display: "block", marginBottom: 8 }}>Max Founders</label><input type="number" min={1} max={20} value={maxBuilders} onChange={e => setMaxBuilders(Number(e.target.value))} style={inputStyle} onFocus={e => (e.currentTarget.style.borderColor = "#C9A353")} onBlur={e => (e.currentTarget.style.borderColor = "rgba(13,13,13,.1)")} /></div>
                                </div>
                                <div><label className="luxury-overline" style={{ display: "block", marginBottom: 8 }}>Visibility</label>
                                    <div style={{ display: "flex", gap: 6 }}>{VISIBILITY_OPTIONS.map(v => <button key={v} onClick={() => setVisibility(v)} style={{ padding: "7px 14px", borderRadius: 9999, border: "1px solid", fontSize: 12, fontFamily: "'DM Sans',sans-serif", cursor: "pointer", background: visibility === v ? "var(--ink)" : "transparent", color: visibility === v ? "#fff" : "rgba(13,13,13,.4)", borderColor: visibility === v ? "var(--ink)" : "rgba(13,13,13,.12)", transition: "all .2s" }}>{v}</button>)}</div>
                                </div>
                            </div>
                        </div>
                        <div style={{ marginTop: 20, textAlign: "right" }}><button className="btn-primary" onClick={() => setStep(2)}>Next: Choose Template →</button></div>
                    </motion.div>
                )}
                {step === 2 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.3rem", fontWeight: 400, color: "var(--ink)", marginBottom: 20 }}>Choose Venture Template</h2>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
                            {TEMPLATES.map(t => (
                                <motion.button key={t.key} whileTap={{ scale: 0.97 }} onClick={() => setTemplate(t.key)} style={{ all: "unset", cursor: "pointer" }}>
                                    <div className="luxury-card" style={{ padding: 20, textAlign: "left", borderColor: template === t.key ? "rgba(201,163,83,.5)" : undefined, background: template === t.key ? "rgba(201,163,83,.04)" : "#fff" }}>
                                        <div style={{ marginBottom: 8, color: "var(--ink)" }}>{t.icon}</div>
                                        <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 13, color: "var(--ink)", marginBottom: 4 }}>{t.label}</h3>
                                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "var(--smoke)" }}>{t.desc}</p>
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
                            <button className="btn-secondary" onClick={() => setStep(1)}>← Back</button>
                            <button className="btn-primary" onClick={() => setStep(3)}>Next: Stake & Launch →</button>
                        </div>
                    </motion.div>
                )}
                {step === 3 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                        <div className="luxury-card" style={{ padding: 36, marginBottom: 20 }}>
                            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.3rem", fontWeight: 400, color: "var(--ink)", marginBottom: 8 }}>Stake Your Reputation</h2>
                            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "var(--smoke)", marginBottom: 24 }}>Higher stakes attract better cofounders.</p>
                            <label className="luxury-overline" style={{ display: "block", marginBottom: 8 }}>Stake Amount (Ship Score Points)</label>
                            <input type="range" min={50} max={1000} step={50} value={stake} onChange={e => setStake(Number(e.target.value))} style={{ width: "100%", height: 6, accentColor: "#C9A353" }} />
                            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}><span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "var(--smoke)" }}>50 pts</span><span style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", fontStyle: "italic", color: "#C9A353" }}>{stake} pts</span><span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "var(--smoke)" }}>1000 pts</span></div>
                        </div>
                        <div className="luxury-card" style={{ padding: 36, borderColor: "rgba(201,163,83,.2)", background: "rgba(201,163,83,.03)" }}>
                            <p className="luxury-overline" style={{ marginBottom: 16 }}>Summary Preview</p>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                                {[{ l: "Name", v: title || "Untitled" }, { l: "Template", v: <span style={{ display: "flex", gap: "6px", alignItems: "center" }}>{TEMPLATES.find(t => t.key === template)?.icon} {TEMPLATES.find(t => t.key === template)?.label}</span> }, { l: "Duration", v: `${duration} days` }, { l: "Max Founders", v: String(maxBuilders) }, { l: "Visibility", v: visibility }, { l: "Staked", v: `${stake} pts` }].map(s => (
                                    <div key={s.l}><p className="luxury-overline">{s.l}</p><p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 14, color: "var(--ink)" }}>{s.v}</p></div>
                                ))}
                            </div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
                            <button className="btn-secondary" onClick={() => setStep(2)}>← Back</button>
                            <button className="btn-primary" onClick={() => router.push("/project/proj-new")} style={{ gap: 8 }}><Rocket size={14} /> Launch Venture</button>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
