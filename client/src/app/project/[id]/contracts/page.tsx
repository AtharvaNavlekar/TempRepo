"use client";
import { motion } from "framer-motion";
const CONTRACTS = [
    { builder: "0xNeo", hoursCommitted: 40, hoursLogged: 32, staked: 500, risk: "Low" },
    { builder: "0xAlice", hoursCommitted: 30, hoursLogged: 28, staked: 300, risk: "Low" },
    { builder: "DevMarcus", hoursCommitted: 25, hoursLogged: 10, staked: 400, risk: "High" },
];
const RISK_C: Record<string, string> = { Low: "#5B8A6F", Medium: "#C9A353", High: "rgba(180,60,60,.7)" };
export default function ContractsHubPage() {
    return (
        <div className="luxury-page">
            <div style={{ background: "var(--parchment)", padding: "80px 0 48px", borderBottom: "1px solid rgba(13,13,13,.08)" }}>
                <div className="luxury-container"><p className="luxury-overline" style={{ marginBottom: 12 }}>Venture · Contracts</p><h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 400, color: "var(--ink)" }}>Commitment <em className="gold-shimmer-text">Contracts</em></h1><p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "var(--smoke)", marginTop: 8 }}>Track hours, stakes, and commitment risk for every founder.</p></div>
            </div>
            <div className="luxury-container" style={{ paddingTop: 40, paddingBottom: 80 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {CONTRACTS.map((c, i) => (
                        <motion.div key={c.builder} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                            <div className="luxury-card" style={{ padding: 24, display: "flex", alignItems: "center", gap: 20 }}>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 15, color: "var(--ink)", marginBottom: 6 }}>{c.builder}</h3>
                                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--smoke)", marginBottom: 8 }}>{c.hoursLogged}h / {c.hoursCommitted}h logged</p>
                                    <div style={{ height: 4, background: "rgba(13,13,13,.06)", borderRadius: 9999, overflow: "hidden" }}>
                                        <div style={{ height: "100%", width: `${(c.hoursLogged / c.hoursCommitted) * 100}%`, background: "#C9A353", borderRadius: 9999 }} />
                                    </div>
                                </div>
                                <div style={{ textAlign: "right" }}>
                                    <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", fontStyle: "italic", color: "#C9A353" }}>{c.staked}</p>
                                    <p className="luxury-overline">Staked</p>
                                </div>
                                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 600, color: RISK_C[c.risk] }}>{c.risk} Risk</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
