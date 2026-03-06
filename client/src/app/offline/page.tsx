"use client";

import { IconSignal } from "@/components/icons";

export default function OfflinePage() {
    return (
        <div className="min-h-screen bg-obsidian flex items-center justify-center text-white font-sans">
            <div className="text-center"><div className="text-6xl mb-6"><IconSignal className="w-5 h-5" /></div><h1 className="font-clash font-bold text-4xl mb-4">SIGNAL LOST</h1><p className="font-mono text-sm text-white/40 max-w-md mx-auto mb-8">You appear to be offline. Reconnect to continue building.</p><button onClick={() => location.reload()} className="px-8 py-3 bg-lime text-obsidian font-clash font-bold rounded-bento-sm">RETRY CONNECTION</button></div>
        </div>
    );
}
