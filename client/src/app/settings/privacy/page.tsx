"use client";
import { BentoCard, ForgeButton } from "@/components/forge";
export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans">
            <main className="max-w-4xl mx-auto px-6 py-32">
                <h1 className="font-clash font-bold text-4xl mb-2">Privacy Controls</h1>
                <p className="font-mono text-white/50 mb-12">Decide what&apos;s public, what&apos;s private, and who can see your work.</p>
                <div className="space-y-6">
                    {[
                        { label: "Ship Log Visibility", desc: "Who can see your public ship log", value: "Public" },
                        { label: "Failure Vault", desc: "Who can see your failure post-mortems", value: "Guild Only" },
                        { label: "Skill Heatmap", desc: "Show your skill levels on your profile", value: "Public" },
                        { label: "Peer Reviews", desc: "Display received reviews on your profile", value: "Public" },
                        { label: "Availability Calendar", desc: "Show your sprint capacity to others", value: "Connections Only" },
                    ].map(item => (
                        <BentoCard key={item.label} className="p-6 flex items-center justify-between">
                            <div><h3 className="font-clash font-semibold">{item.label}</h3><p className="font-mono text-xs text-white/40">{item.desc}</p></div>
                            <select defaultValue={item.value} className="bg-black/60 border border-white/10 rounded-bento-sm p-2 font-mono text-sm text-white focus:border-lime outline-none"><option>Public</option><option>Guild Only</option><option>Connections Only</option><option>Private</option></select>
                        </BentoCard>
                    ))}
                </div>
                <div className="mt-8 text-right"><ForgeButton variant="primary">SAVE PRIVACY SETTINGS</ForgeButton></div>
            </main>
        </div>
    );
}
