"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { BentoCard } from "@/components/forge";

const QUESTIONS = [
    {
        id: "q1",
        title: "Project Scope Alignment",
        left: { label: "Perfect Architecture", desc: "If it's not scalable, it's garbage.", vibe: "#CCFF00" },
        right: { label: "Ship It Yesterday", desc: "Move fast and break things.", vibe: "#FF00FF" }
    },
    {
        id: "q2",
        title: "Communication Style",
        left: { label: "Async Written Log", desc: "If it's not documented, it didn't happen.", vibe: "#FFFFFF" },
        right: { label: "Live Voice Syncs", desc: "Let's hop on a 5-min huddle.", vibe: "#8A2BE2" }
    },
    {
        id: "q3",
        title: "Failure Handling",
        left: { label: "Deep Post-Mortem", desc: "Analyze the root cause matrix.", vibe: "#CCFF00" },
        right: { label: "Burn It & Rebuild", desc: "Wipe the repo and start fresh.", vibe: "#FF00FF" }
    }
];

export default function PsychometricPage() {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [, setAnswers] = useState<Record<string, 'left' | 'right'>>({});
    const [isFinishing, setIsFinishing] = useState(false);

    const handleChoice = (choice: 'left' | 'right') => {
        setAnswers(prev => ({ ...prev, [QUESTIONS[currentIndex].id]: choice }));

        if (currentIndex < QUESTIONS.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            setIsFinishing(true);
            setTimeout(() => {
                router.push("/onboard/seed");
            }, 1500);
        }
    };

    const activeQuestion = QUESTIONS[currentIndex];

    return (
        <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center p-4 relative overflow-hidden">

            {/* Background Index Number */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-black text-white/[0.02] pointer-events-none select-none">
                0{currentIndex + 1}
            </div>

            <div className="w-full max-w-5xl z-10 relative">
                <div className="mb-12 text-center">
                    <p className="font-mono text-white/50 text-sm tracking-widest uppercase mb-4">
                        Phase 2 // Psychometric Calibration
                    </p>
                    <div className="flex gap-2 justify-center mb-8">
                        {QUESTIONS.map((_, i) => (
                            <div
                                key={i}
                                className={`h-1 transition-all duration-300 ${i < currentIndex ? "w-8 bg-white/50" : i === currentIndex ? "w-16 bg-lime shadow-[0_0_10px_rgba(204,255,0,0.5)]" : "w-8 bg-white/10"
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                <div className="h-[400px] relative">
                    <AnimatePresence mode="wait">
                        {!isFinishing ? (
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)", transition: { duration: 0.3 } }}
                                transition={{ type: "spring", bounce: 0.4 }}
                                className="absolute inset-0 flex flex-col items-center"
                            >
                                <h2 className="font-clash font-bold text-3xl md:text-5xl text-white mb-10">
                                    {activeQuestion.title}
                                </h2>

                                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                                    {/* Left Choice */}
                                    <BentoCard
                                        className="flex flex-col items-center justify-center text-center p-8 cursor-pointer hover:bg-white/5 group border-white/10 transition-colors"
                                        onClick={() => handleChoice('left')}
                                    >
                                        <div className="w-16 h-16 rounded-full border border-white/20 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <span className="font-mono text-xs opacity-50">01</span>
                                        </div>
                                        <h3 className="font-clash font-bold text-2xl text-white mb-2" style={{ color: activeQuestion.left.vibe }}>
                                            {activeQuestion.left.label}
                                        </h3>
                                        <p className="font-mono text-white/50 text-sm">
                                            &quot;{activeQuestion.left.desc}&quot;
                                        </p>
                                    </BentoCard>

                                    {/* Right Choice */}
                                    <BentoCard
                                        className="flex flex-col items-center justify-center text-center p-8 cursor-pointer hover:bg-white/5 group border-white/10 transition-colors"
                                        onClick={() => handleChoice('right')}
                                    >
                                        <div className="w-16 h-16 rounded-full border border-white/20 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <span className="font-mono text-xs opacity-50">02</span>
                                        </div>
                                        <h3 className="font-clash font-bold text-2xl text-white mb-2" style={{ color: activeQuestion.right.vibe }}>
                                            {activeQuestion.right.label}
                                        </h3>
                                        <p className="font-mono text-white/50 text-sm">
                                            &quot;{activeQuestion.right.desc}&quot;
                                        </p>
                                    </BentoCard>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="finishing"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 flex flex-col items-center justify-center text-center"
                            >
                                <div className="w-24 h-24 rounded-full border-2 border-dashed border-lime animate-spin-slow flex items-center justify-center mb-6">
                                    <div className="w-16 h-16 rounded-full bg-lime/20 blur-md"></div>
                                </div>
                                <h2 className="font-clash font-bold text-3xl text-white">CALIBRATING NEURAL PROFILE</h2>
                                <p className="font-mono text-lime mt-4 text-sm uppercase tracking-widest">Compiling baseline parameters...</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
