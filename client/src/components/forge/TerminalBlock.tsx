"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface TerminalBlockProps {
    lines: string[];
    className?: string;
    typingSpeed?: number;
    title?: string;
    autoPlay?: boolean;
}

export default function TerminalBlock({
    lines,
    className = "",
    typingSpeed = 30,
    title = "system.log",
    autoPlay = true,
}: TerminalBlockProps) {
    const [displayedLines, setDisplayedLines] = useState<string[]>([]);
    const [currentLine, setCurrentLine] = useState(0);
    const [currentChar, setCurrentChar] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!autoPlay || isComplete) return;

        if (currentLine >= lines.length) {
            setIsComplete(true);
            return;
        }

        const line = lines[currentLine];

        if (currentChar < line.length) {
            const timeout = setTimeout(() => {
                setDisplayedLines((prev) => {
                    const updated = [...prev];
                    updated[currentLine] = line.substring(0, currentChar + 1);
                    return updated;
                });
                setCurrentChar((c) => c + 1);
            }, typingSpeed + Math.random() * 20);

            return () => clearTimeout(timeout);
        } else {
            const timeout = setTimeout(() => {
                setCurrentLine((l) => l + 1);
                setCurrentChar(0);
                setDisplayedLines((prev) => [...prev, ""]);
            }, 200);

            return () => clearTimeout(timeout);
        }
    }, [currentLine, currentChar, lines, typingSpeed, autoPlay, isComplete]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [displayedLines]);

    return (
        <motion.div
            className={`
        rounded-bento overflow-hidden
        border border-white/[0.08]
        bg-[#0a0a0a]
        ${className}
      `}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
        >
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="font-mono text-xs text-white/40 ml-2">{title}</span>
            </div>

            {/* Terminal body */}
            <div
                ref={scrollRef}
                className="p-4 max-h-[300px] overflow-y-auto font-mono text-sm leading-relaxed"
            >
                {displayedLines.map((line, i) => (
                    <div key={i} className="flex gap-2">
                        <span className="text-lime/40 select-none">
                            {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className={line.startsWith("//") ? "text-white/30" : line.startsWith("[ERR]") ? "text-red-400" : line.startsWith("[OK]") ? "text-lime" : "text-white/70"}>
                            {line}
                            {i === displayedLines.length - 1 && !isComplete && (
                                <motion.span
                                    className="inline-block w-2 h-4 bg-lime ml-0.5 align-middle"
                                    animate={{ opacity: [1, 0] }}
                                    transition={{ duration: 0.7, repeat: Infinity }}
                                />
                            )}
                        </span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
