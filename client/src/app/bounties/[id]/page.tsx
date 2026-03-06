import { Zap, Clock, DollarSign } from "lucide-react";
export default function Page() {
    return (
        <div className="luxury-page"><div style={{ background: "var(--parchment)", padding: "80px 0 48px", borderBottom: "1px solid rgba(13,13,13,.08)" }}><div className="luxury-container"><p className="luxury-overline" style={{ marginBottom: 12 }}>Bounty Detail</p><h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 400, color: "var(--ink)" }}>Build ZK Login Module</h1></div></div>
            <div className="luxury-container" style={{ paddingTop: 40, paddingBottom: 80 }}>
                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
                    <div className="luxury-card" style={{ padding: 32 }}>
                        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", fontWeight: 400, color: "var(--ink)", marginBottom: 16 }}>Description</h2>
                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "var(--smoke)", lineHeight: 1.8 }}>Implement a zero-knowledge proof-based login module that allows users to authenticate without revealing their credentials. The module should integrate with our existing identity layer and support cross-chain verification.</p>
                        <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 14, color: "var(--ink)", marginTop: 24, marginBottom: 10 }}>Requirements</h3>
                        <ul style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "var(--smoke)", lineHeight: 2, paddingLeft: 20 }}>
                            <li>ZK-SNARK proof generation and verification</li><li>Browser-compatible WebAssembly build</li><li>Integration with Ethereum and Solana wallets</li><li>Comprehensive test suite with &gt;90% coverage</li>
                        </ul>
                        <div style={{ display: "flex", gap: 6, marginTop: 16 }}>{["Rust", "WASM", "ZK-Proofs", "Cryptography"].map(t => <span key={t} className="luxury-tag">{t}</span>)}</div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        <div className="luxury-card" style={{ padding: 24, textAlign: "center" }}>
                            <DollarSign size={20} style={{ color: "#C9A353", margin: "0 auto 8px" }} />
                            <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontStyle: "italic", color: "#C9A353" }}>$2,500</p>
                            <p className="luxury-overline">Reward</p>
                        </div>
                        <div className="luxury-card" style={{ padding: 24, textAlign: "center" }}>
                            <Clock size={18} style={{ color: "var(--smoke)", margin: "0 auto 8px" }} />
                            <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 14, color: "var(--ink)" }}>14 days</p>
                            <p className="luxury-overline">Deadline</p>
                        </div>
                        <div className="luxury-card" style={{ padding: 24, textAlign: "center" }}>
                            <Zap size={18} style={{ color: "rgba(180,60,60,.6)", margin: "0 auto 8px" }} />
                            <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 13, color: "rgba(180,60,60,.6)" }}>Hard</p>
                            <p className="luxury-overline">Difficulty</p>
                        </div>
                        <button className="btn-primary" style={{ width: "100%", padding: "14px 0" }}>Claim Bounty</button>
                    </div>
                </div>
            </div></div>
    );
}
