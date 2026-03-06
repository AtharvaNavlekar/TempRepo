import { create } from "zustand";
import type { JWTPayload } from "@/lib/types";

interface PulseEvent {
    id: string;
    builder: string;
    action: string;
    project: string;
    timestamp: number;
    status: "live" | "shipped" | "staked" | "building";
}

interface CollabRiseStore {
    // Auth State
    user: JWTPayload | null;
    setUser: (user: JWTPayload | null) => void;

    // Legacy Auth State (for /onboard flows)
    identity: string;
    setIdentity: (id: string) => void;
    selectedGuilds: string[];
    setSelectedGuilds: (guilds: string[]) => void;

    // Venture Score
    shipScore: number;
    incrementScore: (amount: number) => void;
    setScore: (score: number) => void;

    // Global Pulse
    pulseEvents: PulseEvent[];
    addPulseEvent: (event: PulseEvent) => void;
    clearPulse: () => void;
}

export const useCollabRiseStore = create<CollabRiseStore>((set) => ({
    // Auth State
    user: null,
    setUser: (user) => set({ user }),

    // Legacy Auth State (for /onboard flows)
    identity: "",
    setIdentity: (id) => set({ identity: id }),
    selectedGuilds: [],
    setSelectedGuilds: (guilds) => set({ selectedGuilds: guilds }),

    // Venture Score
    shipScore: 0,
    incrementScore: (amount) =>
        set((state) => ({ shipScore: state.shipScore + amount })),
    setScore: (score) => set({ shipScore: score }),

    // Global Pulse
    pulseEvents: [],
    addPulseEvent: (event) =>
        set((state) => ({
            pulseEvents: [event, ...state.pulseEvents].slice(0, 50),
        })),
    clearPulse: () => set({ pulseEvents: [] }),
}));

