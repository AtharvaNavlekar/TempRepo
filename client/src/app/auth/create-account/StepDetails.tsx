"use client";
import { FormInput, FormSelect, RadioGroup, TagPicker } from "./FormField";
import type { BuilderDetailsData, CompanyDetailsData } from "./types";
import { CRAFTS, SKILLS, INDUSTRIES } from "./types";

/* ────── BUILDER DETAILS ────── */
interface BuilderDetailsProps {
    data: BuilderDetailsData;
    onChange: (d: BuilderDetailsData) => void;
    errors: Partial<Record<keyof BuilderDetailsData, string>>;
}

export function StepBuilderDetails({ data, onChange, errors }: BuilderDetailsProps) {
    const set = (key: keyof BuilderDetailsData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
        onChange({ ...data, [key]: e.target.value });

    return (
        <div className="space-y-5">
            <FormSelect label="Primary Craft" value={data.craft} onChange={set("craft")} error={errors.craft} options={CRAFTS.map(c => ({ value: c, label: c }))} />
            <RadioGroup
                label="Experience Level"
                value={data.experienceLevel}
                onChange={v => onChange({ ...data, experienceLevel: v })}
                error={errors.experienceLevel}
                columns={4}
                options={[
                    { value: "beginner", label: "EARLY-STAGE", desc: "0–1 yrs" },
                    { value: "mid", label: "SCALING", desc: "1–3 yrs" },
                    { value: "senior", label: "ESTABLISHED", desc: "3–7 yrs" },
                    { value: "veteran", label: "SERIAL FOUNDER", desc: "7+ yrs" },
                ]}
            />
            <TagPicker
                label="Primary Skills"
                options={SKILLS}
                selected={data.skills}
                onChange={skills => onChange({ ...data, skills })}
                max={12}
                error={errors.skills as string}
            />
            <RadioGroup
                label="Current Status"
                value={data.employmentStatus}
                onChange={v => onChange({ ...data, employmentStatus: v })}
                error={errors.employmentStatus}
                columns={2}
                options={[
                    { value: "open", label: "OPEN TO COLLABORATE" },
                    { value: "employed", label: "FOUNDING" },
                    { value: "freelancing", label: "SOLOPRENEURING" },
                    { value: "student", label: "ASPIRING FOUNDER" },
                ]}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput label="GitHub / Source" type="url" placeholder="https://github.com/you" value={data.githubUrl} onChange={set("githubUrl")} error={errors.githubUrl} />
                <FormInput label="Venture Website / Deck" type="url" placeholder="https://venturesite.com" value={data.portfolioUrl} onChange={set("portfolioUrl")} error={errors.portfolioUrl} />
            </div>
        </div>
    );
}

/* ────── COMPANY DETAILS ────── */
interface CompanyDetailsProps {
    data: CompanyDetailsData;
    onChange: (d: CompanyDetailsData) => void;
    errors: Partial<Record<keyof CompanyDetailsData, string>>;
}

export function StepCompanyDetails({ data, onChange, errors }: CompanyDetailsProps) {
    const set = (key: keyof CompanyDetailsData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
        onChange({ ...data, [key]: e.target.value });

    return (
        <div className="space-y-5">
            <FormInput label="Company Name" placeholder="e.g. NeonLabs Inc." value={data.companyName} onChange={set("companyName")} error={errors.companyName} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormSelect label="Industry" value={data.industry} onChange={set("industry")} error={errors.industry} options={INDUSTRIES.map(i => ({ value: i, label: i }))} />
                <FormSelect
                    label="Company Size"
                    value={data.companySize}
                    onChange={set("companySize")}
                    error={errors.companySize}
                    options={["1-10", "11-50", "51-200", "200+"].map(s => ({ value: s, label: s + " people" }))}
                />
            </div>
            <FormInput label="Company Website" type="url" placeholder="https://yourcompany.com" value={data.companyWebsite} onChange={set("companyWebsite")} error={errors.companyWebsite} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput label="Your Title / Role" placeholder="e.g. Head of Talent" value={data.recruiterTitle} onChange={set("recruiterTitle")} error={errors.recruiterTitle} />
                <FormInput label="Your LinkedIn" type="url" placeholder="https://linkedin.com/in/you" value={data.recruiterLinkedIn} onChange={set("recruiterLinkedIn")} error={errors.recruiterLinkedIn} />
            </div>
        </div>
    );
}
