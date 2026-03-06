"use client";
import { DollarSign } from "lucide-react";
export default function Page() {
    const ROWS = [
        { label: "Platform Revenue (MTD)", value: "$48,200", delta: "+$8,400" },
        { label: "Escrow Held", value: "$124,800", delta: "" },
        { label: "Payouts Processed", value: "$31,600", delta: "+$5,200" },
        { label: "Fees Collected", value: "$3,840", delta: "+$720" },
    ];
    return (
        <div className="luxury-page"><div style={{ background: "var(--parchment)", padding: "80px 0 48px", borderBottom: "1px solid rgba(13,13,13,.08)" }}><div className="luxury-container"><p className="luxury-overline" style={{ marginBottom: 12 }}>Admin</p><h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 400, color: "var(--ink)" }}><DollarSign size={22} style={{ display: "inline", marginRight: 8, color: "#C9A353" }} /><em className="gold-shimmer-text">Finance</em></h1></div></div>
            <div className="luxury-container" style={{ paddingTop: 40, paddingBottom: 80 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
                    {ROWS.map(r => (<div key={r.label} className="luxury-card" style={{ padding: 28, textAlign: "center" }}><p style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontStyle: "italic", color: "#C9A353" }}>{r.value}</p><p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 13, color: "var(--ink)", marginTop: 4 }}>{r.label}</p>{r.delta && <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "#5B8A6F", marginTop: 2 }}>{r.delta}</p>}</div>))}
                </div>
            </div></div>
    );
}
