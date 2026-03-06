"use client";
import { useState } from "react";
import { Send } from "lucide-react";
const MESSAGES = [
    { user: "0xNeo", msg: "Pushed the ZK verifier module. Ready for review.", time: "2:14 PM", self: false },
    { user: "0xAlice", msg: "Looking at it now — the proof generation is clean.", time: "2:18 PM", self: false },
    { user: "You", msg: "Great work. Let's aim to close Milestone 3 by Friday.", time: "2:20 PM", self: true },
    { user: "DesignYuki", msg: "UI for the identity card component is ready in Figma.", time: "2:25 PM", self: false },
];
export default function Page() {
    const [input, setInput] = useState("");
    return (
        <div className="luxury-page" style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <div style={{ background: "var(--parchment)", padding: "80px 0 24px", borderBottom: "1px solid rgba(13,13,13,.08)" }}>
                <div className="luxury-container"><p className="luxury-overline" style={{ marginBottom: 8 }}>Venture · Chat</p><h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", fontWeight: 400, color: "var(--ink)" }}>Team Chat</h1></div>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "24px 0" }}>
                <div className="luxury-container" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {MESSAGES.map((m, i) => (
                        <div key={i} style={{ display: "flex", justifyContent: m.self ? "flex-end" : "flex-start" }}>
                            <div style={{ maxWidth: "65%", padding: "12px 16px", borderRadius: 14, background: m.self ? "var(--ink)" : "#fff", border: m.self ? "none" : "1px solid rgba(13,13,13,.06)", color: m.self ? "#fff" : "var(--ink)" }}>
                                {!m.self && <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 600, color: "#C9A353", marginBottom: 4 }}>{m.user}</p>}
                                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, lineHeight: 1.6 }}>{m.msg}</p>
                                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: m.self ? "rgba(255,255,255,.4)" : "var(--smoke)", marginTop: 6, textAlign: "right" }}>{m.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ background: "#fff", borderTop: "1px solid rgba(13,13,13,.06)", padding: "16px 0" }}>
                <div className="luxury-container" style={{ display: "flex", gap: 10 }}>
                    <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message..." style={{ flex: 1, padding: "12px 18px", background: "var(--parchment)", border: "1px solid rgba(13,13,13,.08)", borderRadius: 12, fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "var(--ink)", outline: "none" }} />
                    <button className="btn-primary" style={{ padding: "12px 20px" }}><Send size={15} /></button>
                </div>
            </div>
        </div>
    );
}
