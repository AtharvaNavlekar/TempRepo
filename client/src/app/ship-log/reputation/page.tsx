import { Shield } from "lucide-react";
export default function Page() {
    const ITEMS = [{ label: "Reputation Score", val: "842", sub: "Top 15%" }, { label: "Total Staked", val: "2,400", sub: "Lifetime" }, { label: "Disputes Won", val: "3/3", sub: "100% win rate" }, { label: "Ships Delivered", val: "12", sub: "On-time: 11/12" }];
    return (
        <div className="luxury-page"><div style={{ background: "var(--parchment)", padding: "80px 0 48px", borderBottom: "1px solid rgba(13,13,13,.08)" }}><div className="luxury-container"><p className="luxury-overline" style={{ marginBottom: 12 }}>Ship Log</p><h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 400, color: "var(--ink)" }}><Shield size={22} style={{ display: "inline", marginRight: 10, color: "#C9A353" }} />Staked <em className="gold-shimmer-text">Reputation</em></h1></div></div>
            <div className="luxury-container" style={{ paddingTop: 40, paddingBottom: 80 }}><div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
                {ITEMS.map(i => (<div key={i.label} className="luxury-card" style={{ padding: 28, textAlign: "center" }}><p style={{ fontFamily: "'Playfair Display',serif", fontSize: "2.5rem", fontStyle: "italic", color: "#C9A353", lineHeight: 1 }}>{i.val}</p><p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 14, color: "var(--ink)", marginTop: 8 }}>{i.label}</p><p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--smoke)", marginTop: 2 }}>{i.sub}</p></div>))}
            </div></div></div>
    );
}
