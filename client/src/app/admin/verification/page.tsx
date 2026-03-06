"use client";
import { CheckCircle } from "lucide-react";
const VERIFICATIONS = [
    { user: "@0xNeo", type: "Identity", submitted: "Mar 5", status: "Pending" },
    { user: "@DevMarcus", type: "Skills - Rust", submitted: "Mar 4", status: "Verified" },
    { user: "@DesignYuki", type: "Portfolio", submitted: "Mar 3", status: "Pending" },
];
export default function Page() {
    return (
        <div className="luxury-page"><div style={{ background: "var(--parchment)", padding: "80px 0 48px", borderBottom: "1px solid rgba(13,13,13,.08)" }}><div className="luxury-container"><p className="luxury-overline" style={{ marginBottom: 12 }}>Admin</p><h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 400, color: "var(--ink)" }}><CheckCircle size={22} style={{ display: "inline", marginRight: 8, color: "#C9A353" }} /><em className="gold-shimmer-text">Verification</em></h1></div></div>
            <div className="luxury-container" style={{ paddingTop: 40, paddingBottom: 80 }}>
                {VERIFICATIONS.map(v => (<div key={v.user} className="luxury-card" style={{ padding: 20, marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}><div><p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 14, color: "var(--ink)" }}>{v.user}</p><p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--smoke)" }}>{v.type} · Submitted {v.submitted}</p></div><div style={{ display: "flex", gap: 10, alignItems: "center" }}><span style={{ padding: "3px 10px", borderRadius: 9999, fontFamily: "'DM Sans',sans-serif", fontSize: 10, fontWeight: 600, background: v.status === "Verified" ? "rgba(91,138,111,.08)" : "rgba(201,163,83,.08)", color: v.status === "Verified" ? "#5B8A6F" : "#977833", border: "1px solid", borderColor: v.status === "Verified" ? "rgba(91,138,111,.15)" : "rgba(201,163,83,.15)" }}>{v.status}</span>{v.status === "Pending" && <button className="btn-primary" style={{ fontSize: 11, padding: "6px 14px" }}>Verify</button>}</div></div>))}
            </div></div>
    );
}
