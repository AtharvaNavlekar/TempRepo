"use client";

import { motion } from "framer-motion";
import { BentoCard, ForgeButton, TerminalBlock } from "@/components/forge";
import Navbar from "@/components/layout/Navbar";
import { useState } from "react";

export default function ShipLogStudio() {
    const [integrationState, setIntegrationState] = useState<"idle" | "syncing" | "done">("idle");
    const [syncLogs, setSyncLogs] = useState<string[]>(["// WAITING FOR COMMAND..."]);

    const handleSync = () => {
        setIntegrationState("syncing");
        setSyncLogs([
            "// INITIATING API HANDSHAKE WITH [GITHUB] & [FIGMA]...",
            "> OAUTH TOKENS: VERIFIED."
        ]);

        setTimeout(() => {
            setSyncLogs(prev => [...prev, "> PARSING RECENT COMMITS AND LAYER UPDATES..."]);
        }, 1500);

        setTimeout(() => {
            setSyncLogs(prev => [
                ...prev,
                "[OK] EXTRACTED 3 POTENTIAL ARTIFACTS.",
                "// CALCULATING PRELIMINARY DNA SCORES...",
                "[OK] READY FOR MANUAL CURATION."
            ]);
            setIntegrationState("done");
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans">
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 py-32">
                <div className="mb-12 border-b border-white/10 pb-6 flex justify-between items-end">
                    <div>
                        <h1 className="font-clash font-bold text-4xl mb-2 text-white/40">Studio // <span className="text-white">Drafting</span></h1>
                        <p className="font-mono text-sm text-white/50">Your private workspace to curate and mint shipped artifacts.</p>
                    </div>
                    <ForgeButton variant="primary" icon={<span className="text-xl">+</span>}>
                        MANUAL UPLOAD
                    </ForgeButton>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Panel: Auto-Sync */}
                    <div className="lg:col-span-1 space-y-6">
                        <BentoCard className="p-6">
                            <h3 className="font-clash font-semibold text-xl mb-4 text-cyber">Auto-Scrape Engine</h3>
                            <p className="font-mono text-xs text-white/50 mb-6 leading-relaxed">
                                Connect your tools. We automatically detect major un-logged milestones and package them for submission.
                            </p>

                            <div className="space-y-4 mb-6">
                                <div className="flex items-center justify-between p-3 border border-white/10 bg-white/5 rounded">
                                    <span className="font-mono text-sm">GitHub.com</span>
                                    <span className="font-mono text-xs text-lime">CONNECTED</span>
                                </div>
                                <div className="flex items-center justify-between p-3 border border-white/10 bg-white/5 rounded">
                                    <span className="font-mono text-sm">Figma</span>
                                    <span className="font-mono text-xs text-white/30">DISCONNECTED</span>
                                </div>
                            </div>

                            <ForgeButton
                                variant="secondary"
                                className="w-full text-sm py-3"
                                onClick={handleSync}
                                loading={integrationState === "syncing"}
                                disabled={integrationState !== "idle"}
                            >
                                {integrationState === "done" ? "SYNC COMPLETE" : "RUN DEEP SCAN"}
                            </ForgeButton>
                        </BentoCard>

                        {/* Scanner Terminal */}
                        <TerminalBlock
                            lines={syncLogs}
                            typingSpeed={20}
                            className="h-[250px] border-cyber/30 text-cyber/90 shadow-[0_0_15px_rgba(138,43,226,0.1)]"
                        />
                    </div>

                    {/* Right Panel: The Queue */}
                    <div className="lg:col-span-2 space-y-6">
                        <BentoCard className="p-8 min-h-[600px] bg-white/[0.02]">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="font-mono text-xs tracking-widest uppercase text-white/50">Unpublished Artifacts</h3>
                                <div className="text-xs font-mono bg-white/10 px-3 py-1 rounded-full">
                                    {integrationState === "done" ? "3 FOUND" : "0 FOUND"}
                                </div>
                            </div>

                            {integrationState !== "done" ? (
                                <div className="h-full mt-24 flex flex-col items-center justify-center text-center opacity-50">
                                    <div className="text-6xl mb-4 font-mono font-thin text-white/20">∅</div>
                                    <p className="font-mono text-sm uppercase tracking-widest text-white/40">Studio is empty</p>
                                    <p className="font-mono text-xs text-white/30 mt-2">Run a scan or upload manually to begin drafting.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="p-5 border border-white/10 bg-black/40 hover:border-lime/40 transition-colors cursor-pointer group flex items-center justify-between"
                                    >
                                        <div>
                                            <h4 className="font-clash font-bold text-lg group-hover:text-lime transition-colors">Core Engine Refactor [PR #142]</h4>
                                            <p className="font-mono text-xs text-white/40 mt-1">Detected via GitHub • 14h ago</p>
                                        </div>
                                        <ForgeButton variant="ghost" size="sm" className="text-lime border-lime/30">MINT DNA</ForgeButton>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.1 }}
                                        className="p-5 border border-white/10 bg-black/40 hover:border-lime/40 transition-colors cursor-pointer group flex items-center justify-between"
                                    >
                                        <div>
                                            <h4 className="font-clash font-bold text-lg group-hover:text-lime transition-colors">Auth Flow State Machine</h4>
                                            <p className="font-mono text-xs text-white/40 mt-1">Detected via GitHub • 2d ago</p>
                                        </div>
                                        <ForgeButton variant="ghost" size="sm" className="text-lime border-lime/30">MINT DNA</ForgeButton>
                                    </motion.div>
                                </div>
                            )}
                        </BentoCard>
                    </div>
                </div>
            </div>
        </div>
    );
}
