"use client";
import { BentoCard, ForgeButton } from "@/components/forge";
export default function DataExportPage() {
    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans">
            <main className="max-w-4xl mx-auto px-6 py-32">
                <h1 className="font-clash font-bold text-4xl mb-2">Data Export</h1>
                <p className="font-mono text-white/50 mb-12">Your data belongs to you. Download everything.</p>
                <div className="space-y-6">
                    {[
                        { label: "Ship Log", desc: "All shipped artifacts, DNA cards, and scores", formats: ["JSON", "CSV"] },
                        { label: "Peer Reviews", desc: "All received and given reviews", formats: ["JSON", "PDF"] },
                        { label: "Failure Vault", desc: "All post-mortems and lessons learned", formats: ["JSON", "MD"] },
                        { label: "Reputation History", desc: "Score timeline, decay events, stake records", formats: ["JSON", "CSV"] },
                        { label: "Full Account Dump", desc: "Everything. Profile, projects, messages, all data.", formats: ["JSON"] },
                    ].map(item => (
                        <BentoCard key={item.label} className="p-6 flex items-center justify-between">
                            <div><h3 className="font-clash font-semibold text-lg">{item.label}</h3><p className="font-mono text-xs text-white/40">{item.desc}</p></div>
                            <div className="flex gap-2">{item.formats.map(f => <ForgeButton key={f} variant="ghost" size="sm">{f} ↓</ForgeButton>)}</div>
                        </BentoCard>
                    ))}
                </div>
            </main>
        </div>
    );
}
