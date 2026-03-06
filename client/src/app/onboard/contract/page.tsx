"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useCollabRiseStore } from "@/store/store";
import { Shield, TrendingUp, TrendingDown } from "lucide-react";

export default function CommitmentContractPage() {
    const router = useRouter();
    const shipScore = useCollabRiseStore(state => state.shipScore);
    const [stakedAmount, setStakedAmount] = useState(0);
    const maxStake = Math.floor(shipScore * 0.2);
    const pct = maxStake > 0 ? (stakedAmount / maxStake) * 100 : 0;

    return (
        <div className="luxury-page" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
            <div style={{ width: "100%", maxWidth: 860, position: "relative", zIndex: 10 }}>
                <div style={{ textAlign: "center", marginBottom: 48 }}>
                    <p className="luxury-overline" style={{ marginBottom: 12, color: "rgba(180,60,60,.6)" }}>Phase 4 · Skin In The Game</p>
                    <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 400, color: "var(--ink)", marginBottom: 12 }}>
                        The Commitment <em className="gold-shimmer-text">Contract</em>
                    </h1>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "var(--smoke)", lineHeight: 1.8, maxWidth: 520, margin: "0 auto" }}>
                        Stake a portion of your baseline Ship Score. Ship on time and earn a 1.5× multiplier. Fail and those points are burned permanently.
                    </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                    {/* Left — Score & Slider */}
                    <div className="luxury-card" style={{ padding: 32, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <p className="luxury-overline" style={{ marginBottom: 20 }}>Current Baseline Score</p>
                        <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "3.5rem", fontStyle: "italic", color: "#C9A353", lineHeight: 1, marginBottom: 32 }}>{shipScore.toLocaleString()}</p>
                        <div style={{ width: "100%" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "rgba(13,13,13,.35)" }}>0 pts</span>
                                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 600, color: "#C9A353" }}>Max {maxStake} pts</span>
                            </div>
                            <input type="range" min="0" max={maxStake} value={stakedAmount}
                                onChange={e => setStakedAmount(parseInt(e.target.value))}
                                style={{
                                    width: "100%", height: 6, borderRadius: 9999, appearance: "none", outline: "none", cursor: "pointer",
                                    background: `linear-gradient(to right, #C9A353 0%, #C9A353 ${pct}%, rgba(13,13,13,.08) ${pct}%, rgba(13,13,13,.08) 100%)`
                                }}
                            />
                            <p style={{ textAlign: "center", marginTop: 16, fontFamily: "'Playfair Display',serif", fontSize: "1.8rem", fontStyle: "italic", color: "var(--ink)" }}>{stakedAmount} <span style={{ fontSize: ".9rem", color: "var(--smoke)" }}>pts staked</span></p>
                        </div>
                    </div>

                    {/* Right — Risk Assessment */}
                    <div className="luxury-card" style={{ padding: 32, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <div style={{ position: "absolute", inset: "0 0 auto 0", bottom: 0, height: `${pct}%`, background: "rgba(180,60,60,.04)", transition: "height .3s", opacity: stakedAmount > 0 ? 1 : 0, pointerEvents: "none" }} />
                        <div style={{ position: "relative", zIndex: 1 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
                                <Shield size={18} style={{ color: "#C9A353" }} />
                                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", fontWeight: 400, color: "var(--ink)" }}>Risk Assessment</h3>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 16px", background: "rgba(13,13,13,.03)", borderRadius: 10, border: "1px solid rgba(13,13,13,.06)" }}>
                                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "var(--smoke)" }}>Staked Points</span>
                                    <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", fontWeight: 500, color: "var(--ink)" }}>{stakedAmount}</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "rgba(91,138,111,.06)", borderRadius: 10, border: "1px solid rgba(91,138,111,.15)" }}>
                                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#5B8A6F", display: "flex", alignItems: "center", gap: 6 }}><TrendingUp size={14} /> Success (1.5×)</span>
                                    <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", color: "#5B8A6F", fontWeight: 500 }}>+{Math.floor(stakedAmount * 1.5)}</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "rgba(180,60,60,.05)", borderRadius: 10, border: "1px solid rgba(180,60,60,.12)" }}>
                                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "rgba(180,60,60,.7)", display: "flex", alignItems: "center", gap: 6 }}><TrendingDown size={14} /> Failure (Burn)</span>
                                    <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", color: "rgba(180,60,60,.8)", fontWeight: 500 }}>-{stakedAmount}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: 36, display: "flex", justifyContent: "center" }}>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                        <button onClick={() => router.push("/onboard/guilds")}
                            className={stakedAmount > 0 ? "btn-primary" : "btn-secondary"}
                            style={{ padding: "16px 48px", fontSize: 13 }}>
                            {stakedAmount > 0 ? "I Accept the Risk →" : "Skip Without Staking →"}
                        </button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
