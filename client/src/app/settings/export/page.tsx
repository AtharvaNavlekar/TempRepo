"use client";
import { Download } from "lucide-react";
export default function Page() {
    const FORMATS = [
        { label: "JSON", desc: "Complete data export in JSON format", size: "~12 MB" },
        { label: "CSV", desc: "Spreadsheet-compatible tabular data", size: "~8 MB" },
        { label: "PDF", desc: "Printable portfolio document", size: "~4 MB" },
    ];
    return (
        <div className="luxury-page"><div style={{ background: "var(--parchment)", padding: "80px 0 48px", borderBottom: "1px solid rgba(13,13,13,.08)" }}><div className="luxury-container"><p className="luxury-overline" style={{ marginBottom: 12 }}>Settings</p><h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 400, color: "var(--ink)" }}>Data <em className="gold-shimmer-text">Export</em></h1></div></div>
            <div className="luxury-container" style={{ maxWidth: 640, paddingTop: 40, paddingBottom: 80 }}>
                {FORMATS.map(f => (<div key={f.label} className="luxury-card" style={{ padding: 20, marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}><div><p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 15, color: "var(--ink)" }}>{f.label}</p><p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--smoke)" }}>{f.desc} · {f.size}</p></div><button className="btn-secondary" style={{ fontSize: 11, padding: "8px 16px" }}><Download size={12} /> Export</button></div>))}
            </div></div>
    );
}
