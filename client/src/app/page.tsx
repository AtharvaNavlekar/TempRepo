"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Zap, Users, ShieldCheck, TrendingUp, Star } from "lucide-react";

/* ─── Feature rows ─── */
const FEATURES = [
    {
        overline: "Proof of Work",
        title: "Your Ship Score replaces your resume.",
        body: "Every commit, every pixel, every shipped project is quantified and verified through metadata analysis. Employers see irrefutable output — not self-reported claims.",
        icon: ShieldCheck,
        gradient: "mesh-gradient-warm",
        textLight: true,
    },
    {
        overline: "Build Together",
        title: "Find your team in seconds.",
        body: "AI-powered matching surfaces builders whose skills, timezone, and work style complement yours. Form guilds, compete in war rooms, and ship faster together.",
        icon: Users,
        gradient: "mesh-gradient-purple",
        textLight: true,
    },
    {
        overline: "Get Hired",
        title: "Companies skip the interview.",
        body: "Your Ship Log is your living portfolio. Recruiters browse real shipped work — not a polished PDF. The best builders get found, not filtered out.",
        icon: TrendingUp,
        gradient: "mesh-gradient-warm",
        textLight: true,
    },
];

/* ─── Stats ─── */
const STATS = [
    { value: "14.2K", label: "Builders" },
    { value: "89.7K", label: "Artifacts Shipped" },
    { value: "2,847", label: "Active Projects" },
    { value: "342", label: "Communities" },
];

/* ─── Testimonials ─── */
const TESTIMONIALS = [
    {
        quote: "I got my first freelance contract 3 weeks after joining. My Ship Score spoke louder than my degree.",
        name: "Arjun M.",
        role: "Frontend Builder",
    },
    {
        quote: "CollabRise cut our hiring time in half. We see actual work — not just promises on a resume.",
        name: "Priya S.",
        role: "Engineering Lead, Startup",
    },
    {
        quote: "The guild system changed how I collaborate. Found three long-term partners within a month.",
        name: "Dani K.",
        role: "Full-Stack & Founding Member",
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
            <section className="mesh-gradient relative flex flex-col items-center justify-center text-center px-6 py-36 md:py-48 min-h-[90vh]">
                {/* Ornamental divider (inspired by Sarvam's decorative motif) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-8"
                    aria-hidden="true"
                >
                    <svg width="96" height="32" viewBox="0 0 96 32" fill="none" className="text-[#131313]/20">
                        <path d="M48 4 C30 4 16 16 4 16 C16 16 30 28 48 28 C66 28 80 16 92 16 C80 16 66 4 48 4Z" stroke="currentColor" strokeWidth="1.2" fill="none" />
                        <circle cx="48" cy="16" r="3" fill="currentColor" opacity="0.4" />
                    </svg>
                </motion.div>

                {/* Pill badge */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <span className="inline-block mb-6 px-4 py-1.5 rounded-full bg-white/70 border border-black/[0.08] text-[12px] font-medium text-[#555] tracking-wide shadow-sm backdrop-blur-sm">
                        For Builders · For Freelancers · For Founders
                    </span>
                </motion.div>

                {/* Main headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-[#131313] leading-[1.08] tracking-tight max-w-4xl mx-auto mb-6"
                >
                    The professional network for people who{" "}
                    <em className="not-italic" style={{ fontStyle: "italic" }}>ship</em>.
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.45 }}
                    className="text-[17px] text-[#555] leading-relaxed max-w-xl mx-auto mb-10"
                >
                    Build irrefutable proof of your skills, earn a verified Ship Score,
                    and let your work replace your résumé — forever.
                </motion.p>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.65 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-3"
                >
                    <Link href="/auth/create-account" className="btn-pill-primary text-[15px] px-8 py-3.5 gap-2">
                        Start Building Free
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                    <Link href="/feed" className="btn-pill-secondary text-[15px] px-8 py-3.5">
                        Explore Projects
                    </Link>
                </motion.div>

                {/* Social proof micro-text */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="mt-8 text-[12px] text-[#999] flex items-center gap-1.5 justify-center"
                >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />
                    No credit card required · Free forever for builders
                </motion.p>

                {/* Overline label below hero */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    className="absolute bottom-10 overline-label"
                >
                    TRUSTED BY BUILDERS WORLDWIDE
                </motion.p>
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
                            <p className="font-serif text-4xl font-normal text-[#131313] mb-1">{stat.value}</p>
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
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className={`light-card overflow-hidden flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
                            >
                                {/* Visual panel */}
                                <div className={`${feat.gradient} flex items-center justify-center p-16 md:p-20 md:w-2/5 shrink-0`}>
                                    <Icon className="w-20 h-20 text-white/80 drop-shadow-lg" aria-hidden="true" />
                                </div>

                                {/* Text panel */}
                                <div className="p-10 md:p-14 flex flex-col justify-center">
                                    <p className="overline-label mb-3">{feat.overline}</p>
                                    <h2 className="font-serif text-3xl md:text-4xl font-normal text-[#131313] leading-tight mb-4">
                                        {feat.title}
                                    </h2>
                                    <p className="text-[15px] text-[#555] leading-relaxed max-w-md mb-8">
                                        {feat.body}
                                    </p>
                                    <Link
                                        href="/auth/create-account"
                                        className="inline-flex items-center gap-2 text-[13px] font-medium text-[#131313] hover:gap-3 transition-all group"
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
                        <h2 className="font-serif text-4xl md:text-5xl font-normal text-[#131313] leading-tight">
                            Three steps to proof.
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                step: "01",
                                title: "Create your Ship Log",
                                body: "Your public portfolio that logs every project, commit, and milestone in real time.",
                                icon: Zap,
                            },
                            {
                                step: "02",
                                title: "Ship & get verified",
                                body: "Our system audits your metadata — Git history, file diffs, word counts — and issues a Ship Score.",
                                icon: ShieldCheck,
                            },
                            {
                                step: "03",
                                title: "Get hired or go freelance",
                                body: "Share your Ship Log link instead of a résumé. Let verified output do the talking.",
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
                                    <StepIcon className="w-6 h-6 text-[#131313] mb-4" aria-hidden="true" />
                                    <h3 className="font-serif text-xl font-normal text-[#131313] mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-[14px] text-[#555] leading-relaxed">{item.body}</p>
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
                        <p className="overline-label mb-4">Trusted by Builders</p>
                        <h2 className="font-serif text-4xl md:text-5xl font-normal text-[#131313]">
                            What they&apos;re shipping.
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
                                    <p className="text-[13px] font-semibold text-[#131313]">{t.name}</p>
                                    <p className="text-[12px] text-[#999]">{t.role}</p>
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
                    <p className="overline-label mb-5">Ready to ship?</p>
                    <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal text-[#131313] leading-tight mb-8">
                        Stop applying.<br />Start building.
                    </h2>
                    <Link href="/auth/create-account" className="btn-pill-primary text-[15px] px-10 py-4 gap-2">
                        Join CollabRise Free
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                </motion.div>
            </section>
        </main>
    );
}
