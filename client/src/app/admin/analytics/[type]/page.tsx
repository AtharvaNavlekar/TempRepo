import { BarChart2 } from "lucide-react";

export default function Page() {
    const METRICS = [{ l: "DAU", v: "3,241", delta: "+12%" }, { l: "WAU", v: "8,892", delta: "+8%" }, { l: "New Signups", v: "142", delta: "+23%" }, { l: "Avg Session", v: "8.2m", delta: "-2%" }];
    return (
        <div className="luxury-page"><div style={{ background: "var(--parchment)", padding: "80px 0 48px", borderBottom: "1px solid rgba(13,13,13,.08)" }}><div className="luxury-container"><p className="luxury-overline" style={{ marginBottom: 12 }}>Admin · Analytics</p><h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 400, color: "var(--ink)" }}>Platform <em className="gold-shimmer-text">Analytics</em></h1></div></div>
            <div className="luxury-container" style={{ paddingTop: 40, paddingBottom: 80 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
                    {METRICS.map(m => (<div key={m.l} className="luxury-card" style={{ padding: 24, textAlign: "center" }}><p style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontStyle: "italic", color: "#C9A353" }}>{m.v}</p><p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 13, color: "var(--ink)", marginTop: 4 }}>{m.l}</p><p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: m.delta.startsWith("+") ? "#5B8A6F" : "rgba(180,60,60,.6)", marginTop: 2 }}>{m.delta}</p></div>))}
                </div>
                <div className="luxury-card" style={{ padding: 32, marginTop: 20, textAlign: "center", minHeight: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "var(--smoke)", display: "flex", alignItems: "center", gap: "8px" }}><BarChart2 size={16} /> Charts and detailed analytics will render here</p>
                </div>
            </div></div>
    );
}
