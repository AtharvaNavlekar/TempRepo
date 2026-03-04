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
                obsidian: "#050505",
                lime: "#CCFF00",
                cyber: "#8A2BE2",
                acid: "#FF00FF",
                "lime-dim": "#99cc00",
                "cyber-dim": "#6a1fb2",
                "acid-dim": "#cc00cc",
                "glass-white": "rgba(255, 255, 255, 0.06)",
                "glass-border": "rgba(255, 255, 255, 0.1)",
            },
            fontFamily: {
                clash: ["var(--font-clash)", "sans-serif"],
                mono: ["var(--font-jetbrains)", "monospace"],
            },
            borderRadius: {
                bento: "1.25rem",
                "bento-sm": "0.75rem",
                "bento-lg": "1.75rem",
            },
            boxShadow: {
                brutal: "4px 4px 0px 0px #CCFF00",
                "brutal-cyber": "4px 4px 0px 0px #8A2BE2",
                "brutal-acid": "4px 4px 0px 0px #FF00FF",
                "brutal-sm": "2px 2px 0px 0px #CCFF00",
                glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
                glow: "0 0 20px rgba(204, 255, 0, 0.3)",
                "glow-cyber": "0 0 20px rgba(138, 43, 226, 0.3)",
                "glow-acid": "0 0 20px rgba(255, 0, 255, 0.3)",
            },
            backdropBlur: {
                glass: "16px",
                "glass-heavy": "24px",
            },
            animation: {
                "pulse-ring": "pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                "ticker-scroll": "ticker-scroll 30s linear infinite",
                glitch: "glitch 2s infinite",
                "glitch-skew": "glitch-skew 2s infinite",
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
                glitch: {
                    "0%, 100%": { clipPath: "inset(0 0 0 0)" },
                    "20%": { clipPath: "inset(20% 0 60% 0)" },
                    "40%": { clipPath: "inset(40% 0 40% 0)" },
                    "60%": { clipPath: "inset(60% 0 20% 0)" },
                    "80%": { clipPath: "inset(80% 0 0% 0)" },
                },
                "glitch-skew": {
                    "0%, 100%": { transform: "skew(0deg)" },
                    "20%": { transform: "skew(-2deg)" },
                    "40%": { transform: "skew(1deg)" },
                    "60%": { transform: "skew(-1deg)" },
                    "80%": { transform: "skew(2deg)" },
                },
                grain: {
                    "0%, 100%": { transform: "translate(0, 0)" },
                    "10%": { transform: "translate(-5%, -10%)" },
                    "20%": { transform: "translate(-15%, 5%)" },
                    "30%": { transform: "translate(7%, -25%)" },
                    "40%": { transform: "translate(-5%, 25%)" },
                    "50%": { transform: "translate(-15%, 10%)" },
                    "60%": { transform: "translate(15%, 0%)" },
                    "70%": { transform: "translate(0%, 15%)" },
                    "80%": { transform: "translate(3%, 35%)" },
                    "90%": { transform: "translate(-10%, 10%)" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-20px)" },
                },
            },
        },
    },
    plugins: [],
};

export default config;
