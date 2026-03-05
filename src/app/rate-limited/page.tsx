"use client";
import Link from "next/link";
import { IconShipScore } from "@/components/icons";

export default function RateLimitedPage() {
    return (
        <div className="min-h-screen bg-obsidian flex items-center justify-center text-white font-sans">
            <div className="text-center"><div className="text-6xl mb-6"><IconShipScore className="w-5 h-5" /></div><h1 className="font-clash font-bold text-4xl mb-4 text-yellow-400">RATE LIMITED</h1><p className="font-mono text-sm text-white/40 max-w-md mx-auto mb-8">Too many requests. The Forge needs a moment to catch up. Try again in 60 seconds.</p><div className="font-mono text-4xl text-yellow-400/60 mb-8">429</div><Link href="/" className="inline-block px-8 py-3 bg-lime text-obsidian font-clash font-bold rounded-bento-sm">RETURN TO BASE</Link></div>
        </div>
    );
}
