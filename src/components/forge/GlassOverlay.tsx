"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useCallback } from "react";

interface GlassOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
    title?: string;
}

export default function GlassOverlay({
    isOpen,
    onClose,
    children,
    className = "",
    title,
}: GlassOverlayProps) {
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        },
        [onClose]
    );

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [isOpen, handleKeyDown]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-obsidian/80 backdrop-blur-md"
                        onClick={onClose}
                        initial={{ backdropFilter: "blur(0px)" }}
                        animate={{ backdropFilter: "blur(16px)" }}
                        exit={{ backdropFilter: "blur(0px)" }}
                    />

                    {/* Content */}
                    <motion.div
                        className={`
              relative z-10
              bg-white/[0.05] backdrop-blur-xl
              border border-white/[0.1]
              rounded-bento-lg
              p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto
              shadow-glass
              ${className}
            `}
                        initial={{ scale: 0.85, opacity: 0, y: 30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                        }}
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-white/40 hover:text-white transition-colors"
                            aria-label="Close"
                        >
                            ✕
                        </button>

                        {title && (
                            <h2 className="font-clash font-bold text-2xl text-white mb-6">
                                {title}
                            </h2>
                        )}

                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
