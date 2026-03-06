"use client";

import { useEffect } from "react";
import { useCollabRiseStore } from "@/store/store";
import { apiFetch } from "@/lib/api";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const setUser = useCollabRiseStore(state => state.setUser);

    // Fetch the current user from the API on mount
    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await apiFetch("/auth/me");
                if (res.ok) {
                    const data = await res.json();
                    setUser({
                        userId: data.id,
                        email: data.email,
                        handle: data.handle,
                        type: data.type,
                    });
                } else {
                    setUser(null);
                }
            } catch {
                setUser(null);
            }
        }
        fetchUser();
    }, [setUser]);

    return <>{children}</>;
}
