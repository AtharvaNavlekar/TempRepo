"use client";
import Link from "next/link";
import { IconLock } from "@/components/icons";

export default function AccessDeniedPage() {
    return (
        <div className="min-h-screen bg-obsidian flex items-center justify-center text-white font-sans">
            <div className="text-center"><div className="text-6xl mb-6"><IconLock className="w-5 h-5" /></div><h1 className="font-clash font-bold text-4xl mb-4 text-acid">ACCESS DENIED</h1><p className="font-mono text-sm text-white/40 max-w-md mx-auto mb-8">You don&apos;t have authorization to view this resource. Your Ship Score or Guild rank may be insufficient.</p><Link href="/" className="inline-block px-8 py-3 bg-lime text-obsidian font-clash font-bold rounded-bento-sm">RETURN TO BASE</Link></div>
        </div>
    );
}
