"use client";

import { useRef, useEffect } from "react";
import { TerminalBlock } from "@/components/forge";

const MANIFESTO_TEXT = `We don't care about your resume. We don't care about your LinkedIn. We don't care what school you went to or who you know. We care about one thing — what have you LAUNCHED? In a world drowning in credentials, we built a protocol for proof of execution. Every venture started. Every product scaled. Every metric verified. Every pitch delivered. Validated. On chain. Undeniable. This is CollabRise. This is the Forge. Launch. Or stay stagnant.`;

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
        "[OK] Initializing Venture Score Engine...",
        "[OK] Loading Traction Verification Layer...",
        "[OK] Connecting to Guild Network...",
        "[OK] Syncing Founder Profile DNA...",
        "[OK] Commitment Contract Module: ARMED",
        "[OK] Venture Vault: ENCRYPTED",
        "[OK] The Forge is ONLINE.",
        "",
        "> Welcome, Founder. Your journey starts now.",
        "> Type 'launch --init' to begin.",
    ];

    /* Highlight specific words */
    const getWordStyle = (word: string): { color: string; weight: number } => {
        if (["LAUNCHED?", "CollabRise.", "Forge.", "Undeniable."].includes(word))
            return { color: "#0D0D0D", weight: 600 };
        if (["Launch.", "stagnant."].includes(word))
            return { color: "#EF6C33", weight: 500 };
        return { color: "#5A544F", weight: 400 };
    };

    return (
        <section
            className="relative py-24 md:py-32 px-6 md:px-12 bg-cream"
        >
            <div className="max-w-4xl mx-auto">
                {/* Section label */}
                <div className="flex items-center gap-4 mb-12">
                    <div className="h-px flex-1 bg-ink/[0.07]" />
                    <span className="section-label">The Manifesto</span>
                    <div className="h-px flex-1 bg-ink/[0.07]" />
                </div>

                {/* Word-by-word reveal */}
                <div ref={containerRef} className="mb-16">
                    <p className="font-serif text-2xl md:text-3xl lg:text-4xl leading-relaxed font-normal text-ink">
                        {words.map((word, i) => {
                            const style = getWordStyle(word);
                            return (
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
                                        color: style.color,
                                        fontWeight: style.weight,
                                    }}
                                >
                                    {word}
                                </span>
                            );
                        })}
                    </p>
                </div>

                {/* Terminal boot sequence */}
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
