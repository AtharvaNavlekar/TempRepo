"use client";

import { motion, type Variants } from "framer-motion";
import React from "react";

type TransitionPreset = "spring" | "bounceIn" | "slideUp" | "slideDown" | "scaleIn" | "fadeIn";

interface SpringTransitionProps {
    children: React.ReactNode;
    preset?: TransitionPreset;
    delay?: number;
    className?: string;
    once?: boolean;
    stiffness?: number;
    damping?: number;
    mass?: number;
}

const presetVariants: Record<TransitionPreset, Variants> = {
    spring: {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
    },
    bounceIn: {
        hidden: { opacity: 0, scale: 0.3 },
        visible: { opacity: 1, scale: 1 },
    },
    slideUp: {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0 },
    },
    slideDown: {
        hidden: { opacity: 0, y: -60 },
        visible: { opacity: 1, y: 0 },
    },
    scaleIn: {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
    },
    fadeIn: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    },
};

export default function SpringTransition({
    children,
    preset = "spring",
    delay = 0,
    className = "",
    once = true,
    stiffness = 200,
    damping = 25,
    mass = 1,
}: SpringTransitionProps) {
    return (
        <motion.div
            className={className}
            variants={presetVariants[preset]}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, margin: "-50px" }}
            transition={{
                type: "spring",
                stiffness,
                damping,
                mass,
                delay,
            }}
        >
            {children}
        </motion.div>
    );
}
