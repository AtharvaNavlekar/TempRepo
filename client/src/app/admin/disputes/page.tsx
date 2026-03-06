"use client";
const DISPUTES = [
    { id: 1, parties: "0xAlice vs DevMarcus", reason: "Non-delivery of committed milestone", status: "Pending", staked: 800 },
    { id: 2, parties: "CryptoMage vs RustNinja", reason: "Plagiarized code submission", status: "Escalated", staked: 1200 },
];
export default function Page() {
    return (
        <div className="luxury-page"><div style={{ background: "var(--parchment)", padding: "80px 0 48px", borderBottom: "1px solid rgba(13,13,13,.08)" }}><div className="luxury-container"><p className="luxury-overline" style={{ marginBottom: 12, color: "rgba(180,60,60,.5)" }}>Admin</p><h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 400, color: "var(--ink)" }}>Platform <em style={{ color: "rgba(180,60,60,.6)" }}>Disputes</em></h1></div></div>
            <div className="luxury-container" style={{ paddingTop: 40, paddingBottom: 80 }}>
                {DISPUTES.map(d => (<div key={d.id} className="luxury-card" style={{ padding: 24, marginBottom: 10, borderLeftWidth: 3, borderLeftColor: "rgba(180,60,60,.3)" }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}><span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 14, color: "var(--ink)" }}>{d.parties}</span><span style={{ padding: "3px 10px", borderRadius: 9999, fontFamily: "'DM Sans',sans-serif", fontSize: 10, fontWeight: 600, background: "rgba(201,163,83,.08)", color: "#977833", border: "1px solid rgba(201,163,83,.15)" }}>{d.status}</span></div><p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "var(--smoke)", marginBottom: 8 }}>{d.reason}</p><p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "rgba(13,13,13,.25)" }}>Staked: {d.staked} pts</p></div>))}
            </div></div>
    );
}
