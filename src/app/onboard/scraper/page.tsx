"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TerminalBlock, ForgeButton, PulseTag } from "@/components/forge";
import { motion, AnimatePresence } from "framer-motion";
import { Suspense } from "react";
import { IconSuccess } from "@/components/icons";
import { useCollabRiseStore } from "@/store/store";

const SCRAPE_LOGS_TECH = [
    "// INITIATING PROFILE IMPORT...",
    "ESTABLISHING CONNECTION TO [GITHUB.COM]",
    "[OK] AUTHENTICATING OAUTH TOKEN... OK",
    "EXTRACTING COMMIT HISTORY (LAST 365 DAYS)...",
    "[OK] FOUND: 1,432 COMMITS ACROSS 12 REPOSITORIES",
    "ANALYZING REPO [collabrise-core]...",
    "[OK] IDENTIFIED 42 PR MESSAGES, 15 ISSUE RESOLUTIONS",
    "[ERR] WARNING: HIGH COMPLEXITY CODE DETECTED IN /src/engine",
    "// ADJUSTING VERIFIED SCORE WEIGHT",
    "SCANNING STACKOVERFLOW REPUTATION...",
    "[ERR] USER NOT FOUND. IGNORING.",
    "// COMPILING PRELIMINARY SCORE...",
    "[OK] SCORE: [842] - SOLID ENGINEER C-CLASS",
    "// IMPORT COMPLETE. WAITING FOR USER CONFIRMATION.",
];

const SCRAPE_LOGS_CREATIVE = [
    "// INITIATING PROFILE IMPORT...",
    "ESTABLISHING CONNECTION TO [FIGMA.COM/API]",
    "EXTRACTING LAYER HISTORIES (LAST 365 DAYS)...",
    "[OK] FOUND: 45,212 LAYERS ACROSS 3 TEAM WORKSPACES",
    "ANALYZING AUTO-LAYOUT COMPLEXITY...",
    "[OK] IDENTIFIED 400+ COMPONENT VARIANTS",
    "SCANNING BEHANCE PORTFOLIO...",
    "[OK] FOUND 3 CASE STUDIES. HIGH AESTHETIC VALUE DETECTED.",
    "// COMPILING PRELIMINARY SCORE...",
    "[OK] SCORE: [910] - ELITE DESIGNER B-CLASS",
    "// IMPORT COMPLETE. WAITING FOR USER CONFIRMATION.",
];

function ScraperConsoleContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const role = searchParams?.get("role") || "tech";

    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const setScore = useCollabRiseStore(state => state.setScore);

    // Select logs based on identity
    const logsToUse = role === "creative" ? SCRAPE_LOGS_CREATIVE : SCRAPE_LOGS_TECH;

    // Show progressively
    const [visibleLogs, setVisibleLogs] = useState<typeof logsToUse>([]);

    useEffect(() => {
        let currentLogIndex = 0;

        // Fake progress bar
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + Math.floor(Math.random() * 5) + 1;
            });
        }, 150);

        // Fake log appending
        const logInterval = setInterval(() => {
            if (currentLogIndex < logsToUse.length) {
                // We can't easily push directly to state based on old state without closure issues here, 
                // so we derive from the base array
                setVisibleLogs(logsToUse.slice(0, currentLogIndex + 1));
                currentLogIndex++;
            } else {
                clearInterval(logInterval);
                setIsComplete(true);
                setProgress(100);
                // Set initial score based on role
                setScore(role === "creative" ? 910 : 842);
            }
        }, 400);

        return () => {
            clearInterval(progressInterval);
            clearInterval(logInterval);
        };
    }, [logsToUse, role, setScore]);

    return (
        <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center p-6 relative">
            <div className="w-full max-w-4xl relative z-10">

                <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <PulseTag status={isComplete ? "shipped" : "live"} label={isComplete ? "IMPORT COMPLETE" : "IMPORTING PROFILES"} className="mb-4" />
                        <h1 className="font-clash font-black text-4xl text-white uppercase flex items-center gap-4">
                            Data Importer
                            {isComplete && <span className="text-lime text-2xl"><IconSuccess className="w-5 h-5" /></span>}
                        </h1>
                        <p className="font-mono text-white/50 text-sm mt-2">
                            Analyzing your verified work history. Please wait while we process your data.
                        </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full md:w-64">
                        <div className="flex justify-between font-mono text-xs text-white/70 mb-2">
                            <span>PROGRESS</span>
                            <span>{progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-black/50 border border-white/10 rounded-full overflow-hidden">
                            <motion.div
                                className={`h-full ${isComplete ? 'bg-lime' : 'bg-cyber'} relative`}
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ ease: "linear", duration: 0.2 }}
                            >
                                {!isComplete && (
                                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                                )}
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Terminal Window */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full shadow-[0_0_30px_rgba(138,43,226,0.1)] rounded-bento-lg overflow-hidden border border-white/10"
                >
                    {/* Terminal Header */}
                    <div className="bg-[#1A1A1A] border-b border-white/5 px-4 py-3 flex items-center justify-between">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                            <div className="w-3 h-3 rounded-full bg-green-500/50" />
                        </div>
                        <span className="font-mono text-xs text-white/30 tracking-wider">collabrise@system: ~/data-import</span>
                    </div>

                    {/* Terminal Body */}
                    <TerminalBlock
                        lines={visibleLogs}
                        typingSpeed={10}
                        className="rounded-none border-none min-h-[400px] max-h-[500px] overflow-y-auto"
                    />
                </motion.div>

                {/* Next Step Action */}
                <AnimatePresence>
                    {isComplete && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: 0.5, type: "spring" }}
                            className="mt-8 flex justify-end"
                        >
                            <ForgeButton
                                onClick={() => router.push('/onboard/psychometric')}
                                className="bg-lime text-obsidian border-none hover:bg-white px-8"
                            >
                                CONTINUE
                            </ForgeButton>
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
            <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-lime animate-spin-slow"></div>
            </div>
        }>
            <ScraperConsoleContent />
        </Suspense>
    );
}
