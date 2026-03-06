"use client";
import { BentoCard, ForgeButton, PulseTag } from "@/components/forge";
const APPS = [
    { name: "GitHub", icon: "IconGitBranch", status: "live" as const, connected: true, lastSync: "2m ago" },
    { name: "Figma", icon: "IconPalette", status: "live" as const, connected: true, lastSync: "1h ago" },
    { name: "Stripe", icon: "IconWallet", status: "shipped" as const, connected: true, lastSync: "1d ago" },
    { name: "Linear", icon: "IconTarget", status: "building" as const, connected: false, lastSync: "N/A" },
    { name: "Notion", icon: "IconFile", status: "building" as const, connected: false, lastSync: "N/A" },
    { name: "Discord", icon: "IconCpu", status: "building" as const, connected: false, lastSync: "N/A" },
];

export default function IntegrationsPage() {
    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans">
            <main className="max-w-4xl mx-auto px-6 py-32">
                <h1 className="font-clash font-bold text-4xl mb-2">Connected Apps</h1>
                <p className="font-mono text-white/50 mb-12">Manage your integrations. Connected apps feed your Verification Oracle.</p>
                <div className="space-y-4">
                    {APPS.map(app => (
                        <BentoCard key={app.name} className="p-6 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <span className="text-2xl">{app.icon}</span>
                                <div><h3 className="font-clash font-bold text-lg">{app.name}</h3><p className="font-mono text-xs text-white/40">Last sync: {app.lastSync}</p></div>
                            </div>
                            <div className="flex items-center gap-4">
                                <PulseTag status={app.status} label={app.connected ? "CONNECTED" : "AVAILABLE"} />
                                <ForgeButton variant={app.connected ? "ghost" : "primary"} size="sm">{app.connected ? "DISCONNECT" : "CONNECT"}</ForgeButton>
                            </div>
                        </BentoCard>
                    ))}
                </div>
            </main>
        </div>
    );
}
