"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ForgeButton, GlitchText } from "@/components/forge";

export default function VibeCheckPage() {
    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-obsidian">
            {/* Intense Background Pules */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.3, 0.1]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80wv] h-[80vw] max-w-[800px] max-h-[800px] bg-lime rounded-full blur-[150px] mix-blend-screen pointer-events-none"
            />

            <div className="relative z-10 text-center flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, type: "spring" }}
                    className="mb-12"
                >
                    <p className="font-mono text-lime tracking-[0.3em] text-sm md:text-base uppercase mb-6 drop-shadow-[0_0_10px_rgba(204,255,0,0.5)]">
                        Warning: High-Intensity Protocol
                    </p>
                    <GlitchText
                        text="ARE YOU READY"
                        className="text-5xl md:text-8xl font-black text-white"
                        speed="slow"
                    />
                    <GlitchText
                        text="TO SHIP?"
                        className="text-5xl md:text-8xl font-black text-white"
                        speed="slow"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.5, type: "spring", bounce: 0.6 }}
                >
                    <Link href="/onboard/identity">
                        <ForgeButton
                            size="lg"
                            className="py-6 px-12 text-2xl font-black rounded-full bg-lime text-obsidian hover:bg-white hover:text-obsidian hover:shadow-[0_0_50px_rgba(204,255,0,0.6)] border-none transition-all duration-300"
                        >
                            COMMENCE UPLINK
                        </ForgeButton>
                    </Link>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    className="mt-12 font-mono text-white/30 text-xs lowercase tracking-widest"
                >
                    pressing this button constitutes a legally binding commitment to extreme execution.
                </motion.p>
            </div>
        </div>
    );
}
