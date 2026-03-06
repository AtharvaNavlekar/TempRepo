"use client";

import { useEffect } from "react";
import { useCollabRiseStore } from "@/store/store";
import type { JWTPayload } from "@/lib/auth";

export default function AuthProvider({ user, children }: { user: JWTPayload | null, children: React.ReactNode }) {
    const setUser = useCollabRiseStore(state => state.setUser);

    // Set the initial user on mount and sync if auth cookie changes
    useEffect(() => {
        setUser(user);
    }, [user, setUser]);

    return <>{children}</>;
}
