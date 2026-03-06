import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // ── App / Authenticated Theme ──
                obsidian: "#050505",
                lime: "#CCFF00",
                cyber: "#8A2BE2",
                acid: "#FF00FF",
                "lime-dim": "#99cc00",
                "cyber-dim": "#6a1fb2",
                "acid-dim": "#cc00cc",
                "glass-white": "rgba(255, 255, 255, 0.04)",
                "glass-border": "rgba(255, 255, 255, 0.08)",

                // ── Public / Light Theme (Modern Indian) ──
                "site-base": "#FDFBF7",
                "site-surface": "#F7F3EB",
                "site-card": "#EFECE1",
                "site-primary": "#1A1A1A",
                "site-secondary": "#4A4A4A",
                "site-muted": "#8C8C8C",
                "site-border": "rgba(0,0,0,0.06)",
            },
            fontFamily: {
                clash: ["Inter", "system-ui", "sans-serif"],
                serif: ["Playfair Display", "Georgia", "serif"],
                mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
            },
            borderRadius: {
                bento: "1rem",
                "bento-sm": "0.5rem",
                "bento-lg": "1.5rem",
                pill: "9999px",
            },
            boxShadow: {
                brutal: "0 0 10px 0 rgba(204, 255, 0, 0.2), inset 0 0 4px 0 rgba(204, 255, 0, 0.1)",
                "brutal-cyber": "0 0 10px 0 rgba(138, 43, 226, 0.2), inset 0 0 4px 0 rgba(138, 43, 226, 0.1)",
                "brutal-acid": "0 0 10px 0 rgba(255, 0, 255, 0.2), inset 0 0 4px 0 rgba(255, 0, 255, 0.1)",
                "brutal-sm": "0 0 5px 0 rgba(204, 255, 0, 0.2)",
                glass: "0 8px 32px 0 rgba(0, 0, 0, 0.5)",
                glow: "0 0 30px rgba(204, 255, 0, 0.15)",
                "glow-cyber": "0 0 30px rgba(138, 43, 226, 0.15)",
                "glow-acid": "0 0 30px rgba(255, 0, 255, 0.15)",
                card: "0 2px 12px rgba(0,0,0,0.08)",
                hover: "0 8px 32px rgba(0,0,0,0.12)",
            },
            backdropBlur: {
                glass: "16px",
                "glass-heavy": "32px",
            },
            animation: {
                "pulse-ring": "pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                "ticker-scroll": "ticker-scroll 30s linear infinite",
                glitch: "pulse-ring 2s infinite",
                "glitch-skew": "float 8s ease-in-out infinite",
                grain: "grain 8s steps(10) infinite",
                float: "float 8s ease-in-out infinite",
                "fade-up": "fade-up 0.6s ease forwards",
            },
            keyframes: {
                "pulse-ring": {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: "0.5" },
                },
                "ticker-scroll": {
                    "0%": { transform: "translateX(0)" },
                    "100%": { transform: "translateX(-50%)" },
                },
                grain: {
                    "0%, 100%": { transform: "translate(0, 0)" },
                    "50%": { transform: "translate(-2%, -2%)" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-12px)" },
                },
                "fade-up": {
                    "0%": { opacity: "0", transform: "translateY(24px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
            },
        },
    },
    plugins: [],
};

export default config;
