"use client";
import { BentoCard, ForgeButton, PulseTag } from "@/components/forge";
import { IconSignal } from "@/components/icons";
export default function LiveBuildPage() {
    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans">
            <main className="max-w-6xl mx-auto px-6 py-32">
                <div className="flex items-center gap-4 mb-8"><h1 className="font-clash font-bold text-4xl">Live Build Room</h1><PulseTag status="live" label="STREAMING" /></div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <BentoCard colSpan={2} className="aspect-video flex items-center justify-center bg-black/60 border-lime/20">
                        <div className="text-center"><div className="text-6xl mb-4"><IconSignal className="w-5 h-5" /></div><p className="font-mono text-white/30 text-sm">LIVE STREAM FEED</p><p className="font-mono text-xs text-white/20 mt-2">Twitch-style build session viewer</p></div>
                    </BentoCard>
                    <BentoCard className="p-6">
                        <h3 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-4">Live Chat</h3>
                        <div className="space-y-3 mb-4 h-[300px] overflow-y-auto">
                            {["0xNeo: Refactoring the auth module now", "0xAlice: LGTM on the PR", "DevMarcus: Pushing the API changes", "System: Milestone 3 at 67%"].map((msg, i) => (
                                <div key={i} className="font-mono text-xs text-white/60 p-2 bg-white/5 rounded">{msg}</div>
                            ))}
                        </div>
                        <div className="flex gap-2"><input placeholder="Type..." className="flex-1 bg-black/60 border border-white/10 rounded p-2 font-mono text-xs text-white outline-none focus:border-lime" /><ForgeButton variant="primary" size="sm">SEND</ForgeButton></div>
                    </BentoCard>
                </div>
            </main>
        </div>
    );
}
