"use client";
import { useCallback, useRef, useState } from "react";
import { FormInput, PasswordInput, PasswordStrength, FormSelect } from "./FormField";
import { apiFetch } from "@/lib/api";
import type { CoreData } from "./types";
import { COUNTRIES } from "./types";

interface StepCoreProps {
    data: CoreData;
    accountType: "builder" | "company";
    onChange: (data: CoreData) => void;
    errors: Partial<Record<keyof CoreData, string>>;
}

type AvailStatus = "idle" | "checking" | "available" | "taken";

function useAvailabilityCheck(endpoint: string, paramName: string, minLen: number) {
    const [status, setStatus] = useState<AvailStatus>("idle");
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const check = useCallback((value: string) => {
        if (timerRef.current) clearTimeout(timerRef.current);
        if (value.length < minLen) { setStatus("idle"); return; }
        setStatus("checking");
        timerRef.current = setTimeout(async () => {
            try {
                const res = await apiFetch(`/auth/${endpoint}?${paramName}=${encodeURIComponent(value)}`);
                const json = await res.json();
                setStatus(json.available ? "available" : "taken");
            } catch { setStatus("idle"); }
        }, 500);
    }, [endpoint, paramName, minLen]);

    return { status, check };
}

function AvailBadge({ status }: { status: AvailStatus }) {
    if (status === "idle") return null;
    if (status === "checking") return <span className="font-sans font-bold tracking-widest text-[10px] text-smoke/60 animate-pulse">CHECKING...</span>;
    if (status === "available") return <span className="font-sans font-bold tracking-widest text-[10px] text-saffron">✓ AVAILABLE</span>;
    return <span className="font-sans font-bold tracking-widest text-[10px] text-red-500">✗ TAKEN</span>;
}

export default function StepCore({ data, accountType, onChange, errors }: StepCoreProps) {
    const email = useAvailabilityCheck("check-email", "email", 6);
    const handle = useAvailabilityCheck("check-handle", "handle", 3);

    const set = (key: keyof CoreData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const val = e.target.value;
        onChange({ ...data, [key]: val });
        if (key === "email") email.check(val);
        if (key === "handle") handle.check(val);
    };

    return (
        <div className="space-y-5">
            <FormInput label="Full Name" placeholder="e.g. Alex Mercer" value={data.fullName} onChange={set("fullName")} error={errors.fullName} />
            <FormInput
                label="Email Address"
                type="email"
                placeholder="you@domain.com"
                value={data.email}
                onChange={set("email")}
                error={errors.email}
                suffix={<AvailBadge status={email.status} />}
            />
            <FormInput
                label={`${accountType === "builder" ? "Founder" : "Company"} Handle`}
                placeholder="yourhandle"
                value={data.handle}
                onChange={set("handle")}
                error={errors.handle}
                hint="Letters, numbers, underscores, hyphens only"
                suffix={
                    <div className="flex items-center gap-1.5">
                        <span className="font-sans font-bold text-[10px] text-smoke/60">@</span>
                        <AvailBadge status={handle.status} />
                    </div>
                }
            />
            <PasswordInput label="Password" placeholder="Min. 8 chars" value={data.password} onChange={set("password")} error={errors.password} />
            <PasswordStrength password={data.password} />
            <PasswordInput label="Confirm Password" placeholder="Repeat password" value={data.confirmPassword} onChange={set("confirmPassword")} error={errors.confirmPassword} />
            <FormSelect
                label="Country"
                value={data.country}
                onChange={set("country")}
                error={errors.country}
                options={COUNTRIES.map(c => ({ value: c, label: c }))}
            />
        </div>
    );
}
