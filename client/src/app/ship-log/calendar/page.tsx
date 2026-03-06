"use client";

import { motion } from "framer-motion";
import { BentoCard, ForgeButton, PulseTag } from "@/components/forge";
import { useState } from "react";

const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const WEEKS = 6;

// Generate mock availability data
const generateCalendarData = () => {
    const data: Record<string, "available" | "booked" | "blocked" | "empty">[][] = [];
    for (let w = 0; w < WEEKS; w++) {
        const week: Record<string, "available" | "booked" | "blocked" | "empty">[] = [];
        for (let d = 0; d < 7; d++) {
            const rand = Math.random();
            let status: "available" | "booked" | "blocked" | "empty";
            if (rand < 0.4) status = "available";
            else if (rand < 0.65) status = "booked";
            else if (rand < 0.8) status = "blocked";
            else status = "empty";
            week.push({ status });
        }
        data.push(week);
    }
    return data;
};

const STATUS_COLORS: Record<string, string> = {
    available: "bg-lime/60 hover:bg-lime/80 border-lime/30",
    booked: "bg-cyber/40 hover:bg-cyber/60 border-cyber/30",
    blocked: "bg-acid/20 hover:bg-acid/40 border-acid/20",
    empty: "bg-white/[0.02] border-white/5",
};

const STATUS_LABELS: Record<string, string> = {
    available: "Open for Sprints",
    booked: "Currently Committed",
    blocked: "Unavailable",
    empty: "No Data",
};

export default function AvailabilityCalendarPage() {
    const [calendarData] = useState(generateCalendarData);

    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans">

            <main className="max-w-5xl mx-auto px-6 py-32">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <h1 className="font-clash font-bold text-5xl mb-4">Sprint Capacity</h1>
                        <p className="font-mono text-white/50 max-w-xl">
                            Your availability matrix. Project owners use this to see when you can commit to new War Rooms.
                        </p>
                    </div>
                    <ForgeButton variant="secondary">
                        EDIT SCHEDULE
                    </ForgeButton>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-6 mb-8">
                    {Object.entries(STATUS_LABELS).map(([key, label]) => (
                        <div key={key} className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded-sm border ${STATUS_COLORS[key]}`} />
                            <span className="font-mono text-xs text-white/50">{label}</span>
                        </div>
                    ))}
                </div>

                {/* Calendar Grid */}
                <BentoCard className="p-8">
                    {/* Day Headers */}
                    <div className="grid grid-cols-7 gap-2 mb-4">
                        {DAYS.map(day => (
                            <div key={day} className="text-center font-mono text-xs text-white/30 uppercase tracking-widest">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Weeks */}
                    <div className="space-y-2">
                        {calendarData.map((week, wi) => (
                            <div key={wi} className="grid grid-cols-7 gap-2">
                                {week.map((day, di) => (
                                    <motion.div
                                        key={`${wi}-${di}`}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: (wi * 7 + di) * 0.01 }}
                                        className={`aspect-square rounded-sm border cursor-pointer transition-all duration-200 ${STATUS_COLORS[day.status]}`}
                                        title={`Week ${wi + 1}, ${DAYS[di]} — ${STATUS_LABELS[day.status]}`}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </BentoCard>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                    <BentoCard className="p-5 text-center">
                        <p className="font-clash font-bold text-3xl text-lime">18</p>
                        <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-1">Open Slots</p>
                    </BentoCard>
                    <BentoCard className="p-5 text-center">
                        <p className="font-clash font-bold text-3xl text-cyber">12</p>
                        <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-1">Booked</p>
                    </BentoCard>
                    <BentoCard className="p-5 text-center">
                        <p className="font-clash font-bold text-3xl text-acid">8</p>
                        <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-1">Blocked</p>
                    </BentoCard>
                    <BentoCard className="p-5 text-center">
                        <PulseTag label="AVAILABLE NOW" status="live" />
                    </BentoCard>
                </div>
            </main>
        </div>
    );
}
