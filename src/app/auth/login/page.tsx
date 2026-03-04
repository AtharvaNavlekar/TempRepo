"use client";

import { useState } from "react";
import Link from "next/link";
import { ForgeButton, BentoCard, GlitchText, PulseTag } from "@/components/forge";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate auth
        setTimeout(() => {
            setLoading(false);
            window.location.href = "/vibe-check";
        }, 1500);
    };

    return (
        <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-6 relative">

            {/* Background Glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-lime/10 rounded-full blur-[120px]" />
                <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-cyber/10 rounded-full blur-[100px]" />
            </div>

            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">

                {/* Left Side: Branding/Visual */}
                <BentoCard className="hidden md:flex flex-col justify-between min-h-[500px] p-10 bg-gradient-to-br from-obsidian via-obsidian to-obsidian border-white/10 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>

                    <div className="relative z-10">
                        <PulseTag status="live" label="SYSTEM ONLINE" className="mb-6" />
                        <GlitchText text="ENTER" className="text-6xl font-black text-white" />
                        <GlitchText text="THE" className="text-6xl font-black text-white/80" speed="slow" />
                        <GlitchText text="FORGE" className="text-6xl font-black text-lime" speed="fast" />
                    </div>

                    <div className="relative z-10">
                        <p className="font-mono text-white/50 text-sm max-w-[80%] uppercase tracking-wider leading-relaxed">
                            WARNING: Standard corporate behavior is strictly prohibited. The algorithms are watching. Ship or die trying.
                        </p>
                    </div>

                    {/* Decorative Corner Elements */}
                    <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-white/10 m-6" />
                    <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-white/10 m-6" />
                </BentoCard>

                {/* Right Side: Auth Form */}
                <BentoCard className="min-h-[500px] p-8 md:p-10 flex flex-col justify-center">
                    <div className="mb-8">
                        <h2 className="font-clash font-bold text-3xl text-white mb-2">Identify Yourself.</h2>
                        <p className="font-mono text-white/50 text-sm">We need your DNA signature to proceed.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="font-mono text-xs text-white/70 tracking-widest uppercase">
                                Digital Address [Email]
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="builder@edge.net"
                                className="w-full bg-black/50 border border-white/10 focus:border-lime rounded-bento-sm px-4 py-3 font-mono text-white placeholder:text-white/20 outline-none transition-colors duration-300 backdrop-blur-sm"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="font-mono text-xs text-white/70 tracking-widest uppercase">
                                    Access Key [Password]
                                </label>
                                <Link href="/auth/recovery" className="font-mono text-[10px] text-lime hover:text-white transition-colors duration-200">
                                    LOST KEY?
                                </Link>
                            </div>
                            <input
                                type="password"
                                placeholder="••••••••••••"
                                className="w-full bg-black/50 border border-white/10 focus:border-lime rounded-bento-sm px-4 py-3 font-mono text-white placeholder:text-white/20 outline-none transition-colors duration-300 backdrop-blur-sm"
                                required
                            />
                        </div>

                        <ForgeButton
                            type="submit"
                            className="w-full py-4 text-lg"
                            loading={loading}
                        >
                            INITIALIZE SEQUENCE
                        </ForgeButton>
                    </form>

                    <div className="mt-8">
                        <div className="relative flex items-center mb-6">
                            <div className="flex-grow border-t border-white/10"></div>
                            <span className="flex-shrink-0 mx-4 font-mono text-xs text-white/30 uppercase">Or Integrate</span>
                            <div className="flex-grow border-t border-white/10"></div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <ForgeButton variant="secondary" className="font-mono w-full">
                                GITHUB
                            </ForgeButton>
                            <ForgeButton variant="secondary" className="font-mono w-full border-cyber/30 hover:bg-cyber/10 hover:text-cyber">
                                WALLET
                            </ForgeButton>
                        </div>
                    </div>

                    <p className="mt-8 text-center font-mono text-[10px] text-white/30 uppercase tracking-widest">
                        Don&apos;t have a signature? <Link href="/onboard/identity" className="text-white hover:text-lime underline decoration-white/30 underline-offset-4">Generate One</Link>
                    </p>

                </BentoCard>

            </div>
        </div>
    );
}
