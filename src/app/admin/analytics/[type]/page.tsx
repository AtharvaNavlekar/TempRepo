"use client";
import { BentoCard, GlitchText } from "@/components/forge";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
const ANALYTICS_DATA: Record<string, { title: string; icon: string; metrics: { label: string; value: string; change: string }[] }> = {
    overview: { title: "Overview", icon: "IconChart", metrics: [{ label: "Total Builders", value: "14,200", change: "+342 this week" }, { label: "Total Ships", value: "89,700", change: "+1,204 this week" }, { label: "Global Score", value: "2.8M", change: "+42K this week" }, { label: "Avg Session", value: "24m", change: "+3m vs last week" }] },
    engagement: { title: "Engagement", icon: "IconFlame", metrics: [{ label: "DAU", value: "4,200", change: "+12%" }, { label: "WAU", value: "8,900", change: "+8%" }, { label: "Avg Ships/User", value: "6.3", change: "+0.4" }, { label: "Bounce Rate", value: "12%", change: "-2%" }] },
    retention: { title: "Retention", icon: "IconActivity", metrics: [{ label: "D1 Retention", value: "78%", change: "+3%" }, { label: "D7 Retention", value: "52%", change: "+1%" }, { label: "D30 Retention", value: "34%", change: "+2%" }, { label: "Churn Rate", value: "4.2%", change: "-0.8%" }] },
    revenue: { title: "Revenue", icon: "IconHire", metrics: [{ label: "MRR", value: "$42K", change: "+$3.2K" }, { label: "Platform Fees", value: "$8.4K", change: "+$600" }, { label: "Escrow Volume", value: "$142K", change: "+$21K" }, { label: "Avg Bounty", value: "$2,100", change: "+$200" }] },
    guilds: { title: "Guild Analytics", icon: "IconUsers", metrics: [{ label: "Active Guilds", value: "342", change: "+18" }, { label: "Largest Guild", value: "3,100", change: "Design Guild" }, { label: "Most Active", value: "React", change: "142 projects" }, { label: "New Guilds", value: "12", change: "this month" }] },
    growth: { title: "Growth", icon: "IconTrending", metrics: [{ label: "New Sign-ups", value: "890", change: "+24% MoM" }, { label: "Activation Rate", value: "67%", change: "+5%" }, { label: "Referrals", value: "234", change: "+42%" }, { label: "Viral Coefficient", value: "1.2", change: "+0.1" }] },
};

const NAV = Object.keys(ANALYTICS_DATA);

export default function AnalyticsPage() {
    const params = useParams();
    const type = (params?.type as string) || "overview";
    const data = ANALYTICS_DATA[type] || ANALYTICS_DATA.overview;

    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans">
            <main className="max-w-6xl mx-auto px-6 py-32">
                <h1 className="font-clash font-bold text-5xl mb-8"><GlitchText text={`${data.title.toUpperCase()} ANALYTICS`} /></h1>

                <div className="flex flex-wrap gap-2 mb-12">
                    {NAV.map(key => (
                        <Link key={key} href={`/admin/analytics/${key}`}>
                            <span className={`px-4 py-2 font-mono text-xs uppercase tracking-widest rounded-bento-sm border cursor-pointer transition-colors ${key === type ? "bg-lime/10 border-lime/40 text-lime" : "border-white/10 text-white/40 hover:text-white"}`}>{key}</span>
                        </Link>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {data.metrics.map((m, i) => (
                        <motion.div key={m.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                            <BentoCard className="p-6 text-center">
                                <p className="font-mono text-xs uppercase tracking-widest text-white/40 mb-3">{m.label}</p>
                                <p className="font-clash font-bold text-4xl text-lime">{m.value}</p>
                                <p className="font-mono text-xs text-white/40 mt-2">{m.change}</p>
                            </BentoCard>
                        </motion.div>
                    ))}
                </div>

                <BentoCard className="mt-8 p-8">
                    <h3 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-6">Trend Graph (30 Days)</h3>
                    <div className="h-48 flex items-end gap-1">
                        {Array.from({ length: 30 }, (_, i) => {
                            const h = 20 + Math.random() * 80;
                            return <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: i * 0.02, type: "spring" }} className="flex-1 bg-lime/20 rounded-t hover:bg-lime/40 transition-colors cursor-pointer" />;
                        })}
                    </div>
                    <div className="flex justify-between mt-2 font-mono text-[10px] text-white/30"><span>30d ago</span><span>Today</span></div>
                </BentoCard>
            </main>
        </div>
    );
}
