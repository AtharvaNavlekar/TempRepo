"use client";
import { BentoCard, ForgeButton, ShipScoreCounter } from "@/components/forge";
import { useRouter } from "next/navigation";
import { IconRocket } from "@/components/icons";
export default function ShipSubmissionPage() {
    const router = useRouter();
    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans">
            <main className="max-w-4xl mx-auto px-6 py-32">
                <h1 className="font-clash font-bold text-5xl mb-2 text-lime">Submit Your Ship</h1>
                <p className="font-mono text-white/50 mb-12">The final verification step. Once submitted, your artifact enters the public ledger.</p>
                <form className="space-y-8" onSubmit={e => { e.preventDefault(); router.push("/feed"); }}>
                    <BentoCard className="p-8 text-center bg-gradient-to-br from-lime/5 to-transparent border-lime/20">
                        <h3 className="font-mono text-xs uppercase tracking-widest text-lime/70 mb-4">Projected Ship Score</h3>
                        <ShipScoreCounter value={2400} size="lg" />
                    </BentoCard>
                    <BentoCard className="p-8 space-y-6">
                        <div><label className="font-mono text-xs text-white/50 uppercase tracking-widest mb-2 block">Ship Summary</label><textarea placeholder="Summarize what was built and why it matters..." className="w-full h-24 bg-black/60 border border-white/10 rounded-bento-sm p-4 font-mono text-white focus:border-lime outline-none resize-none" required /></div>
                        <div><label className="font-mono text-xs text-white/50 uppercase tracking-widest mb-2 block">Proof Link (GitHub/Figma/Live URL)</label><input type="url" placeholder="https://..." className="w-full bg-black/60 border border-white/10 rounded-bento-sm p-4 font-mono text-white focus:border-lime outline-none" required /></div>
                    </BentoCard>
                    <div className="flex justify-end gap-4">
                        <ForgeButton variant="ghost" type="button" onClick={() => router.back()}>CANCEL</ForgeButton>
                        <ForgeButton variant="primary" type="submit"><IconRocket className="w-4 h-4 inline" /> SHIP IT</ForgeButton>
                    </div>
                </form>
            </main>
        </div>
    );
}
