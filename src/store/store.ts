import { create } from "zustand";

interface PulseEvent {
    id: string;
    builder: string;
    action: string;
    project: string;
    timestamp: number;
    status: "live" | "shipped" | "staked" | "building";
}

interface CollabRiseStore {
    // Ship Score
    shipScore: number;
    incrementScore: (amount: number) => void;
    setScore: (score: number) => void;

    // Global Pulse
    pulseEvents: PulseEvent[];
    addPulseEvent: (event: PulseEvent) => void;
    clearPulse: () => void;
}

export const useCollabRiseStore = create<CollabRiseStore>((set) => ({
    // Ship Score
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
