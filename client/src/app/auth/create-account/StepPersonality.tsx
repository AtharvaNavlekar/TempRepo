"use client";
import { FormTextarea, RadioGroup, TagPicker, FormInput } from "./FormField";
import type { BuilderPersonalityData, CompanyCultureData } from "./types";
import { GUILDS, TEAM_SKILLS, FINDER_METHODS } from "./types";

/* ────── BUILDER PERSONALITY ────── */
interface BuilderPersonalityProps {
    data: BuilderPersonalityData;
    onChange: (d: BuilderPersonalityData) => void;
    errors: Partial<Record<keyof BuilderPersonalityData, string>>;
}

export function StepBuilderPersonality({ data, onChange, errors }: BuilderPersonalityProps) {
    return (
        <div className="space-y-6">
            <div className="p-4 bg-lime/5 border border-lime/20 rounded-bento-sm">
                <p className="font-mono text-[11px] text-lime/80 uppercase tracking-widest mb-1">🚀 This is what makes CollabRise different</p>
                <p className="font-mono text-xs text-white/50">We don&apos;t want your résumé. We want your story as a founder.</p>
            </div>
            <FormTextarea
                label="Your Founder Manifesto"
                placeholder="I start ventures because... / My superpower is... / What drives me to launch..."
                value={data.manifesto}
                onChange={e => onChange({ ...data, manifesto: e.target.value })}
                error={errors.manifesto}
                maxLen={300}
                currentLen={data.manifesto.length}
                rows={4}
            />
            <FormInput
                label="Your Best Scaled Venture"
                placeholder="e.g. Scaled a SaaS to 10k MRR or launched a successful non-profit"
                value={data.bestProject}
                onChange={e => onChange({ ...data, bestProject: e.target.value })}
                error={errors.bestProject}
            />
            <RadioGroup
                label="Commitment Level"
                value={data.commitmentLevel}
                onChange={v => onChange({ ...data, commitmentLevel: v })}
                error={errors.commitmentLevel}
                columns={3}
                options={[
                    { value: "casual", label: "CASUAL", desc: "Hobbyist founder" },
                    { value: "builder", label: "FOUNDER", desc: "Consistent launcher" },
                    { value: "hardcore", label: "HARDCORE", desc: "Launch and scale at all costs" },
                ]}
            />
            <TagPicker
                label="Join Guilds"
                options={GUILDS}
                selected={data.guilds}
                onChange={guilds => onChange({ ...data, guilds })}
                error={errors.guilds as string}
                max={5}
                accentColor="lime"
            />
        </div>
    );
}

/* ────── COMPANY CULTURE ────── */
interface CompanyCultureProps {
    data: CompanyCultureData;
    onChange: (d: CompanyCultureData) => void;
    errors: Partial<Record<keyof CompanyCultureData, string>>;
}

export function StepCompanyCulture({ data, onChange, errors }: CompanyCultureProps) {
    return (
        <div className="space-y-6">
            <FormTextarea
                label="What makes your team different?"
                placeholder="We move fast, ship real features, value craftsmanship..."
                value={data.companyDifferentiator}
                onChange={e => onChange({ ...data, companyDifferentiator: e.target.value })}
                error={errors.companyDifferentiator}
                maxLen={300}
                currentLen={data.companyDifferentiator.length}
                rows={4}
            />
            <TagPicker
                label="Team Tech Stack"
                options={TEAM_SKILLS}
                selected={data.teamStack}
                onChange={teamStack => onChange({ ...data, teamStack })}
                error={errors.teamStack as string}
                accentColor="cyber"
            />
            <TagPicker
                label="How Will You Find Co-founders?"
                options={FINDER_METHODS}
                selected={data.findBuildersVia}
                onChange={findBuildersVia => onChange({ ...data, findBuildersVia })}
                error={errors.findBuildersVia as string}
                accentColor="cyber"
            />
            <TagPicker
                label="Recruit From Guilds (optional)"
                options={GUILDS}
                selected={data.recruitFromGuilds}
                onChange={recruitFromGuilds => onChange({ ...data, recruitFromGuilds })}
                accentColor="cyber"
            />
        </div>
    );
}
