"use client";

import { useRef, useEffect } from "react";
import { TerminalBlock } from "@/components/forge";

const MANIFESTO_TEXT = `We don't care about your resume. We don't care about your LinkedIn. We don't care what school you went to or who you know. We care about one thing — what have you SHIPPED? In a world drowning in credentials, we built a protocol for proof. Every line of code. Every pixel pushed. Every dish plated. Every pitch delivered. Verified. On chain. Undeniable. This is CollabRise. This is the Forge. Ship. Or die trying.`;

export default function ManifestoScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const wordsRef = useRef<HTMLSpanElement[]>([]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const el = entry.target as HTMLSpanElement;
                        el.style.opacity = "1";
                        el.style.transform = "translateY(0)";
                        el.style.filter = "blur(0px)";
                    }
                });
            },
            {
                root: null,
                rootMargin: "0px 0px -20% 0px",
                threshold: 0.1,
            }
        );

        wordsRef.current.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const words = MANIFESTO_TEXT.split(" ");

    const BOOT_LINES = [
        "// COLLABRISE PROTOCOL v1.0.0",
        "[OK] Initializing Ship Score Engine...",
        "[OK] Loading Artifact Verification Layer...",
        "[OK] Connecting to Guild Network...",
        "[OK] Syncing Builder DNA Profiles...",
        "[OK] Commitment Contract Module: ARMED",
        "[OK] Failure Vault: ENCRYPTED",
        "[OK] The Forge is ONLINE.",
        "",
        "> Welcome, Builder. Your journey starts now.",
        "> Type 'ship --init' to begin.",
    ];

    /* Highlight specific words in the editorial dark style */
    const getWordColor = (word: string): string => {
        if (["SHIPPED?", "CollabRise.", "Forge.", "Undeniable."].includes(word))
            return "#131313";
        if (["Ship.", "die"].includes(word))
            return "#555555";
        return "#555555";
    };

    return (
        <section
            className="relative py-24 md:py-32 px-6 md:px-12"
            style={{ background: "var(--bg-base)" }}
        >
            <div className="max-w-4xl mx-auto">
                {/* Section label */}
                <div className="flex items-center gap-4 mb-12">
                    <div className="h-px flex-1 bg-black/[0.07]" />
                    <span className="overline-label">The Manifesto</span>
                    <div className="h-px flex-1 bg-black/[0.07]" />
                </div>

                {/* Word-by-word reveal */}
                <div ref={containerRef} className="mb-16">
                    <p className="font-serif text-2xl md:text-3xl lg:text-4xl leading-relaxed font-normal text-[#131313]">
                        {words.map((word, i) => (
                            <span
                                key={i}
                                ref={(el) => {
                                    if (el) wordsRef.current[i] = el;
                                }}
                                className="inline-block mr-[0.3em] mb-1 transition-all duration-700"
                                style={{
                                    opacity: 0,
                                    transform: "translateY(12px)",
                                    filter: "blur(4px)",
                                    transitionDelay: `${i * 30}ms`,
                                    color: getWordColor(word),
                                    fontWeight: ["SHIPPED?", "CollabRise.", "Forge."].includes(word)
                                        ? 500
                                        : 400,
                                }}
                            >
                                {word}
                            </span>
                        ))}
                    </p>
                </div>

                {/* Terminal boot sequence (preserved in dark glass for contrast) */}
                <div className="max-w-2xl mx-auto">
                    <TerminalBlock
                        lines={BOOT_LINES}
                        title="forge://system-boot"
                        typingSpeed={25}
                    />
                </div>
            </div>
        </section>
    );
}
