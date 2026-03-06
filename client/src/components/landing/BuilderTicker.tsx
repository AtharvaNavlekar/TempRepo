"use client";

import { PulseTag } from "@/components/forge";

interface TickerEvent {
    id: number;
    founder: string;
    action: string;
    project: string;
    status: "live" | "launched" | "staked" | "launching";
}

const MOCK_EVENTS: TickerEvent[] = [
    { id: 1, founder: "maya_dev", action: "launched", project: "Neural Dashboard v3", status: "launched" },
    { id: 2, founder: "0xkai", action: "started venture", project: "DeFi Swap Engine", status: "launching" },
    { id: 3, founder: "aria.design", action: "staked 200pts on", project: "Brand Overhaul", status: "staked" },
    { id: 4, founder: "chef_marco", action: "went live with", project: "Recipe AI Platform", status: "live" },
    { id: 5, founder: "rust_queen", action: "launched", project: "CLI Tool Suite", status: "launched" },
    { id: 6, founder: "pixel_punk", action: "started venture", project: "3D Portfolio Experience", status: "launching" },
    { id: 7, founder: "jade.wu", action: "launched", project: "Mobile Payment App", status: "launched" },
    { id: 8, founder: "no_sleep_dev", action: "staked 500pts on", project: "Real-Time Chat Engine", status: "staked" },
    { id: 9, founder: "ux_nomad", action: "went live with", project: "Design System v2", status: "live" },
    { id: 10, founder: "fullstack_fury", action: "launched", project: "AI Content Pipeline", status: "launched" },
    { id: 11, founder: "code_artisan", action: "started venture", project: "Blockchain Verifier", status: "launching" },
    { id: 12, founder: "sarah.builds", action: "launched", project: "E-Commerce Platform", status: "launched" },
];

function TickerItem({ event }: { event: TickerEvent }) {
    return (
        <div className="inline-flex items-center gap-3 px-6 py-3 mx-2 rounded-xl bg-white border border-black/[0.07] shadow-card whitespace-nowrap flex-shrink-0">
            <PulseTag status={event.status} />
            <span className="text-[13px] font-semibold text-[#1A1A1A]">
                @{event.founder}
            </span>
            <span className="text-[13px] text-[#8C8C8C]">
                {event.action}
            </span>
            <span className="text-[13px] font-medium text-[#4A4A4A]">
                {event.project}
            </span>
        </div>
    );
}

export default function BuilderTicker() {
    const allEvents = [...MOCK_EVENTS, ...MOCK_EVENTS];

    return (
        <div className="w-full overflow-hidden py-10 relative" style={{ background: "var(--bg-surface)" }}>
            {/* Divider label */}
            <div className="flex items-center gap-4 mb-6 px-6 md:px-12">
                <div className="h-px flex-1 bg-black/[0.07]" />
                <span className="overline-label">Live Founder Pulse</span>
                <div className="h-px flex-1 bg-black/[0.07]" />
            </div>

            {/* Scrolling ticker */}
            <div className="flex animate-ticker-scroll hover:[animation-play-state:paused]">
                {allEvents.map((event, i) => (
                    <TickerItem key={`${event.id}-${i}`} event={event} />
                ))}
            </div>

            {/* Edge fades */}
            <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-site-surface to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-site-surface to-transparent z-10 pointer-events-none" />
        </div>
    );
}
