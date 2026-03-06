"use client";

import { Star } from "lucide-react";

export default function EntrepreneurTicker() {
    const items = [
        "12,400+ Entrepreneurs Verified",
        "₹48 Cr+ Matched",
        "94% Hiring Rate from Ship Log",
        "6 Protocol Systems Active",
        "24/7 Real-Time Verification",
        "Zero Gatekeepers",
    ];

    return (
        <div className="overflow-hidden bg-ink py-4 select-none">
            <div className="flex animate-ticker-scroll whitespace-nowrap hover:[animation-play-state:paused]">
                {[...items, ...items].map((item, i) => (
                    <span key={i} className="flex items-center gap-5 mx-6">
                        <span className="font-sans text-[0.82rem] text-cream/80 tracking-wide font-medium">
                            {item}
                        </span>
                        <Star className="w-2.5 h-2.5 text-royal-gold fill-royal-gold opacity-60" />
                    </span>
                ))}
            </div>
        </div>
    );
}
