"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, X } from "lucide-react";

export default function ArtifactSeedPage() {
    const router = useRouter();
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
    const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); };
    const handleDrop = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); if (e.dataTransfer.files?.[0]) setFile(e.dataTransfer.files[0]); };
    const handleContinue = () => { if (!file) return; setIsUploading(true); setTimeout(() => router.push("/onboard/contract"), 1500); };

    return (
        <div className="luxury-page" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
            <div style={{ width: "100%", maxWidth: 640, position: "relative", zIndex: 10 }}>
                <div style={{ textAlign: "center", marginBottom: 40 }}>
                    <p className="luxury-overline" style={{ marginBottom: 12 }}>Step 3 · Your First Venture</p>
                    <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 400, color: "var(--ink)", marginBottom: 12 }}>
                        Upload Your <em className="gold-shimmer-text">Best Work</em>
                    </h1>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "var(--smoke)", lineHeight: 1.8, maxWidth: 480, margin: "0 auto" }}>
                        Drop your best piece of work — a repo zip, a figma file, a pitch deck. This establishes your baseline Verified Score.
                    </p>
                </div>

                <div className="luxury-card" style={{
                    padding: 48, textAlign: "center", minHeight: 260, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    border: isDragging ? "2px dashed #C9A353" : file ? "1.5px solid rgba(91,138,111,.3)" : "2px dashed rgba(13,13,13,.12)",
                    background: isDragging ? "rgba(201,163,83,.04)" : file ? "rgba(91,138,111,.03)" : "#fff",
                    transition: "all .3s"
                }}
                    onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
                    <AnimatePresence mode="wait">
                        {!file ? (
                            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.9 }} style={{ display: "flex", flexDirection: "column", alignItems: "center", pointerEvents: "none" }}>
                                <div style={{ width: 64, height: 64, borderRadius: "50%", background: isDragging ? "rgba(201,163,83,.15)" : "rgba(13,13,13,.04)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, transition: "background .3s" }}>
                                    <Upload size={24} style={{ color: isDragging ? "#C9A353" : "rgba(13,13,13,.3)" }} />
                                </div>
                                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", fontWeight: 400, color: "var(--ink)", marginBottom: 8 }}>
                                    Drag & Drop File
                                </h3>
                                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "var(--smoke)", letterSpacing: ".1em", textTransform: "uppercase" }}>
                                    .zip, .pdf, .fig, .js (max 50mb)
                                </p>
                            </motion.div>
                        ) : (
                            <motion.div key="filled" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                                <div style={{ width: 56, height: 56, borderRadius: 14, background: "rgba(91,138,111,.1)", border: "1px solid rgba(91,138,111,.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                                    <FileText size={22} style={{ color: "#5B8A6F" }} />
                                </div>
                                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", background: "rgba(91,138,111,.1)", border: "1px solid rgba(91,138,111,.2)", borderRadius: 9999, marginBottom: 12 }}>
                                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#5B8A6F" }} />
                                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", color: "#5B8A6F" }}>File Uploaded</span>
                                </div>
                                <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 14, color: "var(--ink)", maxWidth: "80%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{file.name}</p>
                                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--smoke)", marginTop: 4 }}>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                <button onClick={() => setFile(null)} style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "rgba(180,60,60,.6)", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 4 }}>
                                    <X size={12} /> Remove file
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div style={{ marginTop: 28, display: "flex", justifyContent: "center" }}>
                    <button className="btn-primary" onClick={handleContinue} disabled={!file}
                        style={{ padding: "14px 48px", opacity: !file ? 0.4 : isUploading ? 0.6 : 1, cursor: !file ? "not-allowed" : "pointer" }}>
                        {isUploading ? "Processing..." : "Complete Profile →"}
                    </button>
                </div>
            </div>
        </div>
    );
}
