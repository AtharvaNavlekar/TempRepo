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
                obsidian: "#050505", // The true Cyberpunk black
                lime: "#CCFF00", // High voltage Lime
                cyber: "#8A2BE2", // Deep Cyber Purple
                acid: "#FF00FF", // Acid Pink
                "lime-dim": "#99cc00",
                "cyber-dim": "#6a1fb2",
                "acid-dim": "#cc00cc",
                "glass-white": "rgba(255, 255, 255, 0.04)",
                "glass-border": "rgba(255, 255, 255, 0.08)",
            },
            fontFamily: {
                clash: ["Inter", "system-ui", "sans-serif"], // Keeping the clean, readable Inter
                mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
            },
            borderRadius: {
                bento: "1rem",
                "bento-sm": "0.5rem",
                "bento-lg": "1.5rem",
            },
            boxShadow: {
                // Neon glow execution replacing brutalism
                brutal: "0 0 10px 0 rgba(204, 255, 0, 0.3), inset 0 0 4px 0 rgba(204, 255, 0, 0.2)",
                "brutal-cyber": "0 0 10px 0 rgba(138, 43, 226, 0.3), inset 0 0 4px 0 rgba(138, 43, 226, 0.2)",
                "brutal-acid": "0 0 10px 0 rgba(255, 0, 255, 0.3), inset 0 0 4px 0 rgba(255, 0, 255, 0.2)",
                "brutal-sm": "0 0 5px 0 rgba(204, 255, 0, 0.3)",
                glass: "0 8px 32px 0 rgba(0, 0, 0, 0.5)",
                glow: "0 0 24px rgba(204, 255, 0, 0.4)", // Intense inner/outer neon volume blur
                "glow-cyber": "0 0 24px rgba(138, 43, 226, 0.4)",
                "glow-acid": "0 0 24px rgba(255, 0, 255, 0.4)",
            },
            backdropBlur: {
                glass: "16px",
                "glass-heavy": "32px",
            },
            animation: {
                "pulse-ring": "pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                "ticker-scroll": "ticker-scroll 30s linear infinite",
                glitch: "pulse-ring 2s infinite", // Use soft pulse instead of twitchy glitch
                "glitch-skew": "float 6s ease-in-out infinite",
                grain: "grain 8s steps(10) infinite",
                float: "float 6s ease-in-out infinite",
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
                    "50%": { transform: "translateY(-10px)" }, // Gentler float
                },
            },
        },
    },
    plugins: [],
};

export default config;
