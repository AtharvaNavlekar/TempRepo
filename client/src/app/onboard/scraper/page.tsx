"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

const SCRAPE_LOGS_TECH = [
    "// Initiating profile import...",
    "Establishing connection to GitHub",
    "[✓] Authenticating OAuth token",
    "Extracting commit history (last 365 days)...",
    "[✓] Found: 1,432 commits across 12 repositories",
    "Analyzing repo [collabrise-core]...",
    "[✓] Identified 42 PR merges, 15 issue resolutions",
    "[!] High complexity code detected in /src/engine",
    "// Adjusting verified score weight",
    "Scanning StackOverflow reputation...",
    "[—] User not found. Skipping.",
    "// Compiling preliminary score...",
    "[✓] Score: 842 — Solid Engineer C-Class",
    "// Import complete. Awaiting confirmation.",
];

const SCRAPE_LOGS_CREATIVE = [
    "// Initiating profile import...",
    "Establishing connection to Figma API",
    "Extracting layer histories (last 365 days)...",
    "[✓] Found: 45,212 layers across 3 workspaces",
    "Analyzing auto-layout complexity...",
    "[✓] Identified 400+ component variants",
    "Scanning Behance portfolio...",
    "[✓] Found 3 case studies — high aesthetic value",
    "// Compiling preliminary score...",
    "[✓] Score: 910 — Elite Designer B-Class",
    "// Import complete. Awaiting confirmation.",
];

function ScraperConsoleContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const role = searchParams?.get("role") || "tech";

    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const logsToUse = role === "creative" ? SCRAPE_LOGS_CREATIVE : SCRAPE_LOGS_TECH;
    const [visibleLogs, setVisibleLogs] = useState<typeof logsToUse>([]);

    useEffect(() => {
        let currentLogIndex = 0;
        const progressInterval = setInterval(() => {
            setProgress(prev => { if (prev >= 100) { clearInterval(progressInterval); return 100; } return prev + Math.floor(Math.random() * 5) + 1; });
        }, 150);
        const logInterval = setInterval(() => {
            if (currentLogIndex < logsToUse.length) {
                setVisibleLogs(logsToUse.slice(0, currentLogIndex + 1));
                currentLogIndex++;
            } else {
                clearInterval(logInterval);
                setIsComplete(true);
                setProgress(100);
            }
        }, 400);
        return () => { clearInterval(progressInterval); clearInterval(logInterval); };
    }, [logsToUse]);

    return (
        <div className="luxury-page" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
            <div style={{ width: "100%", maxWidth: 800, position: "relative", zIndex: 10 }}>
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
                    <div>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", background: isComplete ? "rgba(91,138,111,.1)" : "rgba(201,163,83,.1)", border: `1px solid ${isComplete ? "rgba(91,138,111,.2)" : "rgba(201,163,83,.2)"}`, borderRadius: 9999, marginBottom: 16 }}>
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: isComplete ? "#5B8A6F" : "#C9A353" }} />
                            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", color: isComplete ? "#5B8A6F" : "#C9A353" }}>
                                {isComplete ? "Import Complete" : "Importing Profiles"}
                            </span>
                        </div>
                        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 400, color: "var(--ink)", display: "flex", alignItems: "center", gap: 12 }}>
                            Data Importer {isComplete && <Check size={20} style={{ color: "#5B8A6F" }} />}
                        </h1>
                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "var(--smoke)", marginTop: 8 }}>
                            Analyzing your verified work history. Please wait while we process your data.
                        </p>
                    </div>
                    <div style={{ width: 200 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, letterSpacing: ".15em", textTransform: "uppercase", color: "rgba(13,13,13,.35)" }}>Progress</span>
                            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 600, color: "#C9A353" }}>{Math.min(progress, 100)}%</span>
                        </div>
                        <div style={{ height: 4, background: "rgba(13,13,13,.08)", borderRadius: 9999, overflow: "hidden" }}>
                            <motion.div animate={{ width: `${Math.min(progress, 100)}%` }} transition={{ ease: "linear", duration: 0.2 }}
                                style={{ height: "100%", background: isComplete ? "#5B8A6F" : "linear-gradient(90deg, #C9A353, #E5C97A)", borderRadius: 9999, position: "relative" }}>
                                {!isComplete && <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,.3)", animation: "pulse 1.5s ease-in-out infinite" }} />}
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Terminal Window */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(13,13,13,.08)", boxShadow: "0 8px 40px rgba(13,13,13,.06)" }}>
                    <div style={{ background: "#1E1E1E", padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
                        <div style={{ display: "flex", gap: 8 }}>
                            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "rgba(255,95,87,.7)" }} />
                            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "rgba(255,188,46,.7)" }} />
                            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "rgba(39,201,63,.7)" }} />
                        </div>
                        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: "rgba(255,255,255,.3)", letterSpacing: ".1em" }}>collabrise@system: ~/data-import</span>
                    </div>
                    <div style={{ background: "#1A1A1A", padding: 20, minHeight: 360, maxHeight: 420, overflowY: "auto", fontFamily: "'JetBrains Mono','Fira Code',monospace", fontSize: 12, lineHeight: 2 }}>
                        {visibleLogs.map((log, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}>
                                <span style={{ color: log.startsWith("[✓]") ? "#5B8A6F" : log.startsWith("[!]") || log.startsWith("[—]") ? "#C9A353" : log.startsWith("//") ? "rgba(255,255,255,.25)" : "rgba(255,255,255,.5)" }}>
                                    {log}
                                </span>
                            </motion.div>
                        ))}
                        {!isComplete && (
                            <span style={{ display: "inline-block", width: 8, height: 16, background: "#C9A353", animation: "pulse 1s ease-in-out infinite" }} />
                        )}
                    </div>
                </motion.div>

                {/* Continue */}
                <AnimatePresence>
                    {isComplete && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, type: "spring" }}
                            style={{ marginTop: 28, display: "flex", justifyContent: "flex-end" }}>
                            <button className="btn-primary" onClick={() => router.push("/onboard/psychometric")}>
                                Continue →
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default function ScraperConsolePage() {
    return (
        <Suspense fallback={
            <div className="luxury-page" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", border: "2px dashed rgba(201,163,83,.3)", animation: "spin 3s linear infinite" }} />
            </div>
        }>
            <ScraperConsoleContent />
        </Suspense>
    );
}
