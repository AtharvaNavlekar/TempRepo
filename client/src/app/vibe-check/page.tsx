"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Gem, CheckCircle2 } from "lucide-react";

export default function VibeCheckPage() {
    return (
        <div className="luxury-page" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 900, height: 600, background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(201,163,83,.12), transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(201,163,83,.07) 1px, transparent 1px)", backgroundSize: "44px 44px", pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(201,163,83,.5), transparent)" }} />

            <div style={{ position: "relative", zIndex: 10, textAlign: "center", maxWidth: 640, padding: "0 32px" }}>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: 36 }}>
                        <div className="hex-shape float-gentle" style={{ width: 56, height: 56, background: "linear-gradient(135deg, rgba(201,163,83,.15), rgba(201,163,83,.05))", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Gem size={22} style={{ color: "#C9A353" }} />
                        </div>
                    </div>
                    <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(201,163,83,.5), transparent)", maxWidth: 120, margin: "0 auto 36px" }} />
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.7rem", fontWeight: 500, letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(13,13,13,.35)", marginBottom: 20 }}>The Proof · of · Work Protocol</p>
                    <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.8rem,7vw,5.5rem)", fontWeight: 400, color: "var(--ink)", lineHeight: 0.95, letterSpacing: "-.03em", marginBottom: 28 }}>
                        Are you ready<br />to <em className="gold-shimmer-text">rise?</em>
                    </h1>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, fontWeight: 300, color: "var(--smoke)", lineHeight: 1.9, maxWidth: 420, margin: "0 auto 40px" }}>
                        This is not a portfolio. This is a living record of what you have actually shipped, built, and broken. Joining CollabRise is a commitment to execution.
                    </p>
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                        <Link href="/onboard/identity" className="btn-primary" style={{ fontSize: "15px", padding: "16px 40px", display: "inline-flex" }}>
                            Begin Your Journey <ArrowRight size={15} strokeWidth={2} />
                        </Link>
                    </motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1 }} style={{ marginTop: 40 }}>
                        <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
                            {["Free to join", "No credit card", "Ships in 60 seconds"].map(item => (
                                <div key={item} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                    <CheckCircle2 size={12} style={{ color: "#5B8A6F" }} />
                                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "rgba(13,13,13,.4)" }}>{item}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(201,163,83,.5), transparent)" }} />
        </div>
    );
}
