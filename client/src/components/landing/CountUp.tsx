"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";

interface CountUpProps {
    target: number;
    prefix?: string;
    suffix?: string;
    className?: string;
}

export default function CountUp({ target, prefix = "", suffix = "", className = "" }: CountUpProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });
    const count = useMotionValue(0);
    const rounded = useTransform(count, (v) => Math.round(v).toLocaleString("en-IN"));

    useEffect(() => {
        if (isInView) {
            animate(count, target, { duration: 2, ease: "easeOut" });
        }
    }, [isInView, count, target]);

    return (
        <span ref={ref} className={className}>
            {prefix}
            <motion.span>{rounded}</motion.span>
            {suffix}
        </span>
    );
}
