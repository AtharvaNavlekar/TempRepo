"use client";
import Link from "next/link";

export default function ServerErrorPage() {
    return (
        <div className="min-h-screen bg-obsidian flex items-center justify-center text-white font-sans">
            <div className="text-center">
                <h1 className="font-clash font-bold text-[12rem] leading-none text-acid/10">500</h1>
                <h2 className="font-clash font-bold text-3xl -mt-8 mb-4 text-acid">SYSTEM MELTDOWN</h2>
                <p className="font-mono text-sm text-white/40 mb-8 max-w-md mx-auto">Something catastrophic happened. Our engineers are already shipping a fix.</p>
                <Link href="/" className="inline-block px-8 py-3 bg-acid text-obsidian font-clash font-bold rounded-bento-sm">RETURN TO BASE</Link>
            </div>
        </div>
    );
}
