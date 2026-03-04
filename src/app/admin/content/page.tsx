"use client";
import { BentoCard, ForgeButton, PulseTag } from "@/components/forge";
import { motion } from "framer-motion";
import { IconStar } from "@/components/icons";

const GUILDS_DATA = [
    { name: "React Guild", members: 2400, status: "live" as const, projects: 142, featured: true },
    { name: "Rust Guild", members: 1800, status: "live" as const, projects: 89, featured: true },
    { name: "Design Guild", members: 3100, status: "live" as const, projects: 210, featured: false },
    { name: "Culinary Guild", members: 890, status: "building" as const, projects: 45, featured: false },
];

export default function ContentManagementPage() {
    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans">
            <main className="max-w-5xl mx-auto px-6 py-32">
                <h1 className="font-clash font-bold text-4xl mb-2">Content & Guild Management</h1>
                <p className="font-mono text-white/50 mb-12">Manage guilds, featured content, and platform announcements.</p>

                <BentoCard className="p-8 mb-8">
                    <div className="flex justify-between items-center mb-6"><h3 className="font-clash font-semibold text-xl">Platform Announcement</h3><ForgeButton variant="primary" size="sm">PUBLISH</ForgeButton></div>
                    <textarea placeholder="Write a global announcement..." className="w-full h-20 bg-black/60 border border-white/10 rounded-bento-sm p-4 font-mono text-white focus:border-lime outline-none resize-none" />
                </BentoCard>

                <h3 className="font-clash font-semibold text-xl mb-4">Guild Management</h3>
                <div className="space-y-3">
                    {GUILDS_DATA.map((g, i) => (
                        <motion.div key={g.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                            <BentoCard className="p-5 flex items-center justify-between">
                                <div className="flex items-center gap-4"><PulseTag status={g.status} /><div><h3 className="font-clash font-bold">{g.name}</h3><p className="font-mono text-xs text-white/30">{g.members.toLocaleString()} members · {g.projects} projects</p></div></div>
                                <div className="flex items-center gap-3">{g.featured && <span className="font-mono text-xs text-lime"><IconStar className="w-4 h-4 inline" /> FEATURED</span>}<ForgeButton variant="ghost" size="sm">EDIT</ForgeButton></div>
                            </BentoCard>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
}
