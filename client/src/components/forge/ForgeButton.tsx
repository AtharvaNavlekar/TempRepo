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
    primary: "btn-saffron",
    secondary: "btn-outline",
    ghost: "btn-ghost-white !text-ink !border-ink/20 hover:!border-ink/40 hover:!bg-black/[0.04]", // Override for light mode
    danger: "bg-red-500/10 text-red-600 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/40",
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
        transition-all duration-200
        cursor-pointer select-none
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${!variantStyles[variant].includes('btn-') ? sizeStyles[size] + ' rounded-lg font-medium tracking-normal' : ''}
        ${className}
      `}
            whileHover={{
                y: -1,
                transition: { type: "tween", duration: 0.2 },
            }}
            whileTap={{
                y: 0,
                scale: 0.98,
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
