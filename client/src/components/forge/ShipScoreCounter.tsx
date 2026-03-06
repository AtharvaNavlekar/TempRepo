"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useCallback, useState } from "react";

interface ShipScoreCounterProps {
    value: number;
    label?: string;
    className?: string;
    size?: "sm" | "md" | "lg";
}

interface Particle {
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    color: string;
    size: number;
}

export default function ShipScoreCounter({
    value,
    label = "SHIP SCORE",
    className = "",
    size = "lg",
}: ShipScoreCounterProps) {
    const prevValue = useRef(value);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animFrameRef = useRef<number>(0);
    const [isExploding, setIsExploding] = useState(false);

    const springValue = useSpring(value, {
        stiffness: 100,
        damping: 20,
        mass: 1,
    });

    const displayValue = useTransform(springValue, (v) => Math.round(v));

    const spawnParticles = useCallback(() => {
        const colors = ["#CCFF00", "#8A2BE2", "#FF00FF", "#FFFFFF", "#e6ff66"];
        const newParticles: Particle[] = [];

        for (let i = 0; i < 40; i++) {
            const angle = (Math.PI * 2 * i) / 40 + (Math.random() - 0.5) * 0.5;
            const speed = 2 + Math.random() * 6;
            newParticles.push({
                id: Date.now() + i,
                x: 0,
                y: 0,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: 2 + Math.random() * 4,
            });
        }

        particlesRef.current = [...particlesRef.current, ...newParticles];
        setIsExploding(true);
        setTimeout(() => setIsExploding(false), 600);
    }, []);

    useEffect(() => {
        springValue.set(value);
        if (value > prevValue.current) {
            spawnParticles();
        }
        prevValue.current = value;
    }, [value, springValue, spawnParticles]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const animate = () => {
            ctx.clearRect(0, 0, rect.width, rect.height);

            const cx = rect.width / 2;
            const cy = rect.height / 2;

            particlesRef.current = particlesRef.current
                .map((p) => ({
                    ...p,
                    x: p.x + p.vx,
                    y: p.y + p.vy,
                    vy: p.vy + 0.1,
                    life: p.life - 0.015,
                    vx: p.vx * 0.98,
                }))
                .filter((p) => p.life > 0);

            particlesRef.current.forEach((p) => {
                ctx.beginPath();
                ctx.arc(cx + p.x, cy + p.y, p.size * p.life, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.life;
                ctx.fill();
                ctx.globalAlpha = 1;
            });

            animFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => cancelAnimationFrame(animFrameRef.current);
    }, []);

    const sizeClasses = {
        sm: "text-3xl",
        md: "text-5xl",
        lg: "text-7xl md:text-8xl",
    };

    return (
        <div className={`relative inline-flex flex-col items-center ${className}`}>
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
                style={{ width: "100%", height: "100%" }}
            />

            <motion.div
                className="relative z-0"
                animate={
                    isExploding
                        ? {
                            scale: [1, 1.2, 0.95, 1.05, 1],
                            rotate: [0, -2, 3, -1, 0],
                        }
                        : {}
                }
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 12,
                }}
            >
                <span
                    className={`
            font-clash font-bold tabular-nums
            text-gradient-lime
            ${sizeClasses[size]}
          `}
                >
                    <motion.span>{displayValue}</motion.span>
                </span>
            </motion.div>

            <span className="font-mono text-xs tracking-[0.3em] text-white/50 uppercase mt-2">
                {label}
            </span>
        </div>
    );
}
