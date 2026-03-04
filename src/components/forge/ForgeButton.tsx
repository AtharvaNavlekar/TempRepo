"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import React from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ForgeButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
    children: React.ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    icon?: React.ReactNode;
    loading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
    primary:
        "bg-lime text-obsidian border-lime hover:shadow-brutal font-bold",
    secondary:
        "bg-glass-white text-white border-glass-border backdrop-blur-md hover:border-lime/50 hover:shadow-glow",
    ghost:
        "bg-transparent text-lime border-lime/40 hover:bg-lime/10 hover:border-lime",
    danger:
        "bg-acid/10 text-acid border-acid/40 hover:bg-acid/20 hover:border-acid hover:shadow-brutal-acid",
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: "px-4 py-2 text-sm gap-1.5",
    md: "px-6 py-3 text-base gap-2",
    lg: "px-8 py-4 text-lg gap-2.5",
};

export default function ForgeButton({
    children,
    variant = "primary",
    size = "md",
    icon,
    loading = false,
    className = "",
    ...props
}: ForgeButtonProps) {
    return (
        <motion.button
            className={`
        relative inline-flex items-center justify-center
        border-[3px] rounded-bento-sm
        font-clash font-semibold tracking-wide uppercase
        transition-colors duration-200
        cursor-pointer select-none
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
            whileHover={{
                scale: 1.03,
                transition: { type: "spring", stiffness: 400, damping: 15 },
            }}
            whileTap={{
                scale: 0.97,
                transition: { type: "spring", stiffness: 500, damping: 20 },
            }}
            disabled={loading}
            {...props}
        >
            {loading ? (
                <motion.span
                    className="inline-block w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
            ) : (
                <>
                    {icon && <span className="flex-shrink-0">{icon}</span>}
                    {children}
                </>
            )}
        </motion.button>
    );
}
