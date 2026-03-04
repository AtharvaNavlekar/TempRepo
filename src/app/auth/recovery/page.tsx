"use client";

import { useState } from "react";
import Link from "next/link";
import { ForgeButton, BentoCard, TerminalBlock } from "@/components/forge";
import { motion } from "framer-motion";

export default function PasswordRecoveryPage() {
    const [step, setStep] = useState<1 | 2>(1);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [terminalLogs, setTerminalLogs] = useState<string[]>([
        "// INIT RECOVERY PROTOCOL...",
        "WAITING FOR TARGET IDENTIFIER...",
    ]);

    const handleRequestReset = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTerminalLogs(prev => [...prev, `> SCANNING DATABASE FOR [${email}]...`]);

        setTimeout(() => {
            setTerminalLogs(prev => [
                ...prev,
                "[OK] TARGET LOCATED.",
                "// TRANSMITTING OVERRIDE CODES TO COMM-LINK."
            ]);
            setLoading(false);
            setStep(2);
        }, 2000);
    };

    return (
        <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-6 relative">
            <div className="w-full max-w-xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}
                >
                    <BentoCard className="p-8 md:p-10 border-acid/30">
                        <div className="mb-8 border-b border-white/10 pb-6">
                            <h1 className="font-clash font-bold text-3xl text-white mb-2 uppercase tracking-wide">
                                Security Override
                            </h1>
                            <p className="font-mono text-white/50 text-sm">
                                Lost access key protocol initialized. Follow the terminal instructions to regain system entry.
                            </p>
                        </div>

                        <div className="mb-8">
                            <TerminalBlock lines={terminalLogs} typingSpeed={30} className="w-full bg-black/60 border-acid/20 text-acid/90 shadow-[0_0_15px_rgba(255,0,255,0.1)]" />
                        </div>

                        {step === 1 ? (
                            <form onSubmit={handleRequestReset} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="font-mono text-xs text-white/70 tracking-widest uppercase">
                                        Target Address [Email]
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="builder@edge.net"
                                        className="w-full bg-black/50 border border-white/10 focus:border-acid rounded-bento-sm px-4 py-3 font-mono text-white placeholder:text-white/20 outline-none transition-colors duration-300 focus:shadow-[0_0_10px_rgba(255,0,255,0.2)]"
                                        required
                                    />
                                </div>

                                <ForgeButton
                                    type="submit"
                                    className="w-full py-4 bg-acid text-black hover:bg-white hover:text-black border-none"
                                    loading={loading}
                                >
                                    TRANSMIT OVERRIDE SIGNAL
                                </ForgeButton>
                            </form>
                        ) : (
                            <div className="space-y-6 text-center py-6">
                                <div className="w-16 h-16 rounded-full bg-acid/20 border border-acid text-acid flex items-center justify-center mx-auto mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="font-clash font-bold text-xl text-white">Signal Transmitted</h3>
                                <p className="font-mono text-sm text-white/60 leading-relaxed max-w-sm mx-auto">
                                    Check your secure comm-link for the temporary access codes. They will self-destruct in 15 minutes.
                                </p>
                                <Link href="/auth/login" className="inline-block mt-4">
                                    <ForgeButton variant="ghost" className="text-acid hover:text-white border-acid/30">
                                        RETURN TO GATEWAY
                                    </ForgeButton>
                                </Link>
                            </div>
                        )}

                        <div className="mt-8 text-center">
                            <Link href="/auth/login" className="font-mono text-[10px] text-white/30 hover:text-white transition-colors uppercase tracking-widest flex items-center justify-center gap-2">
                                <span>← ABORT PROTOCOL</span>
                            </Link>
                        </div>
                    </BentoCard>
                </motion.div>
            </div>
        </div>
    );
}
