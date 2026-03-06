"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Zap, Users, ShieldCheck, TrendingUp, Star } from "lucide-react";

/* ─── Feature rows ─── */
const FEATURES = [
    {
        overline: "Proof of Execution",
        title: "Your Ship Score replaces your pitch deck.",
        body: "Every project, every milestone, every growth metric is quantified and verified. Investors and partners see irrefutable execution — not just slides.",
        icon: ShieldCheck,
        gradient: "mesh-gradient-warm",
        textLight: true,
    },
    {
        overline: "Venture Together",
        title: "Find your co-founder in seconds.",
        body: "AI-powered matching surfaces founders whose skills, vision, and growth stage complement yours. Form guilds, launch ventures, and scale faster together.",
        icon: Users,
        gradient: "mesh-gradient-purple",
        textLight: true,
    },
    {
        overline: "Scale Fast",
        title: "Partners skip the due diligence.",
        body: "Your Ship Log is your living proof of concept. Ecosystems browse real traction — not a polished PDF. The best founders get noticed, not filtered out.",
        icon: TrendingUp,
        gradient: "mesh-gradient-warm",
        textLight: true,
    },
];

/* ─── Stats ─── */
const STATS = [
    { value: "14.2K", label: "Founders" },
    { value: "89.7K", label: "Ventures Launched" },
    { value: "2,847", label: "Active Startups" },
    { value: "342", label: "Guilds" },
];

/* ─── Testimonials ─── */
const TESTIMONIALS = [
    {
        quote: "I found my co-founder and closed my first angel round 3 weeks after joining. My Ship Score did the talking.",
        name: "Arjun M.",
        role: "Venture Lead",
    },
    {
        quote: "CollabRise cut our partner search time in half. We see actual traction — not just promises on a slide.",
        name: "Priya S.",
        role: "Founder, Stealth Startup",
    },
    {
        quote: "The guild system changed how I scale ventures. Found three strategic partners within a month.",
        name: "Dani K.",
        role: "Solopreneur & Founding Member",
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0 },
};

export default function HomePage() {
    return (
        <main
            className="site-light min-h-screen overflow-hidden"
            style={{ background: "var(--bg-base)" }}
        >
            {/* ══════════════════════════════════════
             HERO
            ══════════════════════════════════════ */}
            <section className="mesh-gradient relative flex flex-col items-center justify-center text-center px-6 pt-24 pb-48 md:pt-32 md:pb-56 min-h-[70vh]">


                {/* Pill badge */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-4"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-white/70 border border-black/[0.08] text-[12px] font-medium text-[#4A4A4A] tracking-wide shadow-sm backdrop-blur-sm">
                        For Founders · For Solopreneurs · For Entrepreneurs
                    </span>
                </motion.div>

                {/* Main headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-[#1A1A1A] leading-[1.08] tracking-tight max-w-4xl mx-auto mb-6 relative z-10"
                >
                    The professional network for people who{" "}
                    <span className="sketch-underline font-serif italic text-inherit">ship</span>.
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.45 }}
                    className="text-[17px] text-[#4A4A4A] leading-relaxed max-w-xl mx-auto mb-10 relative z-10"
                >
                    Create irrefutable proof of your ventures, earn a verified Ship Score,
                    and let your traction replace your pitch deck — forever.
                </motion.p>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-3 relative z-10"
                >
                    <Link href="/auth/create-account" className="btn-pill-primary text-[15px] px-8 py-3.5 gap-2 shadow-lg hover:shadow-xl">
                        Start Launching Free
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                    <Link href="/feed" className="btn-pill-dark text-[15px] px-8 py-3.5">
                        Explore Ventures
                    </Link>
                </motion.div>

                {/* Social proof micro-text */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="mt-8 text-[12px] text-[#8C8C8C] flex items-center gap-1.5 justify-center"
                >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />
                    No credit card required · Free forever for entrepreneurs
                </motion.p>

                {/* Overline label below hero */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    className="absolute bottom-16 sm:bottom-20 overline-label text-[#E86A33] z-10"
                >
                    TRUSTED BY ENTREPRENEURS WORLDWIDE
                </motion.p>

                {/* Architectural Skyline Line Art */}
                <div
                    className="absolute bottom-0 left-0 w-full overflow-hidden text-[#E86A33]/30 pointer-events-none flex justify-center items-end" aria-hidden="true"
                >
                    <svg width="1200" height="80" viewBox="0 0 1200 80" fill="none" className="min-w-[1200px]" preserveAspectRatio="xMidYMax meet">
                        {/* Outer architectural silhouette */}
                        <path d="M0,80 L0,70 L50,70 L50,60 L100,60 L100,70 L150,70 L150,50 L200,50 L200,70 L250,70 L250,40 Q275,20 300,40 L300,70 L350,70 L350,30 L400,30 L400,70 L450,70 L450,50 L500,50 L500,70 L550,70 L550,60 L600,60 L600,70 L650,70 L650,40 Q675,20 700,40 L700,70 L750,70 L750,30 L800,30 L800,70 L850,70 L850,50 L900,50 L900,70 L950,70 L950,60 L1000,60 L1000,70 L1050,70 L1050,40 Q1075,20 1100,40 L1100,70 L1150,70 L1150,60 L1200,60 L1200,80 Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
                        {/* Inner architectural details */}
                        <path d="M150,70 L150,60 L200,60 L200,70 M350,70 L350,40 L400,40 L400,70 M450,70 L450,60 L500,60 L500,70 M750,70 L750,40 L800,40 L800,70 M850,70 L850,60 L900,60 L900,70 M650,70 L650,50 L700,50 L700,70 M250,70 L250,50 L300,50 L300,70 M1050,70 L1050,50 L1100,50 L1100,70 M365,70 L365,50 M385,70 L385,50 M765,70 L765,50 M785,70 L785,50" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                    </svg>
                </div>
            </section>

            {/* ══════════════════════════════════════
             STATS STRIP
            ══════════════════════════════════════ */}
            <section
                className="border-y border-black/[0.07] py-12 px-6"
                style={{ background: "var(--bg-surface)" }}
            >
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {STATS.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            <p className="font-serif text-4xl font-normal text-[#1A1A1A] mb-1">{stat.value}</p>
                            <p className="overline-label">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ══════════════════════════════════════
             FEATURE SPLIT SECTIONS
            ══════════════════════════════════════ */}
            <section className="py-24 px-6">
                <div className="max-w-6xl mx-auto space-y-8">
                    {FEATURES.map((feat, i) => {
                        const Icon = feat.icon;
                        const isEven = i % 2 === 0;
                        return (
                            <motion.div
                                key={feat.title}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className={`light-card group flex flex-col p-4 md:p-6 gap-8 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
                            >
                                {/* Visual panel (Sarvam style inner arch) */}
                                <div className={`${feat.gradient} flex items-center justify-center p-16 md:p-20 md:w-2/5 shrink-0 rounded-[4rem_4rem_1rem_1rem] md:rounded-[6rem_6rem_1rem_1rem] shadow-inner overflow-hidden relative group-hover:scale-[0.98] transition-transform duration-500`}>
                                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500" />
                                    <Icon className="w-20 h-20 text-white/80 drop-shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 ease-out" aria-hidden="true" />
                                </div>

                                {/* Text panel (Verified style airy white card) */}
                                <div className="p-6 md:p-14 flex flex-col justify-center">
                                    <p className="overline-label mb-3 text-[#E86A33]">{feat.overline}</p>
                                    <h2 className="font-serif text-3xl md:text-4xl font-normal text-[#1A1A1A] leading-tight mb-4">
                                        {feat.title}
                                    </h2>
                                    <p className="text-[15px] text-[#4A4A4A] leading-relaxed max-w-md mb-8">
                                        {feat.body}
                                    </p>
                                    <Link
                                        href="/auth/create-account"
                                        className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#1A1A1A] hover:text-[#E86A33] hover:gap-3 transition-all group"
                                    >
                                        Get started free
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* ══════════════════════════════════════
             HOW IT WORKS — 3-STEP
            ══════════════════════════════════════ */}
            <section
                className="py-24 px-6"
                style={{ background: "var(--bg-surface)" }}
            >
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-16"
                    >
                        <p className="overline-label mb-4">How It Works</p>
                        <h2 className="font-serif text-4xl md:text-5xl font-normal text-[#1A1A1A] leading-tight">
                            Three steps to proof.
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                step: "01",
                                title: "Create your Ship Log",
                                body: "Your public proof of concept that logs every venture, milestone, and pivot in real time.",
                                icon: Zap,
                            },
                            {
                                step: "02",
                                title: "Launch & get verified",
                                body: "Our system audits your execution metadata — Git history, growth metrics, traction data — and issues a Ship Score.",
                                icon: ShieldCheck,
                            },
                            {
                                step: "03",
                                title: "Scale or close deals",
                                body: "Share your Ship Log link instead of a pitch deck. Let verified traction do the talking.",
                                icon: Star,
                            },
                        ].map((item, i) => {
                            const StepIcon = item.icon;
                            return (
                                <motion.div
                                    key={item.step}
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.12 }}
                                    className="light-card p-8"
                                >
                                    <p className="font-serif text-6xl font-normal text-black/10 mb-4 leading-none">
                                        {item.step}
                                    </p>
                                    <StepIcon className="w-6 h-6 text-[#1A1A1A] mb-4" aria-hidden="true" />
                                    <h3 className="font-serif text-xl font-normal text-[#1A1A1A] mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-[14px] text-[#4A4A4A] leading-relaxed">{item.body}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════
             TESTIMONIALS
            ══════════════════════════════════════ */}
            <section className="py-24 px-6">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-14"
                    >
                        <p className="overline-label mb-4">Trusted by Founders</p>
                        <h2 className="font-serif text-4xl md:text-5xl font-normal text-[#1A1A1A]">
                            What they&apos;re launching.
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {TESTIMONIALS.map((t, i) => (
                            <motion.div
                                key={t.name}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="light-card p-8"
                            >
                                <div className="flex gap-0.5 mb-5" aria-label="5 out of 5 stars">
                                    {Array.from({ length: 5 }).map((_, si) => (
                                        <Star key={si} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                    ))}
                                </div>
                                <blockquote className="text-[15px] text-[#333] leading-relaxed mb-6 font-serif font-normal">
                                    &ldquo;{t.quote}&rdquo;
                                </blockquote>
                                <div>
                                    <p className="text-[13px] font-semibold text-[#1A1A1A]">{t.name}</p>
                                    <p className="text-[12px] text-[#8C8C8C]">{t.role}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════
             FINAL CTA BANNER
            ══════════════════════════════════════ */}
            <section className="mesh-gradient py-28 px-6 text-center">
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-2xl mx-auto"
                >
                    <p className="overline-label mb-5">Ready to launch?</p>
                    <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal text-[#1A1A1A] leading-tight mb-8">
                        Stop dreaming.<br />Start launching.
                    </h2>
                    <Link href="/auth/create-account" className="btn-pill-primary text-[15px] px-10 py-4 gap-2">
                        Join CollabRise Free
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                </motion.div>
            </section>
        </main >
    );
}
