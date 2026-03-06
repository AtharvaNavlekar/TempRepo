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
                <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-saffron/10 rounded-full blur-[120px]" />
                <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-indigo/10 rounded-full blur-[100px]" />
            </div>

            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">

                {/* Left Side: Branding/Visual */}
                <BentoCard glass={false} className="hidden md:flex flex-col justify-between min-h-[500px] p-10 bg-ink border-ink/20 relative overflow-hidden group shadow-2xl">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>

                    <div className="relative z-10">
                        <PulseTag status="live" label="SYSTEM ONLINE" className="mb-6" />
                        <GlitchText text="WELCOME" className="text-6xl font-serif text-white uppercase italic tracking-wider" />
                        <GlitchText text="TO" className="text-6xl font-serif text-white/80 uppercase italic tracking-wider" speed="slow" />
                        <h1 className="text-5xl font-sans font-bold text-saffron tracking-widest uppercase mt-2">COLLABRISE</h1>
                    </div>

                    <div className="relative z-10">
                        <p className="font-sans text-smoke/90 text-sm max-w-[80%] uppercase tracking-wider leading-loose font-medium">
                            Ship real projects, build irrefutable proof of your skills, and let your work replace your resume.
                        </p>
                    </div>

                    {/* Decorative Corner Elements */}
                    <div className="absolute top-0 right-0 w-16 h-16 border-t font-serif border-r border-royal-gold/30 m-6" />
                    <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-royal-gold/30 m-6" />
                </BentoCard>

                {/* Right Side: Auth Form */}
                <BentoCard accent="default" className="min-h-[500px] p-8 md:p-10 flex flex-col justify-center">
                    <div className="mb-8">
                        <h2 className="font-serif font-bold text-4xl text-ink mb-2">Welcome Back.</h2>
                        <p className="font-sans text-smoke text-sm">Please sign in to continue to your account.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="font-sans font-bold text-[10px] text-smoke tracking-widest uppercase">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="founder@venture.net"
                                className="w-full bg-white/60 border border-ink/10 focus:border-royal-gold rounded-lg px-4 py-3 font-sans text-ink placeholder:text-smoke/40 outline-none transition-colors duration-300 backdrop-blur-sm"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="font-sans font-bold text-[10px] text-smoke tracking-widest uppercase">
                                    Password
                                </label>
                                <Link href="/auth/recovery" className="font-sans text-[10px] font-bold tracking-wider uppercase text-saffron hover:text-ink transition-colors duration-200">
                                    Forgot Password?
                                </Link>
                            </div>
                            <input
                                type="password"
                                placeholder="••••••••••••"
                                className="w-full bg-white/60 border border-ink/10 focus:border-royal-gold rounded-lg px-4 py-3 font-sans text-ink outline-none transition-colors duration-300 backdrop-blur-sm"
                                required
                            />
                        </div>

                        <ForgeButton
                            type="submit"
                            className="w-full py-4 text-[13px] tracking-widest uppercase font-bold"
                            loading={loading}
                        >
                            Sign In
                        </ForgeButton>
                    </form>

                    <div className="mt-8">
                        <div className="relative flex items-center mb-6">
                            <div className="flex-grow border-t border-ink/10"></div>
                            <span className="flex-shrink-0 mx-4 font-sans font-semibold text-[10px] text-smoke uppercase tracking-wider">Or Continue With</span>
                            <div className="flex-grow border-t border-ink/10"></div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <ForgeButton variant="ghost" className="font-sans text-[12px] font-bold tracking-wider w-full shadow-sm bg-white/50 border-ink/10">
                                GITHUB
                            </ForgeButton>
                            <ForgeButton variant="ghost" className="font-sans text-[12px] font-bold tracking-wider w-full shadow-sm bg-white/50 border-ink/10">
                                WALLET
                            </ForgeButton>
                        </div>
                    </div>

                    <p className="mt-8 text-center font-sans font-semibold text-[11px] text-smoke tracking-wider">
                        Don&apos;t have an account? <Link href="/auth/create-account" className="text-ink font-bold hover:text-saffron transition-colors">Sign Up</Link>
                    </p>

                </BentoCard>

            </div>
        </div>
    );
}
