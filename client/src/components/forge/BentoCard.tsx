"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import React from "react";

type AccentColor = "gold" | "indigo" | "saffron" | "default";

interface BentoCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
    children: React.ReactNode;
    className?: string;
    colSpan?: 1 | 2 | 3;
    rowSpan?: 1 | 2;
    accent?: AccentColor;
    hoverable?: boolean;
    glass?: boolean;
    delay?: number;
}

const accentBorders: Record<AccentColor, string> = {
    gold: "hover:border-royal-gold/40 group-hover:shadow-[0_0_25px_rgba(212,168,83,0.15)]",
    indigo: "hover:border-indigo/20 group-hover:shadow-[0_0_25px_rgba(45,31,110,0.1)]",
    saffron: "hover:border-saffron/30 group-hover:shadow-[0_0_25px_rgba(212,135,46,0.15)]",
    default: "hover:border-ink/15 hover:shadow-luxury",
};

const colSpanMap: Record<number, string> = {
    1: "col-span-1",
    2: "col-span-1 md:col-span-2",
    3: "col-span-1 md:col-span-2 lg:col-span-3",
};

const rowSpanMap: Record<number, string> = {
    1: "row-span-1",
    2: "row-span-1 md:row-span-2",
};

export default function BentoCard({
    children,
    className = "",
    colSpan = 1,
    rowSpan = 1,
    accent = "default",
    hoverable = true,
    glass = true,
    delay = 0,
    ...rest
}: BentoCardProps) {
    return (
        <motion.div
            {...rest}
            className={`
        relative overflow-hidden
        rounded-2xl p-6
        border border-ink/[0.06]
        ${glass ? "bg-white/50 backdrop-blur-xl shadow-sm" : "bg-transparent"}
        ${hoverable ? `transition-all duration-300 ${accentBorders[accent]} hover:-translate-y-1` : ""}
        ${colSpanMap[colSpan]}
        ${rowSpanMap[rowSpan]}
        ${className}
      `}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                type: "spring",
                stiffness: 200,
                damping: 25,
                delay: delay,
            }}
        >
            {children}
        </motion.div>
    );
}
