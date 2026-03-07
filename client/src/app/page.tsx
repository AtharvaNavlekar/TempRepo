"use client";

import {
    motion,
    useMotionValue,
    useTransform,
    useScroll,
    useSpring,
    useReducedMotion,
    useInView,
} from "framer-motion";
import Link from "next/link";
import {
    ArrowRight, Zap, Dna, Lock, Skull, Swords, Coins, Sparkles,
    ArrowUpRight, ChevronDown, Play, Star, Quote, Shield, Flame,
    TrendingUp, Crown, Award, Gem, CheckCircle2, GitCommit, Layers,
    Users, BarChart3, Briefcase, Search, SlidersHorizontal,
} from "lucide-react";
import type { ReactNode } from "react";
import { useRef, useEffect, useState, useCallback } from "react";
import { LineDivider } from "@/components/landing/LineDivider";
import EntrepreneurTicker from "@/components/landing/EntrepreneurTicker";
import dynamic from "next/dynamic";

const Hero3D = dynamic(() => import("@/components/landing/Hero3D"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4 opacity-50">
            <div className="w-16 h-16 rounded-full border-t-2 border-r-2 border-[#C9A353] animate-spin" />
            <p className="dmsans text-[10px] tracking-widest uppercase text-[#C9A353]">Loading Artifact</p>
        </div>
    )
});

/* ══════════════════════════════════════════════════════════════════
   DESIGN TOKENS — Mobbin-luxury fusion
   Palette: Cream #F7F4EE · Ink #0D0D0D · Gold #C9A353 · Parchment #EDE8DA
══════════════════════════════════════════════════════════════════ */
const TOKENS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,700&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --cream:     #F7F4EE;
    --cream-2:   #F0EDE5;
    --parchment: #EDE8DA;
    --ink:       #0D0D0D;
    --ink-80:    rgba(13,13,13,0.80);
    --ink-40:    rgba(13,13,13,0.40);
    --ink-10:    rgba(13,13,13,0.07);
    --gold:      #C9A353;
    --gold-dim:  rgba(201,163,83,0.35);
    --gold-glow: rgba(201,163,83,0.10);
    --smoke:     rgba(13,13,13,0.48);
    --white:     #FFFFFF;
  }

  /* ── Type helpers ── */
  .plfd { font-family: 'Playfair Display', Georgia, serif; }
  .dmsans { font-family: 'DM Sans', system-ui, sans-serif; }

  /* ── Scroll bar ── */
  .c-scroll-bar {
    position: fixed; top:0; left:0; right:0; height:2px;
    background: linear-gradient(90deg, #C9A353, rgba(201,163,83,.3));
    transform-origin: left; z-index: 9999;
  }

  /* ── Grain ── */
  @keyframes grain { 0%,100%{transform:translate(0,0)} 20%{transform:translate(-1.5%,1%)} 40%{transform:translate(1%,-1.5%)} 60%{transform:translate(-1%,.5%)} 80%{transform:translate(1.5%,-.5%)} }
  .c-grain {
    position: fixed; inset:-50%; width:200%; height:200%;
    opacity:.028; pointer-events:none; z-index:9000;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    animation: grain 8s steps(10) infinite;
  }

  /* ── 3D Hero Animations ── */
  @keyframes orbit {
    0% { transform: rotateZ(0deg); }
    100% { transform: rotateZ(360deg); }
  }
  @keyframes orbit-reverse {
    0% { transform: rotateZ(360deg); }
    100% { transform: rotateZ(0deg); }
  }
  @keyframes float-3d {
    0%, 100% { transform: translateY(0) rotateX(0deg) rotateY(0deg); }
    25% { transform: translateY(-18px) rotateX(4deg) rotateY(-3deg); }
    50% { transform: translateY(-8px) rotateX(-2deg) rotateY(5deg); }
    75% { transform: translateY(-22px) rotateX(3deg) rotateY(-2deg); }
  }
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes rotate-slow {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .hero-3d-scene {
    perspective: 1200px;
    perspective-origin: 50% 40%;
    transform-style: preserve-3d;
  }
  .orbit-ring {
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(201,163,83,0.12);
    transform-style: preserve-3d;
  }
  .orbit-ring-1 {
    width: 580px; height: 580px;
    top: 50%; left: 50%;
    margin-top: -290px; margin-left: -290px;
    animation: orbit 45s linear infinite;
    border-color: rgba(201,163,83,0.1);
  }
  .orbit-ring-2 {
    width: 760px; height: 760px;
    top: 50%; left: 50%;
    margin-top: -380px; margin-left: -380px;
    animation: orbit-reverse 60s linear infinite;
    border-color: rgba(201,163,83,0.06);
  }
  .orbit-ring-3 {
    width: 420px; height: 420px;
    top: 50%; left: 50%;
    margin-top: -210px; margin-left: -210px;
    animation: orbit 35s linear infinite;
    border-color: rgba(201,163,83,0.15);
  }
  .float-card-3d {
    transform-style: preserve-3d;
    backface-visibility: hidden;
    animation: float-3d 6s ease-in-out infinite;
  }
  .gold-shimmer-text {
    background: linear-gradient(120deg, #C9A353 0%, #E5C97A 30%, #C9A353 50%, #A8843E 70%, #C9A353 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 4s ease infinite;
  }
  .hex-shape {
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  }

  /* ── Gold rules ── */
  .rule-gold  { height:1px; background:linear-gradient(90deg,transparent,rgba(201,163,83,.5) 20%,rgba(201,163,83,.5) 80%,transparent); }
  .rule-light { height:1px; background:rgba(13,13,13,0.07); }

  /* ── Buttons ── */
  .btn-primary {
    display:inline-flex; align-items:center; gap:10px;
    padding:14px 36px; border-radius:999px;
    background:#0D0D0D; color:#F7F4EE;
    font-family:'DM Sans',sans-serif; font-size:13px; font-weight:500;
    letter-spacing:.02em; text-decoration:none;
    border:1px solid transparent;
    position:relative; overflow:hidden;
    transition:all .4s cubic-bezier(.16,1,.3,1);
  }
  .btn-primary::after {
    content:''; position:absolute; inset:0;
    background:linear-gradient(135deg,rgba(201,163,83,.15),transparent 60%);
    opacity:0; transition:opacity .4s;
  }
  .btn-primary:hover { background:#1a1a1a; transform:translateY(-1px); box-shadow:0 8px 30px rgba(13,13,13,.18); }
  .btn-primary:hover::after { opacity:1; }

  .btn-secondary {
    display:inline-flex; align-items:center; gap:10px;
    padding:14px 36px; border-radius:999px;
    background:transparent; color:var(--ink);
    font-family:'DM Sans',sans-serif; font-size:13px; font-weight:500;
    letter-spacing:.02em; text-decoration:none;
    border:1px solid rgba(13,13,13,.15);
    transition:all .4s cubic-bezier(.16,1,.3,1);
  }
  .btn-secondary:hover { border-color:rgba(13,13,13,.35); background:rgba(13,13,13,.03); transform:translateY(-1px); }

  .btn-gold-outline {
    display:inline-flex; align-items:center; gap:10px;
    padding:14px 36px; border-radius:999px;
    background:transparent; color:#C9A353;
    font-family:'DM Sans',sans-serif; font-size:13px; font-weight:500;
    letter-spacing:.02em; text-decoration:none;
    border:1px solid rgba(201,163,83,.4);
    transition:all .4s cubic-bezier(.16,1,.3,1);
  }
  .btn-gold-outline:hover { border-color:rgba(201,163,83,.8); background:rgba(201,163,83,.05); }

  /* ── Labels ── */
  .eyebrow {
    display:inline-flex; align-items:center; gap:8px;
    font-family:'DM Sans',sans-serif; font-size:11px; font-weight:500;
    letter-spacing:.18em; text-transform:uppercase; color:#C9A353;
  }
  .eyebrow::before { content:''; width:24px; height:1px; background:currentColor; opacity:.5; }

  /* ── Venture mini cards (hero grid) ── */
  .venture-card {
    background:#fff; border-radius:16px;
    border:1px solid rgba(13,13,13,.06);
    padding:18px; position:relative; overflow:hidden;
    box-shadow:0 2px 16px rgba(13,13,13,.05);
    transition:transform .5s cubic-bezier(.16,1,.3,1), box-shadow .5s;
  }
  .venture-card:hover { transform:translateY(-4px); box-shadow:0 12px 40px rgba(13,13,13,.1); }
  .venture-card::after { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,transparent,#C9A353,transparent); opacity:0; transition:opacity .4s; }
  .venture-card:hover::after { opacity:1; }

  /* ── Feature section cards ── */
  .feature-screen {
    background:#fff; border-radius:24px;
    border:1px solid rgba(13,13,13,.07);
    overflow:hidden;
    box-shadow:0 4px 40px rgba(13,13,13,.08);
  }

  /* ── Protocol pill tag ── */
  .proto-tag {
    display:inline-block; padding:3px 10px; border-radius:999px;
    font-family:'DM Sans',sans-serif; font-size:10px; font-weight:500;
    letter-spacing:.12em; text-transform:uppercase;
    border:1px solid rgba(201,163,83,.25); color:#C9A353;
    background:rgba(201,163,83,.06);
  }

  /* ── Testimonial dense card ── */
  .tcard {
    background:#fff; border-radius:20px;
    border:1px solid rgba(13,13,13,.06); padding:28px;
    transition:box-shadow .4s, border-color .4s;
  }
  .tcard:hover { box-shadow:0 8px 40px rgba(13,13,13,.09); border-color:rgba(201,163,83,.15); }

  /* ── Stat strip ── */
  .stat-strip { border-top:1px solid var(--ink-10); border-bottom:1px solid var(--ink-10); }

  /* ── Vertical text ── */
  .vert { writing-mode:vertical-rl; transform:rotate(180deg); }

  /* ── Pulse dot ── */
  @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.85)} }
  .pulse-dot { animation:pulse-dot 2s ease-in-out infinite; }

  /* ── Floating card animate ── */
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
  .float-anim { animation:float 5s ease-in-out infinite; }

  /* ── Scroll-indicator line ── */
  @keyframes scroll-line { 0%{transform:scaleY(0);opacity:1} 100%{transform:scaleY(1);opacity:.2} }
  .scroll-line { animation:scroll-line 1.8s ease-in-out infinite; transform-origin:top; }
`;

/* ══════════════════════════════════════════════════════════════════
   HELPERS & MICRO COMPONENTS
══════════════════════════════════════════════════════════════════ */

function ScrollBar() {
    const { scrollYProgress } = useScroll();
    const sx = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });
    return <motion.div className="c-scroll-bar" style={{ scaleX: sx }} />;
}

function FadeUp({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
    const ref = useRef(null);
    const vis = useInView(ref, { once: true, margin: "-80px" });
    return (
        <motion.div ref={ref} className={className}
            initial={{ opacity: 0, y: 32 }}
            animate={vis ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}>
            {children}
        </motion.div>
    );
}

/* ══════════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════════ */

// Mini venture profiles for hero showcase grid
const HERO_VENTURES = [
    { name: "NeuralLeap", handle: "@priya.ventures", score: "3,241", tier: "Archon", tags: ["AI", "B2B"], commits: 847, verified: true, color: "#C9A353" },
    { name: "CarbonKart", handle: "@arjun.ventures", score: "2,847", tier: "Forge", tags: ["CleanTech"], commits: 612, verified: true, color: "#5B8A6F" },
    { name: "Raft", handle: "@sid.builds", score: "4,102", tier: "Archon", tags: ["Dev Tools"], commits: 1203, verified: true, color: "#4A6FA5" },
    { name: "StackMesh", handle: "@riya.codes", score: "1,890", tier: "Shield", tags: ["Infra"], commits: 431, verified: true, color: "#8B6BAE" },
    { name: "PulseHire", handle: "@kiran.hr", score: "2,190", tier: "Forge", tags: ["HR Tech"], commits: 389, verified: false, color: "#C9A353" },
    { name: "ShipFast", handle: "@dev.fast", score: "3,600", tier: "Archon", tags: ["SaaS"], commits: 924, verified: true, color: "#D4756B" },
    { name: "DataAtlas", handle: "@atlas.data", score: "1,540", tier: "Novice", tags: ["Analytics"], commits: 218, verified: false, color: "#5B8A6F" },
    { name: "Horizon", handle: "@horizon.ai", score: "5,011", tier: "Legend", tags: ["AI", "NLP"], commits: 2101, verified: true, color: "#C9A353" },
    { name: "VaultChain", handle: "@vault.web3", score: "2,388", tier: "Shield", tags: ["Web3"], commits: 566, verified: true, color: "#4A6FA5" },
];

const PROTOCOLS = [
    { icon: <Zap className="w-5 h-5" />, num: "01", title: "Venture Score", desc: "Every pitch, prototype, and pivot quantified into one living score.", stat: "12.4K", statLabel: "Scored" },
    { icon: <Dna className="w-5 h-5" />, num: "02", title: "Artifact DNA", desc: "Git commits, Figma layers, deploys — extracted and verified.", stat: "94%", statLabel: "Accuracy" },
    { icon: <Lock className="w-5 h-5" />, num: "03", title: "Commitment Contracts", desc: "Stake your reputation. Miss a milestone, you decay. Ship and compound.", stat: "3.2K", statLabel: "Active" },
    { icon: <Skull className="w-5 h-5" />, num: "04", title: "Failure Vault", desc: "Post-mortems that prove you learn. Investors read these first.", stat: "841", statLabel: "Logged" },
    { icon: <Swords className="w-5 h-5" />, num: "05", title: "Venture Guilds", desc: "Tribes built by craft. Rise through ranks by shipping together.", stat: "16", statLabel: "Guilds" },
    { icon: <Coins className="w-5 h-5" />, num: "06", title: "Launch-to-Hire", desc: "Companies see what you've built. Sprint challenges replace interviews.", stat: "₹48Cr", statLabel: "Matched" },
];

const TESTIMONIALS = [
    { quote: "Three VC meetings in a week. No deck — just my Ship Log.", name: "Priya Mehta", role: "Founder, NeuralLeap", tag: "ex-Meesho", score: "3,241", stars: 5 },
    { quote: "CollabRise showed what I built, not what I claimed. That's everything.", name: "Arjun Bose", role: "CEO, CarbonKart", tag: "Peak XV", score: "2,847", stars: 5 },
    { quote: "We hire from Ship Logs now. Whiteboard interviews are dead.", name: "Siddharth Rao", role: "CTO, Raft Technologies", tag: "", score: "4,102", stars: 5 },
    { quote: "The Venture Score replaced my portfolio. Investors trust it instantly.", name: "Riya Shah", role: "Designer, StackMesh", tag: "YC S24", score: "1,890", stars: 5 },
    { quote: "Guild missions turned strangers into co-founders. Unbelievable.", name: "Kiran Desai", role: "Founder, PulseHire", tag: "", score: "2,190", stars: 5 },
    { quote: "My Artifact DNA scan found gaps I'd never noticed. Fixed them all.", name: "Dev Patel", role: "Indie Hacker, ShipFast", tag: "€1M ARR", score: "3,600", stars: 5 },
];

const STAT_STRIP = [
    { value: "12,400+", label: "Entrepreneurs Verified" },
    { value: "₹48 Cr+", label: "Opportunities Matched" },
    { value: "94%", label: "Ship Log Hire Rate" },
    { value: "50K+", label: "Commits Indexed" },
    { value: "320", label: "Venture Guilds" },
    { value: "6", label: "Protocol Systems" },
];

/* ══════════════════════════════════════════════════════════════════
   HERO VENTURE SHOWCASE GRID — cascading cards with depth
══════════════════════════════════════════════════════════════════ */
function VentureShowcaseGrid() {
    const shouldReduce = useReducedMotion();

    const cols = [
        HERO_VENTURES.slice(0, 3),
        HERO_VENTURES.slice(3, 6),
        HERO_VENTURES.slice(6, 9),
    ];

    const offsets = [0, -40, -20]; // vertical offsets per column for cascade feel

    return (
        <div className="relative w-full h-full flex gap-3 items-start justify-center">
            {/* Fade overlays — top & bottom */}
            <div className="absolute top-0 left-0 right-0 h-28 z-10 pointer-events-none"
                style={{ background: "linear-gradient(to bottom, var(--cream), transparent)" }} />
            <div className="absolute bottom-0 left-0 right-0 h-36 z-10 pointer-events-none"
                style={{ background: "linear-gradient(to top, var(--cream), transparent)" }} />
            {/* Left edge fade */}
            <div className="absolute top-0 left-0 bottom-0 w-8 z-10 pointer-events-none"
                style={{ background: "linear-gradient(to right, var(--cream), transparent)" }} />

            {cols.map((col, ci) => (
                <motion.div
                    key={ci}
                    className="flex flex-col gap-3"
                    style={{ marginTop: offsets[ci] }}
                    animate={!shouldReduce ? { y: [0, ci % 2 === 0 ? -12 : 12, 0] } : {}}
                    transition={{ duration: 6 + ci * 1.5, repeat: Infinity, ease: "easeInOut", delay: ci * 0.8 }}
                >
                    {col.map((v, vi) => (
                        <MiniVentureCard key={vi} venture={v} delay={ci * 0.1 + vi * 0.07} />
                    ))}
                </motion.div>
            ))}
        </div>
    );
}

function MiniVentureCard({ venture, delay }: { venture: typeof HERO_VENTURES[0]; delay: number }) {
    const ref = useRef(null);
    const vis = useInView(ref, { once: true });
    return (
        <motion.div
            ref={ref}
            className="venture-card w-[168px] select-none"
            initial={{ opacity: 0, y: 20 }}
            animate={vis ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* Top: avatar + name */}
            <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${venture.color}, ${venture.color}99)` }}>
                    {venture.name[0]}
                </div>
                <div className="min-w-0">
                    <p className="dmsans font-semibold text-[11px] text-ink truncate">{venture.name}</p>
                    <p className="dmsans text-[9px] text-ink/40 truncate">{venture.handle}</p>
                </div>
            </div>
            {/* Score */}
            <div className="flex items-baseline justify-between mb-2.5">
                <p className="plfd italic text-[1.4rem] font-light leading-none" style={{ color: "#C9A353" }}>{venture.score}</p>
                {venture.verified && (
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#5B8A6F" }} />
                )}
            </div>
            {/* Progress bar */}
            <div className="h-[2px] rounded-full bg-black/5 mb-3 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${(parseInt(venture.score.replace(/,/g, "")) / 5500) * 100}%`, background: `linear-gradient(90deg, ${venture.color}, ${venture.color}88)` }} />
            </div>
            {/* Tags */}
            <div className="flex flex-wrap gap-1">
                {venture.tags.map(t => (
                    <span key={t} className="dmsans text-[8px] font-medium px-1.5 py-0.5 rounded-full bg-black/4 text-ink/50">{t}</span>
                ))}
                <span className="dmsans text-[8px] font-medium px-1.5 py-0.5 rounded-full text-ink/30">
                    <GitCommit className="w-2.5 h-2.5 inline mr-0.5" />{venture.commits}
                </span>
            </div>
        </motion.div>
    );
}


/* ══════════════════════════════════════════════════════════════════
   FEATURE SECTION — Explore Feed mockup
══════════════════════════════════════════════════════════════════ */
function ExploreFeatureSection() {
    const FEED_ITEMS = [
        { name: "NeuralLeap", score: "3,241", tag: "AI · SaaS", updated: "2h ago", color: "#C9A353" },
        { name: "CarbonKart", score: "2,847", tag: "CleanTech", updated: "4h ago", color: "#5B8A6F" },
        { name: "Raft", score: "4,102", tag: "Dev Tools", updated: "6h ago", color: "#4A6FA5" },
        { name: "StackMesh", score: "1,890", tag: "Infra", updated: "12h ago", color: "#8B6BAE" },
    ];

    return (
        <section style={{ background: "var(--cream)", padding: "120px 0" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>

                    {/* LEFT — copy */}
                    <FadeUp>
                        <div>
                            <p className="eyebrow dmsans" style={{ color: "#C9A353", marginBottom: "20px" }}>
                                Discover &amp; Search
                            </p>
                            <h2 className="plfd" style={{ fontSize: "clamp(2.2rem, 4vw, 3.4rem)", fontWeight: 400, color: "var(--ink)", lineHeight: "1.1", letterSpacing: "-.02em", marginBottom: "24px" }}>
                                Find the builders<br />doing the real work.
                            </h2>
                            <p className="dmsans" style={{ fontSize: "15px", fontWeight: 300, color: "var(--smoke)", lineHeight: "1.85", maxWidth: "400px", marginBottom: "36px" }}>
                                Search 12,400+ verified entrepreneurs by score, tier, guild, and artifact type. Filter by domain, stack, and commitment record — all verifiable, nothing fabricated.
                            </p>
                            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "40px" }}>
                                {["Filter by Venture Score, Tier, and Guild", "Full artifact history — every commit, deploy, and design", "See post-mortems and commitment contracts"].map(f => (
                                    <div key={f} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                        <CheckCircle2 size={15} style={{ color: "#C9A353", flexShrink: 0 }} />
                                        <span className="dmsans" style={{ fontSize: "13px", fontWeight: 400, color: "var(--ink-80)" }}>{f}</span>
                                    </div>
                                ))}
                            </div>
                            <Link href="/feed" className="btn-primary">
                                Explore the Feed <ArrowRight size={14} strokeWidth={2} />
                            </Link>
                        </div>
                    </FadeUp>

                    {/* RIGHT — product UI mockup */}
                    <FadeUp delay={0.15}>
                        <div className="feature-screen" style={{ padding: "0", overflow: "hidden" }}>
                            {/* Mock top bar */}
                            <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(13,13,13,.06)", display: "flex", alignItems: "center", gap: "10px", background: "#fff" }}>
                                <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "8px", background: "#F7F4EE", borderRadius: "10px", padding: "9px 14px", border: "1px solid rgba(13,13,13,.07)" }}>
                                    <Search size={13} style={{ color: "rgba(13,13,13,.35)", flexShrink: 0 }} />
                                    <span className="dmsans" style={{ fontSize: "12px", color: "rgba(13,13,13,.32)" }}>Search ventures, founders, skills...</span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "9px 14px", border: "1px solid rgba(13,13,13,.1)", borderRadius: "10px", background: "#fff", cursor: "pointer" }}>
                                    <SlidersHorizontal size={13} style={{ color: "rgba(13,13,13,.5)" }} />
                                    <span className="dmsans" style={{ fontSize: "11px", fontWeight: 500, color: "rgba(13,13,13,.5)" }}>Filters</span>
                                </div>
                            </div>
                            {/* Feed rows */}
                            <div style={{ padding: "8px 0", background: "#fff" }}>
                                {FEED_ITEMS.map((item, i) => (
                                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "14px 20px", borderBottom: i < FEED_ITEMS.length - 1 ? "1px solid rgba(13,13,13,.04)" : "none", cursor: "pointer", transition: "background .2s" }}>
                                        <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: `linear-gradient(135deg, ${item.color}, ${item.color}88)`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "bold", fontSize: "13px", flexShrink: 0 }}>
                                            {item.name[0]}
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <p className="dmsans" style={{ fontSize: "13px", fontWeight: 500, color: "var(--ink)", marginBottom: "2px" }}>{item.name}</p>
                                            <p className="dmsans" style={{ fontSize: "10px", color: "rgba(13,13,13,.35)" }}>{item.tag} · {item.updated}</p>
                                        </div>
                                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                                            <p className="plfd italic" style={{ fontSize: "1.3rem", color: "#C9A353", lineHeight: 1 }}>{item.score}</p>
                                            <CheckCircle2 size={11} style={{ color: "#5B8A6F", marginTop: "3px", marginLeft: "auto" }} />
                                        </div>
                                    </div>
                                ))}
                                {/* Bottom CTA in card */}
                                <div style={{ padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <span className="dmsans" style={{ fontSize: "11px", fontWeight: 500, color: "#C9A353", letterSpacing: ".06em" }}>View all 12,400+ ventures →</span>
                                </div>
                            </div>
                        </div>
                    </FadeUp>
                </div>
            </div>
        </section>
    );
}

/* ══════════════════════════════════════════════════════════════════
   FEATURE SECTION — Ship Log proof of execution
══════════════════════════════════════════════════════════════════ */
function ShipLogFeatureSection() {
    const COMMITS = [
        { msg: "feat: add payment gateway integration", time: "2h ago", delta: "+312 pts" },
        { msg: "fix: resolve mobile responsive breakpoints", time: "8h ago", delta: "+88 pts" },
        { msg: "deploy: production v2.4.1 → App Store", time: "1d ago", delta: "+560 pts" },
        { msg: "design: Figma handoff — checkout flow v3", time: "2d ago", delta: "+142 pts" },
    ];
    return (
        <section style={{ background: "var(--parchment)", padding: "120px 0" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>

                    {/* LEFT — product UI mockup */}
                    <FadeUp>
                        <div className="feature-screen">
                            {/* Header */}
                            <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(13,13,13,.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <div>
                                    <p className="dmsans" style={{ fontSize: "11px", fontWeight: 500, color: "rgba(13,13,13,.35)", letterSpacing: ".14em", textTransform: "uppercase", marginBottom: "4px" }}>Ship Log</p>
                                    <p className="plfd" style={{ fontSize: "1.2rem", fontWeight: 400, color: "var(--ink)" }}>Arjun M.</p>
                                </div>
                                <div style={{ textAlign: "right" }}>
                                    <p className="plfd italic" style={{ fontSize: "2rem", color: "#C9A353", lineHeight: 1 }}>2,847</p>
                                    <p className="dmsans" style={{ fontSize: "9px", color: "rgba(13,13,13,.35)", marginTop: "2px" }}>Venture Score</p>
                                </div>
                            </div>
                            {/* Score bar */}
                            <div style={{ padding: "16px 24px", borderBottom: "1px solid rgba(13,13,13,.05)", background: "#FAFAF8" }}>
                                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                                    {["GitHub 847 commits", "Figma 34 frames", "3 Live Deployments", "2 App Store Releases"].map(t => (
                                        <span key={t} className="proto-tag dmsans" style={{ fontSize: "9px" }}>{t}</span>
                                    ))}
                                </div>
                            </div>
                            {/* Commit log */}
                            <div style={{ padding: "0 0 8px" }}>
                                {COMMITS.map((c, i) => (
                                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 24px", borderBottom: i < COMMITS.length - 1 ? "1px solid rgba(13,13,13,.04)" : "none" }}>
                                        <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(201,163,83,.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                            <GitCommit size={13} style={{ color: "#C9A353" }} />
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <p className="dmsans" style={{ fontSize: "11px", fontWeight: 400, color: "var(--ink)", marginBottom: "1px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.msg}</p>
                                            <p className="dmsans" style={{ fontSize: "9px", color: "rgba(13,13,13,.35)" }}>{c.time}</p>
                                        </div>
                                        <span className="dmsans" style={{ fontSize: "10px", fontWeight: 600, color: "#5B8A6F", flexShrink: 0 }}>{c.delta}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </FadeUp>

                    {/* RIGHT — copy */}
                    <FadeUp delay={0.15}>
                        <div>
                            <p className="eyebrow dmsans" style={{ color: "#C9A353", marginBottom: "20px" }}>Proof of Execution</p>
                            <h2 className="plfd" style={{ fontSize: "clamp(2.2rem, 4vw, 3.4rem)", fontWeight: 400, color: "var(--ink)", lineHeight: "1.1", letterSpacing: "-.02em", marginBottom: "24px" }}>
                                Your Ship Log is your<br />living credential.
                            </h2>
                            <p className="dmsans" style={{ fontSize: "15px", fontWeight: 300, color: "var(--smoke)", lineHeight: "1.85", maxWidth: "400px", marginBottom: "36px" }}>
                                Every commit, deploy, and design handoff adds to your Venture Score in real time. Investors and recruiters see a time-stamped, tamper-proof record — not a polished résumé.
                            </p>
                            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "40px" }}>
                                {["Auto-syncs with GitHub, Figma, App Stores", "Score updates within minutes of each ship", "Share as a public profile or private audit link"].map(f => (
                                    <div key={f} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                        <CheckCircle2 size={15} style={{ color: "#C9A353", flexShrink: 0 }} />
                                        <span className="dmsans" style={{ fontSize: "13px", fontWeight: 400, color: "var(--ink-80)" }}>{f}</span>
                                    </div>
                                ))}
                            </div>
                            <Link href="/auth/create-account" className="btn-primary">
                                Start Your Ship Log <ArrowRight size={14} strokeWidth={2} />
                            </Link>
                        </div>
                    </FadeUp>
                </div>
            </div>
        </section>
    );
}

/* ══════════════════════════════════════════════════════════════════
   FEATURE SECTION — Guilds & Recruit
══════════════════════════════════════════════════════════════════ */
function GuildFeatureSection() {
    const GUILDS = [
        { name: "Design Guild", icon: <Layers size={16} />, members: 412, color: "#8B6BAE" },
        { name: "Code Guild", icon: <GitCommit size={16} />, members: 891, color: "#4A6FA5" },
        { name: "Growth Guild", icon: <TrendingUp size={16} />, members: 644, color: "#5B8A6F" },
        { name: "Ops Guild", icon: <Briefcase size={16} />, members: 203, color: "#C9A353" },
    ];
    return (
        <section style={{ background: "var(--cream)", padding: "120px 0" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>

                    {/* LEFT — copy */}
                    <FadeUp>
                        <div>
                            <p className="eyebrow dmsans" style={{ color: "#C9A353", marginBottom: "20px" }}>Guilds &amp; Recruiting</p>
                            <h2 className="plfd" style={{ fontSize: "clamp(2.2rem, 4vw, 3.4rem)", fontWeight: 400, color: "var(--ink)", lineHeight: "1.1", letterSpacing: "-.02em", marginBottom: "24px" }}>
                                Build your tribe.<br />Get recruited by work.
                            </h2>
                            <p className="dmsans" style={{ fontSize: "15px", fontWeight: 300, color: "var(--smoke)", lineHeight: "1.85", maxWidth: "400px", marginBottom: "36px" }}>
                                Join craft-specific Guilds. Complete sprint missions. Rise through ranks collectively. Companies post bounties — you respond with a verified Ship Log, not a cover letter.
                            </p>
                            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "40px" }}>
                                {["Sprint missions with real bounties attached", "Tier advancement unlocks premium opportunities", "Companies see 90-day activity, not just a profile"].map(f => (
                                    <div key={f} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                        <CheckCircle2 size={15} style={{ color: "#C9A353", flexShrink: 0 }} />
                                        <span className="dmsans" style={{ fontSize: "13px", fontWeight: 400, color: "var(--ink-80)" }}>{f}</span>
                                    </div>
                                ))}
                            </div>
                            <Link href="/auth/create-account" className="btn-primary">
                                Join Your Guild <ArrowRight size={14} strokeWidth={2} />
                            </Link>
                        </div>
                    </FadeUp>

                    {/* RIGHT — guild grid mockup */}
                    <FadeUp delay={0.15}>
                        <div className="feature-screen" style={{ padding: "24px" }}>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                                {GUILDS.map((g, i) => (
                                    <div key={i} style={{ borderRadius: "16px", padding: "20px", border: "1px solid rgba(13,13,13,.07)", background: "#FAFAF8", cursor: "pointer", transition: "all .3s" }}>
                                        <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: `${g.color}18`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px", color: g.color }}>
                                            {g.icon}
                                        </div>
                                        <p className="plfd" style={{ fontSize: "1rem", fontWeight: 400, color: "var(--ink)", marginBottom: "4px" }}>{g.name}</p>
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                            <p className="dmsans" style={{ fontSize: "11px", color: "rgba(13,13,13,.4)" }}>
                                                <Users size={10} style={{ display: "inline", marginRight: "4px" }} />{g.members} members
                                            </p>
                                            <ArrowUpRight size={12} style={{ color: g.color, opacity: .6 }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* Bounty strip */}
                            <div style={{ marginTop: "12px", padding: "14px 16px", borderRadius: "12px", background: "rgba(201,163,83,.07)", border: "1px solid rgba(201,163,83,.15)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <div>
                                    <p className="dmsans" style={{ fontSize: "11px", fontWeight: 500, color: "var(--ink)", marginBottom: "2px" }}>3 Live Bounties Available</p>
                                    <p className="dmsans" style={{ fontSize: "10px", color: "rgba(13,13,13,.4)" }}>₹2.4L in active prizes this week</p>
                                </div>
                                <span className="proto-tag dmsans" style={{ fontSize: "9px" }}>Active</span>
                            </div>
                        </div>
                    </FadeUp>
                </div>
            </div>
        </section>
    );
}

/* ══════════════════════════════════════════════════════════════════
   PROTOCOL BENTO GRID
══════════════════════════════════════════════════════════════════ */
function ProtocolGrid() {
    const BENTO = [
        { col: "md:col-span-7", tall: true },
        { col: "md:col-span-5", tall: false },
        { col: "md:col-span-4", tall: false },
        { col: "md:col-span-4", tall: false },
        { col: "md:col-span-4", tall: false },
        { col: "md:col-span-12", tall: false },
    ];
    return (
        <section style={{ background: "var(--cream-2)", padding: "100px 0" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px" }}>
                <FadeUp>
                    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "52px" }}>
                        <div>
                            <p className="eyebrow dmsans" style={{ color: "#C9A353", marginBottom: "16px" }}>The Protocol</p>
                            <h2 className="plfd" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 400, color: "var(--ink)", lineHeight: "1.1", letterSpacing: "-.018em" }}>
                                Six systems.<br />One irrefutable truth.
                            </h2>
                        </div>
                        <p className="plfd italic" style={{ fontSize: "13px", color: "rgba(13,13,13,.2)", letterSpacing: ".08em" }}>VI · Systems</p>
                    </div>
                </FadeUp>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "14px", gridAutoRows: "minmax(220px,auto)" }}>
                    {PROTOCOLS.map((p, i) => {
                        const colSpans = [7, 5, 4, 4, 4, 12];
                        const isWide = i === 5;
                        const isTall = i === 0;
                        return (
                            <FadeUp key={i} delay={i * 0.06} className={`md:col-span-${colSpans[i]} col-span-12`}>
                                <ProtocolBentoCell p={p} isWide={isWide} isTall={isTall} />
                            </FadeUp>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

function ProtocolBentoCell({ p, isWide, isTall }: { p: typeof PROTOCOLS[0]; isWide: boolean; isTall: boolean }) {
    const [hov, setHov] = useState(false);
    return (
        <div
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                background: "#fff", borderRadius: "24px",
                border: `1px solid ${hov ? "rgba(201,163,83,.2)" : "rgba(13,13,13,.06)"}`,
                padding: isWide ? "32px 36px" : "32px",
                height: isTall ? "460px" : "100%", minHeight: "220px",
                display: "flex", flexDirection: "column",
                justifyContent: isWide ? "center" : "space-between",
                boxShadow: hov ? "0 12px 50px rgba(13,13,13,.09)" : "none",
                transition: "all .4s cubic-bezier(.16,1,.3,1)",
                cursor: "default", position: "relative", overflow: "hidden",
            }}
        >
            {/* Hover gradient */}
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 30% 30%, rgba(201,163,83,.04), transparent 60%)", opacity: hov ? 1 : 0, transition: "opacity .4s", pointerEvents: "none" }} />

            {isWide ? (
                <div style={{ display: "flex", alignItems: "center", gap: "60px", position: "relative", zIndex: 1 }}>
                    <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: "rgba(201,163,83,.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#C9A353", flexShrink: 0 }}>{p.icon}</div>
                    <div style={{ flex: 1 }}>
                        <p className="dmsans" style={{ fontSize: "10px", fontWeight: 500, color: "#C9A353", letterSpacing: ".18em", textTransform: "uppercase", marginBottom: "8px" }}>Protocol {p.num}</p>
                        <h3 className="plfd" style={{ fontSize: "1.6rem", fontWeight: 400, color: "var(--ink)", marginBottom: "8px", lineHeight: 1.15 }}>{p.title}</h3>
                        <p className="dmsans" style={{ fontSize: "13.5px", fontWeight: 300, color: "var(--smoke)", lineHeight: "1.8", maxWidth: "500px" }}>{p.desc}</p>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <p className="plfd italic" style={{ fontSize: "2.5rem", color: "#C9A353", lineHeight: 1 }}>{p.stat}</p>
                        <p className="dmsans" style={{ fontSize: "10px", color: "rgba(13,13,13,.35)", letterSpacing: ".15em", textTransform: "uppercase", marginTop: "6px" }}>{p.statLabel}</p>
                    </div>
                </div>
            ) : (
                <>
                    <div style={{ position: "relative", zIndex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: isTall ? "32px" : "20px" }}>
                            <div style={{ width: "46px", height: "46px", borderRadius: "12px", background: "rgba(201,163,83,.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#C9A353", transition: "all .4s", ...(hov ? { background: "#0D0D0D", color: "#C9A353" } : {}) }}>{p.icon}</div>
                            <span className="dmsans" style={{ fontSize: "9px", fontWeight: 500, color: "rgba(13,13,13,.3)", letterSpacing: ".18em", textTransform: "uppercase" }}>Protocol {p.num}</span>
                        </div>
                        <h3 className="plfd" style={{ fontSize: isTall ? "1.8rem" : "1.35rem", fontWeight: 400, color: hov ? "#C9A353" : "var(--ink)", lineHeight: 1.15, marginBottom: "10px", transition: "color .3s" }}>{p.title}</h3>
                        <p className="dmsans" style={{ fontSize: "13px", fontWeight: 300, color: "var(--smoke)", lineHeight: "1.8" }}>{p.desc}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", paddingTop: "16px", borderTop: "1px solid rgba(13,13,13,.05)", position: "relative", zIndex: 1 }}>
                        <p className="plfd italic" style={{ fontSize: "1.9rem", color: "#C9A353", lineHeight: 1 }}>{p.stat}</p>
                        <p className="dmsans" style={{ fontSize: "9px", color: "rgba(13,13,13,.35)", letterSpacing: ".15em", textTransform: "uppercase", textAlign: "right", maxWidth: "70px", lineHeight: "1.5" }}>{p.statLabel}</p>
                    </div>
                </>
            )}
        </div>
    );
}

/* ══════════════════════════════════════════════════════════════════
   DENSE TESTIMONIALS — masonry-style grid
══════════════════════════════════════════════════════════════════ */
function TestimonialsSection() {
    return (
        <section style={{ background: "var(--parchment)", padding: "100px 0" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px" }}>
                <FadeUp>
                    <div style={{ textAlign: "center", marginBottom: "60px" }}>
                        <p className="eyebrow dmsans" style={{ color: "#C9A353", marginBottom: "16px", justifyContent: "center", display: "flex" }}>Verified Voices</p>
                        <h2 className="plfd" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 400, color: "var(--ink)", lineHeight: "1.1", letterSpacing: "-.018em" }}>
                            What founders are saying.
                        </h2>
                        <div className="rule-gold" style={{ maxWidth: "80px", margin: "20px auto 0" }} />
                    </div>
                </FadeUp>

                {/* 3-column masonry-style */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px" }}>
                    {TESTIMONIALS.map((t, i) => (
                        <FadeUp key={i} delay={i * 0.08}>
                            <TestimonialCard t={t} featured={i === 2} />
                        </FadeUp>
                    ))}
                </div>

                {/* Secondary row of mini quotes */}
                <FadeUp delay={0.35}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px", marginTop: "14px" }}>
                        {[
                            { quote: "Finally, a platform where my work speaks for itself.", name: "Ravi K.", role: "Indie Hacker" },
                            { quote: "The Failure Vault got me hired — my PM loved my post-mortem.", name: "Shreya M.", role: "Product Lead" },
                            { quote: "Went from 0 to 4,100 score in 60 days. No gatekeepers.", name: "Aditya R.", role: "Full-Stack Builder" },
                        ].map((m, i) => (
                            <div key={i} className="tcard" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                                <p className="plfd italic" style={{ fontSize: "1rem", color: "rgba(13,13,13,.75)", lineHeight: "1.7" }}>&quot;{m.quote}&quot;</p>
                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                    <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "rgba(201,163,83,.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#C9A353", fontSize: "11px", fontWeight: "bold" }}>{m.name[0]}</div>
                                    <div>
                                        <p className="dmsans" style={{ fontSize: "11px", fontWeight: 500, color: "var(--ink)" }}>{m.name}</p>
                                        <p className="dmsans" style={{ fontSize: "9px", color: "rgba(13,13,13,.35)" }}>{m.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </FadeUp>
            </div>
        </section>
    );
}

function TestimonialCard({ t, featured }: { t: typeof TESTIMONIALS[0]; featured?: boolean }) {
    return (
        <div className="tcard" style={{ display: "flex", flexDirection: "column", gap: "16px", ...(featured ? { borderColor: "rgba(201,163,83,.18)", background: "rgba(201,163,83,.02)" } : {}) }}>
            {/* Stars */}
            <div style={{ display: "flex", gap: "3px" }}>
                {Array(t.stars).fill(0).map((_, si) => (
                    <Star key={si} size={11} fill="#C9A353" style={{ color: "#C9A353" }} />
                ))}
            </div>
            {/* Quote */}
            <blockquote className="plfd italic" style={{ fontSize: "1.05rem", color: "rgba(13,13,13,.82)", lineHeight: "1.75", flex: 1 }}>&quot;{t.quote}&quot;</blockquote>
            {/* Rule */}
            <div className="rule-gold" />
            {/* Author row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ position: "relative" }}>
                        <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: "linear-gradient(135deg, rgba(201,163,83,.3), rgba(201,163,83,.08))", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(201,163,83,.2)", fontWeight: "bold", fontSize: "12px", color: "var(--ink)" }}>
                            {t.name[0]}
                        </div>
                        <div style={{ position: "absolute", bottom: "-1px", right: "-1px", width: "10px", height: "10px", borderRadius: "50%", background: "#5B8A6F", border: "1.5px solid #EDE8DA" }} />
                    </div>
                    <div>
                        <p className="dmsans" style={{ fontSize: "11px", fontWeight: 600, color: "var(--ink)" }}>{t.name}</p>
                        <p className="dmsans" style={{ fontSize: "10px", color: "rgba(13,13,13,.38)" }}>{t.role}</p>
                    </div>
                </div>
                <div style={{ textAlign: "right" }}>
                    <p className="plfd italic" style={{ fontSize: "1.1rem", color: "#C9A353", lineHeight: 1 }}>{t.score}</p>
                    {t.tag && <p className="dmsans" style={{ fontSize: "8px", color: "rgba(13,13,13,.3)", marginTop: "2px" }}>{t.tag}</p>}
                </div>
            </div>
        </div>
    );
}

/* ══════════════════════════════════════════════════════════════════
   HERO 3D SECTION — Orbital rings, floating cards, parallax depth
══════════════════════════════════════════════════════════════════ */
function Hero3DSection() {
    const shouldReduce = useReducedMotion();

    return (
        <section
            style={{
                position: "relative",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "120px 24px 60px",
                overflow: "hidden",
                background: "var(--cream)",
            }}
        >
            {/* The Full-Screen 3D Background */}
            <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
                <Hero3D />
            </div>

            {/* Radial Vignette to ensure text readability */}
            <div style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(circle at 50% 50%, transparent 20%, var(--cream) 120%)",
                zIndex: 5,
                pointerEvents: "none"
            }} />

            <div style={{ position: "relative", zIndex: 10, maxWidth: "900px", width: "100%", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>

                {/* Overline */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: 0.3 }} style={{ marginBottom: "28px" }}>
                    <div style={{
                        display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 20px",
                        borderRadius: "999px", background: "rgba(201,163,83,.08)", border: "1px solid rgba(201,163,83,.2)",
                        backdropFilter: "blur(8px)"
                    }}>
                        <Sparkles size={14} style={{ color: "#C9A353" }} />
                        <span className="dmsans" style={{ fontSize: "11px", fontWeight: 600, color: "#C9A353", letterSpacing: ".2em", textTransform: "uppercase" }}>The Proof-of-Work Protocol</span>
                    </div>
                </motion.div>

                {/* Headline - Centered & Massive */}
                <motion.h1 className="plfd" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        fontSize: "clamp(4rem, 9vw, 8rem)",
                        fontWeight: 700, color: "var(--ink)", lineHeight: "0.9", letterSpacing: "-.04em", marginBottom: "32px",
                        textShadow: "0 24px 48px rgba(13,13,13,0.15)"
                    }}>
                    Launch.<br />Prove.<br /><em className="gold-shimmer-text" style={{ fontStyle: "italic", fontWeight: 400 }}>Rise.</em>
                </motion.h1>

                {/* Subtitle */}
                <motion.p className="dmsans" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.9 }}
                    style={{ fontSize: "18px", fontWeight: 300, color: "var(--smoke)", lineHeight: "1.8", maxWidth: "600px", marginBottom: "48px" }}>
                    CollabRise replaces your résumé with verifiable proof of everything you have actually shipped. No credentials. No gatekeepers. Just your work — quantified, verified, impossible to fake.
                </motion.p>

                {/* CTAs */}
                <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, delay: 1.1 }} style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center", marginBottom: "64px" }}>
                    <Link href="/auth/create-account" className="btn-primary" style={{ padding: "16px 36px", fontSize: "15px", boxShadow: "0 12px 24px rgba(13,13,13,.15)" }}>
                        Join the Circle
                    </Link>
                    <Link href="/feed" className="btn-gold-outline" style={{ padding: "16px 36px", fontSize: "15px", backdropFilter: "blur(8px)", background: "rgba(255,255,255,0.4)" }}>
                        Explore the Ecosystem
                    </Link>
                </motion.div>

                {/* Social proof row */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: .8 }}>
                    <p className="dmsans" style={{ fontSize: "10px", fontWeight: 500, color: "rgba(13,13,13,.32)", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "16px" }}>
                        Trusted by founders from
                    </p>
                    <div style={{ display: "flex", gap: "32px", flexWrap: "wrap", justifyContent: "center" }}>
                        {["Razorpay", "Peak XV", "CRED", "Zepto", "Meesho"].map((n, i) => (
                            <motion.span key={n} className="plfd" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 + i * 0.07 }}
                                style={{ fontSize: "15px", fontWeight: 400, color: "rgba(13,13,13,.22)", cursor: "default" }}>{n}</motion.span>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Scroll cue */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0, duration: 1 }}
                style={{ position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", zIndex: 10 }}>
                <div className="scroll-line" style={{ width: "1px", height: "64px", background: "linear-gradient(180deg, transparent, rgba(13,13,13,.4), transparent)" }} />
                <span className="dmsans" style={{ fontSize: "9px", fontWeight: 500, letterSpacing: ".3em", textTransform: "uppercase", color: "rgba(13,13,13,.35)" }}>Scroll</span>
            </motion.div>
        </section>
    );
}

/* ══════════════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════════════ */
export default function HomePage() {
    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: TOKENS }} />
            {/* Grain and scrollbar only — no black curtain */}
            <div className="c-grain" aria-hidden="true" />
            <ScrollBar />

            <main style={{ background: "var(--cream)", overflowX: "hidden" }}>

                {/* ══════════════════════════════════════════
                    HERO — 3D Animated Orbital Scene
                ══════════════════════════════════════════ */}
                <Hero3DSection />

                {/* Ticker */}
                <EntrepreneurTicker />

                {/* ══════════════════════════════════════════
                    STATS STRIP — bold numerical highlights
                ══════════════════════════════════════════ */}
                <section className="stat-strip" style={{ padding: "44px 0", background: "#fff" }}>
                    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px" }}>
                        <FadeUp>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 0 }}>
                                {STAT_STRIP.map((s, i) => (
                                    <div key={i} style={{ textAlign: "center", padding: "0 16px", borderRight: i < 5 ? "1px solid rgba(13,13,13,.08)" : "none" }}>
                                        <p className="plfd italic" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)", color: "#C9A353", lineHeight: 1, marginBottom: "6px" }}>{s.value}</p>
                                        <p className="dmsans" style={{ fontSize: "9.5px", fontWeight: 400, color: "rgba(13,13,13,.38)", letterSpacing: ".15em", textTransform: "uppercase" }}>{s.label}</p>
                                    </div>
                                ))}
                            </div>
                        </FadeUp>
                    </div>
                </section>

                <LineDivider />

                {/* Feature sections */}
                <ExploreFeatureSection />
                <LineDivider />
                <ShipLogFeatureSection />
                <LineDivider />
                <GuildFeatureSection />
                <LineDivider />

                {/* Protocol bento */}
                <ProtocolGrid />
                <LineDivider />

                {/* Testimonials */}
                <TestimonialsSection />
                <LineDivider />

                {/* ══════════════════════════════════════════
                    PRESS LOGOS
                ══════════════════════════════════════════ */}
                <section style={{ background: "var(--cream)", padding: "64px 0", borderTop: "1px solid rgba(13,13,13,.06)" }}>
                    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 48px", textAlign: "center" }}>
                        <FadeUp>
                            <p className="dmsans" style={{ fontSize: "9px", fontWeight: 500, color: "rgba(13,13,13,.28)", letterSpacing: ".22em", textTransform: "uppercase", marginBottom: "36px" }}>As seen in</p>
                            <div style={{ display: "flex", gap: "48px", justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
                                {["YourStory", "Inc42", "Product Hunt", "Economic Times", "Mint"].map((n, i) => (
                                    <motion.span key={n} className="plfd" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * .07 }}
                                        style={{ fontSize: "1.05rem", fontWeight: 400, color: "rgba(13,13,13,.16)", cursor: "default", transition: "color .4s" }}>
                                        {n}
                                    </motion.span>
                                ))}
                            </div>
                        </FadeUp>
                    </div>
                </section>

                <LineDivider />

                {/* ══════════════════════════════════════════
                    FINAL CTA — Cream luxury banner (no dark bg)
                ══════════════════════════════════════════ */}
                <section style={{ background: "var(--parchment)", padding: "140px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
                    {/* Radial gold glow */}
                    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "900px", height: "600px", background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(201,163,83,.1), transparent 70%)", pointerEvents: "none" }} />
                    {/* Dot grid */}
                    <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(201,163,83,.08) 1px, transparent 1px)", backgroundSize: "48px 48px", pointerEvents: "none" }} />
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(201,163,83,.4), transparent)" }} />

                    <FadeUp>
                        <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: 1 }}>
                            {/* Decorative hexagon */}
                            <div style={{ display: "flex", justifyContent: "center", marginBottom: "36px" }}>
                                <div className="hex-shape" style={{ width: "52px", height: "52px", background: "linear-gradient(135deg, rgba(201,163,83,.15), rgba(201,163,83,.05))", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Gem size={20} style={{ color: "#C9A353" }} />
                                </div>
                            </div>

                            <div className="rule-gold" style={{ marginBottom: "40px", maxWidth: "120px", margin: "0 auto 40px" }} />
                            <p className="plfd italic" style={{ fontSize: "1.1rem", color: "rgba(201,163,83,.7)", marginBottom: "28px", letterSpacing: ".08em" }}>
                                The Proof · of · Work Protocol
                            </p>
                            <h2 className="plfd" style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)", fontWeight: 400, color: "var(--ink)", lineHeight: "0.95", letterSpacing: "-.03em", marginBottom: "36px" }}>
                                Your work is your<br />
                                <em className="gold-shimmer-text" style={{ fontStyle: "italic" }}>greatest credential.</em>
                            </h2>
                            <p className="dmsans" style={{ fontSize: "15px", fontWeight: 300, color: "var(--smoke)", lineHeight: "1.9", maxWidth: "440px", margin: "0 auto 48px", letterSpacing: ".03em" }}>
                                Stop pitching. Start proving. Join thousands of entrepreneurs whose Ship Logs speak louder than any slide deck in existence.
                            </p>
                            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                                <Link href="/auth/create-account" className="btn-primary">
                                    Begin Your Journey <ArrowRight size={14} strokeWidth={2} />
                                </Link>
                                <Link href="/feed" className="btn-secondary">
                                    Read the Manifesto
                                </Link>
                            </div>
                            <p className="dmsans" style={{ marginTop: "40px", fontSize: "9px", fontWeight: 400, color: "rgba(13,13,13,.2)", letterSpacing: ".22em", textTransform: "uppercase" }}>
                                Free to join · No credit card · Ships in 60 seconds
                            </p>
                            <div className="rule-gold" style={{ marginTop: "52px" }} />
                        </div>
                    </FadeUp>
                </section>

            </main>
        </>
    );
}