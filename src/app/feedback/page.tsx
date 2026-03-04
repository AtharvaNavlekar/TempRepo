"use client";
import { BentoCard, ForgeButton } from "@/components/forge";
import { useState } from "react";

export default function FeedbackPage() {
    const [type, setType] = useState("BUG");
    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans">
            <main className="max-w-3xl mx-auto px-6 py-32">
                <h1 className="font-clash font-bold text-5xl mb-2">Feedback</h1>
                <p className="font-mono text-white/50 mb-12">Help us make this better. Every report is read by a human.</p>
                <form className="space-y-6" onSubmit={e => e.preventDefault()}>
                    <BentoCard className="p-8 space-y-6">
                        <div>
                            <label className="font-mono text-xs text-white/50 uppercase tracking-widest mb-3 block">Type</label>
                            <div className="flex gap-2">
                                {["BUG", "FEATURE", "UX ISSUE", "OTHER"].map(t => (
                                    <button key={t} type="button" onClick={() => setType(t)} className={`px-4 py-2 font-mono text-xs uppercase tracking-widest rounded-bento-sm border transition-colors ${type === t ? "bg-lime/10 border-lime/40 text-lime" : "border-white/10 text-white/40 hover:text-white"}`}>{t}</button>
                                ))}
                            </div>
                        </div>
                        <div><label className="font-mono text-xs text-white/50 uppercase tracking-widest mb-2 block">Subject</label><input placeholder="Brief summary..." className="w-full bg-black/60 border border-white/10 rounded-bento-sm p-3 font-mono text-white focus:border-lime outline-none" required /></div>
                        <div><label className="font-mono text-xs text-white/50 uppercase tracking-widest mb-2 block">Details</label><textarea placeholder="Describe in detail..." className="w-full h-32 bg-black/60 border border-white/10 rounded-bento-sm p-3 font-mono text-white focus:border-lime outline-none resize-none" required /></div>
                    </BentoCard>
                    <ForgeButton variant="primary" className="w-full py-4">SUBMIT FEEDBACK</ForgeButton>
                </form>
            </main>
        </div>
    );
}
