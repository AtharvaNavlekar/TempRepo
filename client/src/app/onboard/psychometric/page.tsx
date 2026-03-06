"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const QUESTIONS = [
    { id: "q1", title: "Project Scope Alignment", left: { label: "Perfect Architecture", desc: "If it's not scalable, it's not ready." }, right: { label: "Ship It Yesterday", desc: "Move fast. Learn faster." } },
    { id: "q2", title: "Communication Style", left: { label: "Async Written Log", desc: "If it's not documented, it didn't happen." }, right: { label: "Live Voice Syncs", desc: "Let's hop on a 5-min huddle." } },
    { id: "q3", title: "Failure Handling", left: { label: "Deep Post-Mortem", desc: "Analyze the root cause matrix." }, right: { label: "Burn It & Rebuild", desc: "Wipe the slate and start fresh." } },
];

export default function PsychometricPage() {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [, setAnswers] = useState<Record<string, "left" | "right">>({});
    const [isFinishing, setIsFinishing] = useState(false);

    const handleChoice = (choice: "left" | "right") => {
        setAnswers(prev => ({ ...prev, [QUESTIONS[currentIndex].id]: choice }));
        if (currentIndex < QUESTIONS.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            setIsFinishing(true);
            setTimeout(() => { router.push("/onboard/seed"); }, 1500);
        }
    };

    const active = QUESTIONS[currentIndex];

    return (
        <div className="luxury-page" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontFamily: "'Playfair Display',serif", fontSize: "clamp(20rem,30vw,30rem)", fontWeight: 400, fontStyle: "italic", color: "rgba(201,163,83,.04)", pointerEvents: "none", userSelect: "none" }}>
                0{currentIndex + 1}
            </div>

            <div style={{ width: "100%", maxWidth: 900, zIndex: 10 }}>
                <div style={{ textAlign: "center", marginBottom: 48 }}>
                    <p className="luxury-overline" style={{ marginBottom: 16 }}>Step 2 · Work Preferences</p>
                    <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 12 }}>
                        {QUESTIONS.map((_, i) => (
                            <div key={i} style={{
                                height: 3, borderRadius: 9999, transition: "all .3s",
                                width: i === currentIndex ? 48 : 24,
                                background: i < currentIndex ? "rgba(201,163,83,.5)" : i === currentIndex ? "#C9A353" : "rgba(13,13,13,.1)"
                            }} />
                        ))}
                    </div>
                </div>

                <div style={{ minHeight: 350, position: "relative" }}>
                    <AnimatePresence mode="wait">
                        {!isFinishing ? (
                            <motion.div key={currentIndex}
                                initial={{ opacity: 0, scale: 0.95, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
                                transition={{ type: "spring", bounce: 0.3 }}
                                style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.5rem,4vw,2.5rem)", fontWeight: 400, color: "var(--ink)", textAlign: "center", marginBottom: 40 }}>
                                    {active.title}
                                </h2>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, width: "100%" }}>
                                    {(["left", "right"] as const).map((side, idx) => {
                                        const option = active[side];
                                        return (
                                            <div key={side} className="luxury-card" onClick={() => handleChoice(side)}
                                                style={{ padding: 36, textAlign: "center", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 200, transition: "border-color .3s, transform .3s" }}
                                                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(201,163,83,.4)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                                                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(13,13,13,.06)"; e.currentTarget.style.transform = "none"; }}
                                            >
                                                <div style={{ width: 48, height: 48, borderRadius: "50%", border: "1px solid rgba(201,163,83,.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                                                    <span style={{ fontFamily: "'Playfair Display',serif", fontSize: ".85rem", fontStyle: "italic", color: "rgba(13,13,13,.3)" }}>0{idx + 1}</span>
                                                </div>
                                                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", fontWeight: 400, color: "#C9A353", marginBottom: 8 }}>{option.label}</h3>
                                                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "var(--smoke)", fontStyle: "italic" }}>&quot;{option.desc}&quot;</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div key="finishing" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", minHeight: 300 }}>
                                <div style={{ width: 80, height: 80, borderRadius: "50%", border: "2px dashed rgba(201,163,83,.3)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, animation: "spin 3s linear infinite" }}>
                                    <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(201,163,83,.15)" }} />
                                </div>
                                <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", fontWeight: 400, color: "var(--ink)", marginBottom: 8 }}>Saving Preferences</h2>
                                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#C9A353" }}>Generating your profile...</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
