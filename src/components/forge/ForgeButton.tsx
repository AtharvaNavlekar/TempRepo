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
    primary: "bg-lime text-obsidian border border-lime/20 shadow-[0_0_15px_rgba(204,255,0,0.2)] hover:shadow-[0_0_30px_rgba(204,255,0,0.4)] hover:-translate-y-1 hover:bg-white",
    secondary: "bg-obsidian border border-white/10 text-white hover:border-lime/50 hover:text-lime hover:bg-lime/5 hover:-translate-y-1",
    ghost: "bg-transparent text-slate-300 hover:text-lime hover:bg-lime/5",
    danger: "bg-acid/10 text-acid border border-acid/20 hover:bg-acid/20 hover:border-acid/40 hover:shadow-glow-acid",
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
        rounded-lg
        font-medium tracking-normal
        transition-all duration-200
        cursor-pointer select-none
        border border-transparent
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
            whileHover={{
                y: -1,
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                transition: { type: "tween", duration: 0.2 },
            }}
            whileTap={{
                y: 0,
                scale: 0.98,
                boxShadow: "none",
                transition: { type: "tween", duration: 0.1 },
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
