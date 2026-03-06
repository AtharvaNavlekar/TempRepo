"use client";

import { motion } from "framer-motion";

type TagStatus = "live" | "shipped" | "staked" | "decayed" | "building";

interface PulseTagProps {
    status: TagStatus;
    label?: string;
    className?: string;
}

const statusConfig: Record<
    TagStatus,
    { color: string; bg: string; ring: string; label: string }
> = {
    live: {
        color: "text-lime",
        bg: "bg-lime/10",
        ring: "ring-lime/40",
        label: "LIVE",
    },
    shipped: {
        color: "text-cyber",
        bg: "bg-cyber/10",
        ring: "ring-cyber/40",
        label: "SHIPPED",
    },
    staked: {
        color: "text-acid",
        bg: "bg-acid/10",
        ring: "ring-acid/40",
        label: "STAKED",
    },
    decayed: {
        color: "text-red-500",
        bg: "bg-red-500/10",
        ring: "ring-red-500/40",
        label: "DECAYED",
    },
    building: {
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
        ring: "ring-yellow-400/40",
        label: "BUILDING",
    },
};

export default function PulseTag({
    status,
    label,
    className = "",
}: PulseTagProps) {
    const config = statusConfig[status];
    const shouldPulse = status === "live" || status === "building";

    return (
        <motion.div
            className={`
        inline-flex items-center gap-2
        px-3 py-1.5 rounded-full
        ${config.bg} ${config.color}
        ring-1 ${config.ring}
        font-mono text-[11px] tracking-widest uppercase font-medium
        ${className}
      `}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            <span className="relative flex h-2 w-2">
                {shouldPulse && (
                    <span
                        className={`absolute inline-flex h-full w-full rounded-full ${config.bg} opacity-75 animate-ping`}
                    />
                )}
                <span
                    className={`relative inline-flex rounded-full h-2 w-2 ${status === "live"
                            ? "bg-lime"
                            : status === "shipped"
                                ? "bg-cyber"
                                : status === "staked"
                                    ? "bg-acid"
                                    : status === "decayed"
                                        ? "bg-red-500"
                                        : "bg-yellow-400"
                        }`}
                />
            </span>
            {label || config.label}
        </motion.div>
    );
}
