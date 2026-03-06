"use client";

import { useState } from "react";
import { X, Sparkles } from "lucide-react";

export default function AnnouncementBanner() {
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    return (
        <div
            className="relative flex items-center justify-center gap-3 px-4 py-2.5 text-sm text-white"
            style={{
                background:
                    "linear-gradient(90deg, #E86A33 0%, #FF9933 40%, #D81B60 100%)",
            }}
            role="banner"
            aria-label="Site announcement"
        >
            <Sparkles className="w-3.5 h-3.5 shrink-0 text-white/80" aria-hidden="true" />
            <p className="font-sans text-[13px] font-medium leading-tight tracking-wide">
                <span className="mr-2 rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-widest">
                    New
                </span>
                CollabRise is now in public beta.{" "}
                <a
                    href="/waitlist"
                    className="underline underline-offset-2 decoration-white/60 hover:decoration-white transition-colors"
                >
                    Join the waitlist →
                </a>
            </p>
            <button
                onClick={() => setVisible(false)}
                aria-label="Dismiss announcement"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setVisible(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
                <X className="w-3.5 h-3.5" />
            </button>
        </div>
    );
}
