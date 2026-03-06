import { Calendar } from "lucide-react";
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export default function Page() {
    return (
        <div className="luxury-page"><div style={{ background: "var(--parchment)", padding: "80px 0 48px", borderBottom: "1px solid rgba(13,13,13,.08)" }}><div className="luxury-container"><p className="luxury-overline" style={{ marginBottom: 12 }}>Ship Log · Calendar</p><h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 400, color: "var(--ink)" }}><Calendar size={24} style={{ display: "inline", marginRight: 10, color: "#C9A353" }} />Build <em className="gold-shimmer-text">Calendar</em></h1></div></div>
            <div className="luxury-container" style={{ paddingTop: 40, paddingBottom: 80 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
                    {MONTHS.map(m => (<div key={m} className="luxury-card" style={{ padding: 20, textAlign: "center" }}><p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 500, color: "var(--ink)", marginBottom: 8 }}>{m}</p><p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.8rem", fontStyle: "italic", color: "#C9A353" }}>{Math.floor(Math.random() * 20) + 1}</p><p className="luxury-overline">ships</p></div>))}
                </div>
            </div></div>
    );
}
