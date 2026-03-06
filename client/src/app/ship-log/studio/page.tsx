import { PenTool } from "lucide-react";
export default function Page() {
    return (
        <div className="luxury-page"><div style={{ background: "var(--parchment)", padding: "80px 0 48px", borderBottom: "1px solid rgba(13,13,13,.08)" }}><div className="luxury-container"><p className="luxury-overline" style={{ marginBottom: 12 }}>Ship Log</p><h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 400, color: "var(--ink)" }}><PenTool size={22} style={{ display: "inline", marginRight: 10, color: "#C9A353" }} />Ship Log <em className="gold-shimmer-text">Studio</em></h1></div></div>
            <div className="luxury-container" style={{ maxWidth: 720, paddingTop: 40, paddingBottom: 80 }}>
                <div className="luxury-card" style={{ padding: 40, textAlign: "center", border: "2px dashed rgba(13,13,13,.1)" }}>
                    <PenTool size={32} style={{ color: "rgba(13,13,13,.15)", margin: "0 auto 16px" }} />
                    <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.3rem", fontWeight: 400, color: "var(--ink)", marginBottom: 8 }}>Start Writing</h3>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "var(--smoke)", lineHeight: 1.7, maxWidth: 400, margin: "0 auto 20px" }}>Document your journey, wins, and learnings. Your ship log is your living portfolio.</p>
                    <button className="btn-primary">Create New Entry</button>
                </div>
            </div></div>
    );
}
