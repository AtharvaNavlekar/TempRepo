"use client";

import { motion } from "framer-motion";
import RenderIcon from "./RenderIcon";

interface DNAMetric {
    label: string;
    value: string | number;
}

interface DNACardProps {
    title: string;
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
    type,
    typeIcon = "IconPalette",
    score,
    date,
    tags,
    metrics,
    className = "",
}: DNACardProps) {
    return (
        <motion.div
            className={`
        group relative overflow-hidden
        rounded-bento p-5
        bg-white/[0.03] backdrop-blur-md
        border border-white/[0.08]
        hover:border-lime/40
        transition-all duration-300
        cursor-pointer
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
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                    <RenderIcon name={typeIcon} className="w-4 h-4 text-lime" />
                    <span className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase">
                        {type}
                    </span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="font-clash font-bold text-lime text-lg">{score}</span>
                    <span className="font-mono text-[9px] text-white/30">PTS</span>
                </div>
            </div>

            {/* Title */}
            <h3 className="font-clash font-bold text-white text-lg leading-tight mb-2 group-hover:text-lime transition-colors">
                {title}
            </h3>

            {/* Date */}
            <p className="font-mono text-[11px] text-white/30 mb-3">{date}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
                {tags.map((tag, i) => (
                    <span
                        key={i}
                        className="px-2 py-0.5 rounded-full bg-white/[0.05] text-white/50 font-mono text-[10px] tracking-wider border border-white/[0.06]"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* DNA Metrics Strip — revealed on hover */}
            <motion.div
                className="grid grid-cols-3 gap-2 pt-3 border-t border-white/[0.06]"
                initial={{ opacity: 0, height: 0 }}
                whileInView={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3, delay: 0.1 }}
            >
                {metrics.map((metric, i) => (
                    <div key={i} className="text-center">
                        <p className="font-clash font-bold text-white text-sm">
                            {metric.value}
                        </p>
                        <p className="font-mono text-[9px] text-white/30 uppercase tracking-wider">
                            {metric.label}
                        </p>
                    </div>
                ))}
            </motion.div>

            {/* Hover glow */}
            <div className="absolute inset-0 rounded-bento opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-lime/[0.03] via-transparent to-cyber/[0.03]" />
        </motion.div>
    );
}
