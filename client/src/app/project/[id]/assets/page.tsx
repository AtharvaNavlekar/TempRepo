import { Upload, FileText, Image, FileCode } from "lucide-react";
export default function Page() {
    const ASSETS = [
        { name: "design-v3.fig", type: "Design", size: "4.2 MB", date: "Mar 3", icon: <Image size={16} style={{ color: "#C9A353" }} /> },
        { name: "api-spec.yaml", type: "Docs", size: "128 KB", date: "Mar 2", icon: <FileCode size={16} style={{ color: "#C9A353" }} /> },
        { name: "pitch-deck-v2.pdf", type: "Document", size: "8.1 MB", date: "Feb 28", icon: <FileText size={16} style={{ color: "#C9A353" }} /> },
    ];
    return (
        <div className="luxury-page">
            <div style={{ background: "var(--parchment)", padding: "80px 0 48px", borderBottom: "1px solid rgba(13,13,13,.08)" }}>
                <div className="luxury-container"><p className="luxury-overline" style={{ marginBottom: 12 }}>Venture · Assets</p><h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 400, color: "var(--ink)" }}>Project <em className="gold-shimmer-text">Assets</em></h1></div>
            </div>
            <div className="luxury-container" style={{ paddingTop: 40, paddingBottom: 80 }}>
                <div className="luxury-card" style={{ padding: 40, textAlign: "center", border: "2px dashed rgba(13,13,13,.1)", marginBottom: 24 }}>
                    <Upload size={28} style={{ color: "rgba(13,13,13,.2)", margin: "0 auto 12px" }} />
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "var(--smoke)" }}>Drag & drop files here or click to upload</p>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "rgba(13,13,13,.25)", marginTop: 4 }}>Max 50 MB per file</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {ASSETS.map(a => (
                        <div key={a.name} className="luxury-card" style={{ padding: 16, display: "flex", alignItems: "center", gap: 14 }}>
                            <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(201,163,83,.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>{a.icon}</div>
                            <div style={{ flex: 1 }}><p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 14, color: "var(--ink)" }}>{a.name}</p><p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--smoke)" }}>{a.type} · {a.size}</p></div>
                            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "rgba(13,13,13,.25)" }}>{a.date}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
