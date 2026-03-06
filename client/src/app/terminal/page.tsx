"use client";
import { useState } from "react";
import { Terminal as TermIcon, Send } from "lucide-react";
export default function TerminalPage() {
    const [history, setHistory] = useState([
        { type: "system", text: "CollabRise AI Terminal v2.0" },
        { type: "system", text: 'Type "help" for available commands.' },
        { type: "input", text: "$ status" },
        { type: "output", text: "Ship Score: 842 · Active Projects: 3 · Streak: 7d" },
    ]);
    const [input, setInput] = useState("");
    const handleSubmit = () => { if (!input.trim()) return; setHistory(prev => [...prev, { type: "input", text: `$ ${input}` }, { type: "output", text: `Command "${input}" executed.` }]); setInput(""); };
    return (
        <div className="luxury-page"><div style={{ background: "var(--parchment)", padding: "80px 0 48px", borderBottom: "1px solid rgba(13,13,13,.08)" }}><div className="luxury-container"><p className="luxury-overline" style={{ marginBottom: 12 }}>Tools</p><h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 400, color: "var(--ink)" }}><TermIcon size={22} style={{ display: "inline", marginRight: 8, color: "#C9A353" }} />AI <em className="gold-shimmer-text">Terminal</em></h1></div></div>
            <div className="luxury-container" style={{ maxWidth: 800, paddingTop: 40, paddingBottom: 80 }}>
                <div style={{ background: "var(--ink)", borderRadius: 14, overflow: "hidden", border: "1px solid rgba(201,163,83,.15)" }}>
                    <div style={{ padding: "10px 16px", background: "rgba(201,163,83,.08)", display: "flex", gap: 6 }}><div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(180,60,60,.4)" }} /><div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(201,163,83,.4)" }} /><div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(91,138,111,.4)" }} /></div>
                    <div style={{ padding: 20, minHeight: 300, maxHeight: 500, overflowY: "auto" }}>
                        {history.map((h, i) => (<div key={i} style={{ fontFamily: "monospace", fontSize: 13, color: h.type === "system" ? "rgba(201,163,83,.5)" : h.type === "input" ? "rgba(255,255,255,.7)" : "rgba(91,138,111,.7)", marginBottom: 4, lineHeight: 1.6 }}>{h.text}</div>))}
                    </div>
                    <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,.05)", display: "flex", gap: 10 }}>
                        <span style={{ fontFamily: "monospace", fontSize: 13, color: "#C9A353" }}>$</span>
                        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSubmit()} placeholder="Type a command..." style={{ flex: 1, background: "transparent", border: "none", fontFamily: "monospace", fontSize: 13, color: "rgba(255,255,255,.7)", outline: "none" }} />
                        <button onClick={handleSubmit} style={{ background: "none", border: "none", cursor: "pointer", color: "#C9A353" }}><Send size={14} /></button>
                    </div>
                </div>
            </div></div>
    );
}
