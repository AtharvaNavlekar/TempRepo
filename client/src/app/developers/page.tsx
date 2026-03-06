"use client";
import { BentoCard, ForgeButton, TerminalBlock } from "@/components/forge";
const API_ENDPOINTS = [
    { method: "GET", path: "/api/v1/score/:userId", desc: "Get a builder's Ship Score" },
    { method: "GET", path: "/api/v1/shiplog/:userId", desc: "Get a builder's public Ship Log" },
    { method: "POST", path: "/api/v1/verify/:artifactId", desc: "Verify an artifact's fingerprint" },
    { method: "GET", path: "/api/v1/guilds", desc: "List all guilds" },
    { method: "POST", path: "/api/v1/bounties", desc: "Create a new bounty (Company only)" },
    { method: "GET", path: "/api/v1/pulse", desc: "Stream real-time ecosystem events" },
];

const METHOD_COLORS: Record<string, string> = { GET: "text-lime", POST: "text-cyber", PUT: "text-yellow-400", DELETE: "text-acid" };

export default function DevelopersPage() {
    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans">
            <main className="max-w-5xl mx-auto px-6 py-32">
                <h1 className="font-clash font-bold text-5xl mb-2">Developer API</h1>
                <p className="font-mono text-white/50 mb-12">Build on top of CollabRise. Access the same data that powers the Forge.</p>

                <BentoCard className="p-8 mb-8">
                    <h3 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-4">Your API Key</h3>
                    <div className="flex gap-4"><input readOnly value="cr_live_sk_xxxxxxxxxxxxxxxxxxxx" className="flex-1 bg-black/60 border border-white/10 rounded-bento-sm p-3 font-mono text-lime text-sm" /><ForgeButton variant="ghost" size="sm">REGENERATE</ForgeButton></div>
                </BentoCard>

                <h3 className="font-clash font-semibold text-xl mb-4">Endpoints</h3>
                <div className="space-y-2">
                    {API_ENDPOINTS.map(ep => (
                        <BentoCard key={ep.path} className="p-4 flex items-center gap-4 hover:border-lime/20 cursor-pointer">
                            <span className={`font-mono text-xs font-bold w-12 ${METHOD_COLORS[ep.method]}`}>{ep.method}</span>
                            <code className="font-mono text-sm text-white/70 flex-1">{ep.path}</code>
                            <span className="font-mono text-xs text-white/30">{ep.desc}</span>
                        </BentoCard>
                    ))}
                </div>
            </main>
        </div>
    );
}
