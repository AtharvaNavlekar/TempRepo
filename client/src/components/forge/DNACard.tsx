"use client";

import { motion } from "framer-motion";
import RenderIcon from "./RenderIcon";

interface DNAMetric {
    label: string;
    value: string | number;
}

interface DNACardProps {
    title: string;
    description?: string;
    url?: string;
    type: string;
    typeIcon?: string;
    score: number;
    date: string;
    tags: string[];
    metrics: DNAMetric[];
    className?: string;
}

export default function DNACard({
    title,
    description,
    url,
    type,
    typeIcon = "IconPalette",
    score,
    date,
    tags,
    metrics,
    className = "",
}: DNACardProps) {


    const CardContent = (
        <motion.div
            className={`
        group relative overflow-hidden flex flex-col h-full
        rounded-bento p-6
        bg-white/60 backdrop-blur-xl shadow-sm
        border border-ink/[0.06]
        hover:border-royal-gold/40
        hover:shadow-luxury
        transition-all duration-300
        ${className}
      `}
            whileHover={{
                y: -4,
                transition: { type: "spring", stiffness: 300, damping: 20 },
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                    <RenderIcon name={typeIcon} className="w-4 h-4 text-royal-gold" />
                    <span className="font-sans text-[10px] uppercase font-bold tracking-widest text-smoke">
                        {type}
                    </span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="font-serif italic font-bold text-royal-gold text-lg">{score}</span>
                    <span className="font-sans text-[9px] font-bold text-smoke uppercase tracking-widest">PTS</span>
                </div>
            </div>

            {/* Title & Description */}
            <div className="flex-grow">
                <h3 className="font-serif font-bold text-ink text-xl leading-tight mb-3 group-hover:text-royal-gold transition-colors">
                    {title}
                </h3>
                {description && (
                    <p className="font-sans text-sm text-smoke mb-5 leading-relaxed">
                        {description}
                    </p>
                )}
            </div>

            <div className="mt-auto z-10 relative">
                <div className="flex justify-between items-end mb-4">
                    <p className="font-sans font-semibold text-[11px] text-smoke">{date}</p>
                    {url && (
                        <span className="font-sans font-bold uppercase tracking-wider text-xs text-royal-gold opacity-0 group-hover:opacity-100 transition-opacity">
                            VIEW ↗
                        </span>
                    )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                    {tags.map((tag, i) => (
                        <span
                            key={i}
                            className="px-2.5 py-1 rounded-full bg-black/[0.03] text-ink font-sans font-medium text-[10px] tracking-wider border border-ink/[0.06]"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* DNA Metrics Strip — revealed on hover */}
                <motion.div
                    className="grid grid-cols-3 gap-2 pt-3 border-t border-ink/[0.06]"
                    initial={{ opacity: 0, height: 0 }}
                    whileInView={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                >
                    {metrics.map((metric, i) => (
                        <div key={i} className="text-center">
                            <p className="font-serif italic font-bold text-ink text-sm">
                                {metric.value}
                            </p>
                            <p className="font-sans font-semibold text-[9px] text-smoke uppercase tracking-wider">
                                {metric.label}
                            </p>
                        </div>
                    ))}
                </motion.div>

                {/* Hover gold bloom */}
                <div className="absolute inset-0 rounded-bento opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-royal-gold/[0.04] via-transparent to-saffron/[0.03] z-0" />
            </div>
        </motion.div>
    );

    if (url) {
        return (
            <a href={url} target="_blank" rel="noreferrer" className="block h-full cursor-pointer">
                {CardContent}
            </a>
        );
    }

    return CardContent;
}
