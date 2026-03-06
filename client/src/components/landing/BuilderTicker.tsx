"use client";

import { PulseTag } from "@/components/forge";

interface TickerEvent {
    id: number;
    builder: string;
    action: string;
    project: string;
    status: "live" | "shipped" | "staked" | "building";
}

const MOCK_EVENTS: TickerEvent[] = [
    { id: 1, builder: "maya_dev", action: "shipped", project: "Neural Dashboard v3", status: "shipped" },
    { id: 2, builder: "0xkai", action: "started building", project: "DeFi Swap Engine", status: "building" },
    { id: 3, builder: "aria.design", action: "staked 200pts on", project: "Brand Overhaul", status: "staked" },
    { id: 4, builder: "chef_marco", action: "went live with", project: "Recipe AI Platform", status: "live" },
    { id: 5, builder: "rust_queen", action: "shipped", project: "CLI Tool Suite", status: "shipped" },
    { id: 6, builder: "pixel_punk", action: "started building", project: "3D Portfolio Experience", status: "building" },
    { id: 7, builder: "jade.wu", action: "shipped", project: "Mobile Payment App", status: "shipped" },
    { id: 8, builder: "no_sleep_dev", action: "staked 500pts on", project: "Real-Time Chat Engine", status: "staked" },
    { id: 9, builder: "ux_nomad", action: "went live with", project: "Design System v2", status: "live" },
    { id: 10, builder: "fullstack_fury", action: "shipped", project: "AI Content Pipeline", status: "shipped" },
    { id: 11, builder: "code_artisan", action: "started building", project: "Blockchain Verifier", status: "building" },
    { id: 12, builder: "sarah.builds", action: "shipped", project: "E-Commerce Platform", status: "shipped" },
];

function TickerItem({ event }: { event: TickerEvent }) {
    return (
        <div className="inline-flex items-center gap-3 px-6 py-3 mx-2 rounded-xl bg-white border border-black/[0.07] shadow-card whitespace-nowrap flex-shrink-0">
            <PulseTag status={event.status} />
            <span className="text-[13px] font-semibold text-[#131313]">
                @{event.builder}
            </span>
            <span className="text-[13px] text-[#999]">
                {event.action}
            </span>
            <span className="text-[13px] font-medium text-[#555]">
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
                <span className="overline-label">Live Builder Pulse</span>
                <div className="h-px flex-1 bg-black/[0.07]" />
            </div>

            {/* Scrolling ticker */}
            <div className="flex animate-ticker-scroll hover:[animation-play-state:paused]">
                {allEvents.map((event, i) => (
                    <TickerItem key={`${event.id}-${i}`} event={event} />
                ))}
            </div>

            {/* Edge fades */}
            <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-[#EFEFEC] to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-[#EFEFEC] to-transparent z-10 pointer-events-none" />
        </div>
    );
}
