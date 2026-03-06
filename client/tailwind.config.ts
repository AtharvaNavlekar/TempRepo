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
                // -- The Forge Reborn -- Luxury Canvas --
                cream: "#F5F0E8",
                parchment: "#EDE5D0",
                champagne: "#F8F3EA",
                ivory: "#FDFBF7",
                ink: "#0D0D0D",

                // -- Primary Accent -- Royal Gold --
                saffron: "#D4872E",
                saffron2: "#B8711F",
                gold: "#C9933A",
                "royal-gold": "#D4A853",
                bronze: "#8B6914",

                // -- Secondary Accent -- Royal Indigo --
                indigo: "#2D1F6E",
                violet: "#5A3FA8",
                amethyst: "#8B72D4",
                wine: "#6B2142",

                // -- Functional --
                obsidian: "#111111",
                smoke: "#6B645D",
                ash: "#C4BDB5",
                white: "#FFFFFF",

                // -- Status Colors --
                success: "#2D6A4F",
                warning: "#D4872E",
                danger: "#C0392B",

                // -- Preserved App / Auth Theme --
                lime: "#CCFF00",
                cyber: "#8A2BE2",
                acid: "#FF00FF",
                "lime-dim": "#99cc00",
                "cyber-dim": "#6a1fb2",
                "acid-dim": "#cc00cc",
                "glass-white": "rgba(255, 255, 255, 0.04)",
                "glass-border": "rgba(255, 255, 255, 0.08)",
            },
            fontFamily: {
                serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
                sans: ["var(--font-dm-sans)", "DM Sans", "system-ui", "sans-serif"],
                mono: ["var(--font-jetbrains)", "JetBrains Mono", "Fira Code", "monospace"],
                display: ["var(--font-cormorant)", "Cormorant Garamond", "Playfair Display", "serif"],
                clash: ["var(--font-dm-sans)", "DM Sans", "system-ui", "sans-serif"],
            },
            borderRadius: {
                bento: "1rem",
                "bento-sm": "0.5rem",
                "bento-lg": "1.5rem",
                pill: "9999px",
            },
            boxShadow: {
                card: "0 2px 24px rgba(13,13,13,0.06), 0 1px 3px rgba(13,13,13,0.03)",
                "card-hover": "0 20px 60px rgba(13,13,13,0.10), 0 4px 16px rgba(201,147,58,0.08)",
                luxury: "0 8px 40px rgba(13,13,13,0.05), 0 2px 8px rgba(201,147,58,0.06)",
                "luxury-hover": "0 20px 60px rgba(13,13,13,0.10), 0 4px 16px rgba(201,147,58,0.12)",
                saffron: "0 4px 20px rgba(212,135,46,0.28)",
                "ink": "0 4px 24px rgba(13,13,13,0.5)",
                "glow-gold": "0 0 60px rgba(212,168,83,0.18), 0 0 20px rgba(212,168,83,0.08)",
                "gold-rim": "0 0 0 1px rgba(201,147,58,0.12), 0 4px 24px rgba(13,13,13,0.05)",
                // Preserved app theme shadows
                brutal: "0 0 10px 0 rgba(204, 255, 0, 0.2), inset 0 0 4px 0 rgba(204, 255, 0, 0.1)",
                "brutal-cyber": "0 0 10px 0 rgba(138, 43, 226, 0.2), inset 0 0 4px 0 rgba(138, 43, 226, 0.1)",
                glass: "0 8px 32px 0 rgba(0, 0, 0, 0.5)",
                glow: "0 0 30px rgba(204, 255, 0, 0.15)",
                hover: "0 8px 32px rgba(0,0,0,0.12)",
            },
            backdropBlur: {
                glass: "16px",
                "glass-heavy": "32px",
            },
            animation: {
                "pulse-ring": "pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                "ticker-scroll": "ticker-scroll 30s linear infinite",
                float: "float 5s ease-in-out infinite",
                "fade-up": "fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
                grain: "grain 8s steps(10) infinite",
                shimmer: "shimmer 3s ease-in-out infinite",
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
                    "50%": { transform: "translateY(-14px)" },
                },
                "fade-up": {
                    "0%": { opacity: "0", transform: "translateY(24px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                shimmer: {
                    "0%": { opacity: "0.5" },
                    "50%": { opacity: "1" },
                    "100%": { opacity: "0.5" },
                },
            },
        },
    },
    plugins: [],
};

export default config;
