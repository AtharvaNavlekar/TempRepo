"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

const IDENTITIES = [
    { id: "tech", label: "Engineer", emoji: "⚡", desc: "Code is law. Algorithms and architecture.", tagline: "Build the future, one commit at a time." },
    { id: "creative", label: "Creative", emoji: "🎨", desc: "Pixels, vectors, and sonic waves.", tagline: "Design experiences that move people." },
    { id: "business", label: "Strategist", emoji: "📈", desc: "Operations, capital, and market dominance.", tagline: "Turn vision into revenue." },
    { id: "physical", label: "Craftsman", emoji: "🔧", desc: "Atoms over bits. Hardware, fashion, mechanics.", tagline: "Shape the physical world." },
];

export default function IdentitySelectionPage() {
    const router = useRouter();
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const handleSelect = (id: string) => {
        setSelectedId(id);
        setTimeout(() => { router.push(`/onboard/scraper?role=${id}`); }, 1200);
    };

    return (
        <div className="luxury-page" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", padding: "0 24px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(201,163,83,.04) 1px, transparent 1px)", backgroundSize: "44px 44px", pointerEvents: "none" }} />

            <div style={{ flex: 1, display: "flex", flexDirection: "column", maxWidth: 1100, margin: "0 auto", width: "100%", position: "relative", zIndex: 10, paddingTop: 80 }}>
                <div style={{ marginBottom: 48 }}>
                    <p className="luxury-overline" style={{ marginBottom: 12 }}>Step 1 · Choose Your Path</p>
                    <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 400, color: "var(--ink)", lineHeight: 1.1, letterSpacing: "-.02em" }}>
                        Select your<br /><em className="gold-shimmer-text">primary role</em>
                    </h1>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, flex: 1, paddingBottom: 48 }}>
                    <AnimatePresence>
                        {IDENTITIES.map((identity, index) => {
                            const isSelected = selectedId === identity.id;
                            const isFadingOut = selectedId !== null && selectedId !== identity.id;
                            if (isFadingOut) return null;

                            return (
                                <motion.div key={identity.id}
                                    initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    style={isSelected ? { gridColumn: "1 / -1" } : {}}
                                >
                                    <div className="luxury-card" onClick={() => handleSelect(identity.id)}
                                        onMouseEnter={() => setHoveredId(identity.id)}
                                        onMouseLeave={() => setHoveredId(null)}
                                        style={{
                                            padding: 32, minHeight: 200, cursor: "pointer", position: "relative", overflow: "hidden",
                                            display: "flex", flexDirection: "column", justifyContent: "space-between",
                                            borderColor: hoveredId === identity.id ? "rgba(201,163,83,.4)" : undefined,
                                            transition: "border-color .3s, transform .3s",
                                            transform: hoveredId === identity.id ? "translateY(-2px)" : "none"
                                        }}>
                                        <div className="luxury-card-accent" />
                                        <div>
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                                                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                                    <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(201,163,83,.08)", border: "1px solid rgba(201,163,83,.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>
                                                        {identity.emoji}
                                                    </div>
                                                    <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", fontWeight: 400, color: "var(--ink)" }}>
                                                        {identity.label}
                                                    </h2>
                                                </div>
                                                <div style={{ width: 32, height: 32, borderRadius: "50%", border: "1px solid rgba(13,13,13,.1)", display: "flex", alignItems: "center", justifyContent: "center", opacity: hoveredId === identity.id ? 1 : 0, transition: "opacity .3s" }}>
                                                    <ArrowUpRight size={14} style={{ color: "#C9A353" }} />
                                                </div>
                                            </div>
                                            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "var(--smoke)", lineHeight: 1.7, marginBottom: 8 }}>{identity.desc}</p>
                                            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontStyle: "italic", color: "rgba(201,163,83,.7)" }}>{identity.tagline}</p>
                                        </div>

                                        {isSelected && (
                                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                                style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,.92)", backdropFilter: "blur(8px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 20 }}>
                                                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", background: "rgba(91,138,111,.1)", border: "1px solid rgba(91,138,111,.2)", borderRadius: 9999, marginBottom: 16 }}>
                                                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#5B8A6F" }} />
                                                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", color: "#5B8A6F" }}>Confirmed</span>
                                                </div>
                                                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", fontWeight: 400, color: "#C9A353" }}>{identity.label} Selected</h3>
                                            </motion.div>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
