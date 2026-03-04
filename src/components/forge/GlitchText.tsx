"use client";

import React, { useRef, useEffect, useState } from "react";

interface GlitchTextProps {
    text: string;
    className?: string;
    as?: "h1" | "h2" | "h3" | "h4" | "span" | "p";
    continuous?: boolean;
    speed?: "slow" | "normal" | "fast";
    colors?: [string, string, string];
}

export default function GlitchText({
    text,
    className = "",
    as: Tag = "h2",
    continuous = false,
    speed = "normal",
    colors = ["#CCFF00", "#8A2BE2", "#FF00FF"],
}: GlitchTextProps) {
    const [isGlitching, setIsGlitching] = useState(continuous);
    const containerRef = useRef<HTMLDivElement>(null);

    const speedDuration: Record<string, string> = {
        slow: "3s",
        normal: "2s",
        fast: "1s",
    };

    useEffect(() => {
        if (continuous) {
            setIsGlitching(true);
        }
    }, [continuous]);

    return (
        <div
            ref={containerRef}
            className={`relative inline-block ${className}`}
            onMouseEnter={() => !continuous && setIsGlitching(true)}
            onMouseLeave={() => !continuous && setIsGlitching(false)}
            style={
                {
                    "--glitch-color-1": colors[0],
                    "--glitch-color-2": colors[1],
                    "--glitch-color-3": colors[2],
                    "--glitch-speed": speedDuration[speed],
                } as React.CSSProperties
            }
        >
            <Tag className="relative font-clash font-bold">
                {text}
                {isGlitching && (
                    <>
                        <span
                            aria-hidden
                            className="absolute inset-0 font-clash font-bold"
                            style={{
                                color: colors[0],
                                animation: `glitch-1 var(--glitch-speed) infinite linear alternate-reverse`,
                                clipPath: "inset(40% 0 20% 0)",
                                transform: "translate(-2px, 2px)",
                                opacity: 0.8,
                            }}
                        >
                            {text}
                        </span>
                        <span
                            aria-hidden
                            className="absolute inset-0 font-clash font-bold"
                            style={{
                                color: colors[1],
                                animation: `glitch-2 var(--glitch-speed) infinite linear alternate-reverse`,
                                clipPath: "inset(20% 0 60% 0)",
                                transform: "translate(2px, -2px)",
                                opacity: 0.8,
                            }}
                        >
                            {text}
                        </span>
                    </>
                )}
            </Tag>

            <style jsx>{`
        @keyframes glitch-1 {
          0% {
            clip-path: inset(40% 0 20% 0);
            transform: translate(-2px, 2px);
          }
          20% {
            clip-path: inset(10% 0 70% 0);
            transform: translate(3px, -1px);
          }
          40% {
            clip-path: inset(80% 0 5% 0);
            transform: translate(-1px, 3px);
          }
          60% {
            clip-path: inset(25% 0 45% 0);
            transform: translate(2px, -2px);
          }
          80% {
            clip-path: inset(55% 0 15% 0);
            transform: translate(-3px, 1px);
          }
          100% {
            clip-path: inset(35% 0 30% 0);
            transform: translate(1px, -3px);
          }
        }

        @keyframes glitch-2 {
          0% {
            clip-path: inset(20% 0 60% 0);
            transform: translate(2px, -2px);
          }
          20% {
            clip-path: inset(70% 0 10% 0);
            transform: translate(-1px, 3px);
          }
          40% {
            clip-path: inset(5% 0 80% 0);
            transform: translate(3px, -1px);
          }
          60% {
            clip-path: inset(45% 0 25% 0);
            transform: translate(-2px, 2px);
          }
          80% {
            clip-path: inset(15% 0 55% 0);
            transform: translate(1px, -3px);
          }
          100% {
            clip-path: inset(60% 0 20% 0);
            transform: translate(-3px, 1px);
          }
        }
      `}</style>
        </div>
    );
}
