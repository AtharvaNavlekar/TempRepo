import { Dna } from "lucide-react";
export default function Page() {
    const DIMS = [{ label: "Reliability", value: 92 }, { label: "Velocity", value: 78 }, { label: "Quality", value: 85 }, { label: "Collaboration", value: 70 }, { label: "Innovation", value: 88 }];
    return (
        <div className="luxury-page"><div style={{ background: "var(--parchment)", padding: "80px 0 48px", borderBottom: "1px solid rgba(13,13,13,.08)" }}><div className="luxury-container"><p className="luxury-overline" style={{ marginBottom: 12 }}>Ship Log · DNA</p><h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 400, color: "var(--ink)" }}><Dna size={22} style={{ display: "inline", marginRight: 10, color: "#C9A353" }} />Builder <em className="gold-shimmer-text">DNA</em></h1></div></div>
            <div className="luxury-container" style={{ maxWidth: 640, paddingTop: 40, paddingBottom: 80 }}>
                <div className="luxury-card" style={{ padding: 36 }}>
                    {DIMS.map(d => (<div key={d.label} style={{ marginBottom: 20 }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}><span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "var(--ink)" }}>{d.label}</span><span style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", fontStyle: "italic", color: "#C9A353" }}>{d.value}</span></div><div style={{ height: 4, background: "rgba(13,13,13,.06)", borderRadius: 9999, overflow: "hidden" }}><div style={{ height: "100%", width: `${d.value}%`, background: "#C9A353", borderRadius: 9999 }} /></div></div>))}
                </div>
            </div></div>
    );
}
