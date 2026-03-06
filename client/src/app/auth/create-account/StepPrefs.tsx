"use client";
import { FormSlider, RadioGroup, TagPicker, Toggle, FormInput } from "./FormField";
import type { BuilderPrefsData, CompanyPrefsData } from "./types";
import { TEAM_SKILLS } from "./types";

/* ────── BUILDER PREFS ────── */
interface BuilderPrefsProps {
    data: BuilderPrefsData;
    onChange: (d: BuilderPrefsData) => void;
    errors: Partial<Record<keyof BuilderPrefsData, string>>;
}

const PROJECT_LENGTHS = ["< 1 week", "1–2 weeks", "1 month", "2–3 months", "3–6 months", "6+ months"];

export function StepBuilderPrefs({ data, onChange, errors }: BuilderPrefsProps) {
    return (
        <div className="space-y-6">
            <Toggle
                label="Open to strategic bounties?"
                desc="Get matched to ecosystem opportunities in your venture area"
                checked={data.openToBounties}
                onChange={v => onChange({ ...data, openToBounties: v })}
            />
            {data.openToBounties && (
                <FormSlider
                    label="Min. Acceptable Reward"
                    value={data.minBountyReward}
                    min={100}
                    max={10000}
                    step={100}
                    onChange={v => onChange({ ...data, minBountyReward: v })}
                    format={v => `$${v.toLocaleString()}`}
                />
            )}
            <TagPicker
                label="Preferred Project Length"
                options={PROJECT_LENGTHS}
                selected={data.preferredProjectLength}
                onChange={preferredProjectLength => onChange({ ...data, preferredProjectLength })}
                error={errors.preferredProjectLength as string}
            />
            <RadioGroup
                label="Work Preference"
                value={data.workPreference}
                onChange={v => onChange({ ...data, workPreference: v })}
                error={errors.workPreference}
                columns={4}
                options={[
                    { value: "remote", label: "REMOTE" },
                    { value: "hybrid", label: "HYBRID" },
                    { value: "onsite", label: "ON-SITE" },
                    { value: "any", label: "ANY" },
                ]}
            />
            <FormSlider
                label="Weekly Availability"
                value={data.availability}
                min={1}
                max={40}
                onChange={v => onChange({ ...data, availability: v })}
                format={v => `${v} hrs/wk`}
            />
        </div>
    );
}

/* ────── COMPANY PREFS ────── */
interface CompanyPrefsProps {
    data: CompanyPrefsData;
    onChange: (d: CompanyPrefsData) => void;
    errors: Partial<Record<keyof CompanyPrefsData, string>>;
}

const HIRING_TYPES = ["co-founder", "foundation partner", "equity based", "strategic advisor"];
const EXP_LEVELS = ["early-stage", "scaling", "established", "serial founder", "expert"];

export function StepCompanyPrefs({ data, onChange, errors }: CompanyPrefsProps) {
    const set = (key: keyof CompanyPrefsData) => (e: React.ChangeEvent<HTMLInputElement>) =>
        onChange({ ...data, [key]: e.target.value });

    return (
        <div className="space-y-6">
            <TagPicker
                label="Hiring For"
                options={HIRING_TYPES}
                selected={data.hiringFor}
                onChange={hiringFor => onChange({ ...data, hiringFor })}
                error={errors.hiringFor as string}
                accentColor="cyber"
            />
            <TagPicker
                label="Target Experience Levels"
                options={EXP_LEVELS}
                selected={data.targetExperienceLevels}
                onChange={targetExperienceLevels => onChange({ ...data, targetExperienceLevels })}
                error={errors.targetExperienceLevels as string}
                accentColor="cyber"
            />
            <div className="space-y-2">
                <p className="font-mono text-[11px] tracking-[0.2em] text-white/50 uppercase">Budget Range (USD)</p>
                <div className="grid grid-cols-2 gap-4">
                    <FormSlider label="Min Budget" value={data.minBudget} min={500} max={50000} step={500} onChange={v => onChange({ ...data, minBudget: v })} format={v => `$${v.toLocaleString()}`} />
                    <FormSlider label="Max Budget" value={data.maxBudget} min={500} max={50000} step={500} onChange={v => onChange({ ...data, maxBudget: v })} format={v => `$${v.toLocaleString()}`} />
                </div>
            </div>
            <RadioGroup
                label="Remote Policy"
                value={data.remotePolicy}
                onChange={v => onChange({ ...data, remotePolicy: v })}
                columns={4}
                options={[
                    { value: "remote", label: "REMOTE" },
                    { value: "hybrid", label: "HYBRID" },
                    { value: "onsite", label: "ON-SITE" },
                    { value: "any", label: "FLEXIBLE" },
                ]}
            />
            <FormInput label="HQ Location" placeholder="e.g. San Francisco, CA" value={data.hqLocation} onChange={set("hqLocation")} error={errors.hqLocation} />
        </div>
    );
}
