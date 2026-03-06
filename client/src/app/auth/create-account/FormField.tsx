"use client";
/**
 * FormField.tsx — Reusable field components for the create-account form
 */
import { useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    hint?: string;
    suffix?: React.ReactNode;
}

export function FormInput({ label, error, hint, suffix, className = "", ...props }: InputProps) {
    return (
        <div className="space-y-1.5">
            <label className="block font-sans font-bold text-[10px] tracking-widest text-smoke uppercase">
                {label}
            </label>
            <div className="relative">
                <input
                    className={`w-full bg-white/60 border ${error ? "border-red-500/60 focus:border-red-500" : "border-ink/10 focus:border-royal-gold"} rounded-lg px-4 py-3 font-sans text-[13px] font-medium text-ink placeholder:text-smoke/40 outline-none transition-all duration-200 backdrop-blur-sm shadow-sm ${suffix ? "pr-24" : ""} ${className}`}
                    {...props}
                />
                {suffix && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">{suffix}</div>
                )}
            </div>
            {error && <p className="font-sans font-medium text-[10px] text-red-500">{error}</p>}
            {hint && !error && <p className="font-sans font-medium text-[10px] text-smoke/70">{hint}</p>}
        </div>
    );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    error?: string;
    maxLen?: number;
    currentLen?: number;
}

export function FormTextarea({ label, error, maxLen, currentLen, className = "", ...props }: TextareaProps) {
    return (
        <div className="space-y-1.5">
            <div className="flex justify-between items-center">
                <label className="block font-sans font-bold text-[10px] tracking-widest text-smoke uppercase">{label}</label>
                {maxLen && <span className={`font-sans font-bold text-[10px] ${(currentLen ?? 0) > maxLen * 0.9 ? "text-red-500" : "text-smoke/60"}`}>{currentLen ?? 0}/{maxLen}</span>}
            </div>
            <textarea
                className={`w-full bg-white/60 border ${error ? "border-red-500/60 focus:border-red-500" : "border-ink/10 focus:border-royal-gold"} rounded-lg px-4 py-3 font-sans text-[13px] font-medium text-ink placeholder:text-smoke/40 outline-none transition-all duration-200 backdrop-blur-sm shadow-sm resize-none ${className}`}
                {...props}
            />
            {error && <p className="font-sans font-medium text-[10px] text-red-500">{error}</p>}
        </div>
    );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    error?: string;
    options: { value: string; label: string }[];
}

export function FormSelect({ label, error, options, className = "", ...props }: SelectProps) {
    return (
        <div className="space-y-1.5">
            <label className="block font-sans font-bold text-[10px] tracking-widest text-smoke uppercase">{label}</label>
            <select
                className={`w-full bg-white/60 border ${error ? "border-red-500/60" : "border-ink/10 focus:border-royal-gold"} rounded-lg px-4 py-3 font-sans text-[13px] font-medium text-ink outline-none transition-all duration-200 backdrop-blur-sm shadow-sm appearance-none cursor-pointer ${className}`}
                {...props}
            >
                <option value="" className="bg-white text-ink">Select...</option>
                {options.map(o => <option key={o.value} value={o.value} className="bg-white text-ink">{o.label}</option>)}
            </select>
            {error && <p className="font-sans font-medium text-[10px] text-red-500">{error}</p>}
        </div>
    );
}

interface TagPickerProps {
    label: string;
    options: string[];
    selected: string[];
    onChange: (val: string[]) => void;
    max?: number;
    error?: string;
    accentColor?: "saffron" | "indigo" | "gold";
}

export function TagPicker({ label, options, selected, onChange, max, error, accentColor = "saffron" }: TagPickerProps) {
    const accent = { saffron: "border-saffron/40 bg-saffron/10 text-saffron", indigo: "border-indigo/40 bg-indigo/10 text-indigo", gold: "border-royal-gold/40 bg-royal-gold/10 text-royal-gold" }[accentColor];
    const toggle = (val: string) => {
        if (selected.includes(val)) onChange(selected.filter(s => s !== val));
        else if (!max || selected.length < max) onChange([...selected, val]);
    };
    return (
        <div className="space-y-2">
            <div className="flex justify-between">
                <label className="block font-sans font-bold text-[10px] tracking-widest text-smoke uppercase">{label}</label>
                {max && <span className="font-sans font-bold text-[10px] text-smoke/60">{selected.length}/{max}</span>}
            </div>
            <div className="flex flex-wrap gap-2">
                {options.map(opt => (
                    <button
                        key={opt}
                        type="button"
                        onClick={() => toggle(opt)}
                        className={`px-3 py-1.5 rounded-full border font-sans font-semibold text-xs transition-all duration-150 shadow-sm ${selected.includes(opt) ? accent : "border-ink/10 text-smoke hover:text-ink hover:border-ink/30 bg-white/50"}`}
                    >
                        {opt}
                    </button>
                ))}
            </div>
            {error && <p className="font-sans font-medium text-[10px] text-red-500">{error}</p>}
        </div>
    );
}

interface RadioGroupProps {
    label: string;
    options: { value: string; label: string; desc?: string }[];
    value: string;
    onChange: (val: string) => void;
    error?: string;
    columns?: 2 | 3 | 4;
}

export function RadioGroup({ label, options, value, onChange, error, columns = 2 }: RadioGroupProps) {
    const cols = { 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-4" }[columns];
    return (
        <div className="space-y-2">
            <label className="block font-sans font-bold text-[10px] tracking-widest text-smoke uppercase">{label}</label>
            <div className={`grid ${cols} gap-2`}>
                {options.map(opt => (
                    <button
                        key={opt.value}
                        type="button"
                        onClick={() => onChange(opt.value)}
                        className={`p-3 rounded-lg border text-left transition-all duration-150 shadow-sm ${value === opt.value ? "border-saffron/50 bg-saffron/5" : "bg-white/50 border-ink/10 hover:border-ink/30"}`}
                    >
                        <p className={`font-sans font-bold text-xs ${value === opt.value ? "text-saffron" : "text-ink/80"}`}>{opt.label}</p>
                        {opt.desc && <p className="font-sans font-medium text-[10px] text-smoke/70 mt-0.5">{opt.desc}</p>}
                    </button>
                ))}
            </div>
            {error && <p className="font-sans font-medium text-[10px] text-red-500">{error}</p>}
        </div>
    );
}

interface SliderProps {
    label: string;
    value: number;
    min: number;
    max: number;
    step?: number;
    onChange: (val: number) => void;
    format?: (val: number) => string;
}

export function FormSlider({ label, value, min, max, step = 1, onChange, format }: SliderProps) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <label className="font-sans font-bold text-[10px] tracking-widest text-smoke uppercase">{label}</label>
                <span className="font-serif italic font-bold text-lg text-saffron">{format ? format(value) : value}</span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={e => onChange(Number(e.target.value))}
                className="w-full h-1.5 bg-ink/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-saffron [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-luxury"
            />
            <div className="flex justify-between font-sans font-medium text-[10px] text-smoke/60">
                <span>{format ? format(min) : min}</span>
                <span>{format ? format(max) : max}</span>
            </div>
        </div>
    );
}

export function Toggle({ label, checked, onChange, desc }: { label: string; checked: boolean; onChange: (v: boolean) => void; desc?: string }) {
    return (
        <div className="flex items-center justify-between p-4 bg-white/60 shadow-sm border border-ink/10 rounded-lg">
            <div>
                <p className="font-sans font-bold text-[13px] text-ink">{label}</p>
                {desc && <p className="font-sans font-medium text-[10px] text-smoke/70 mt-0.5">{desc}</p>}
            </div>
            <button
                type="button"
                onClick={() => onChange(!checked)}
                className={`relative w-12 h-6 rounded-full transition-all duration-300 ${checked ? "bg-saffron" : "bg-ink/10"}`}
            >
                <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-sm duration-300 ${checked ? "left-7" : "left-1"}`} />
            </button>
        </div>
    );
}

export function PasswordInput({ label, error, hint, ...props }: Omit<InputProps, "type">) {
    const [show, setShow] = useState(false);
    return (
        <FormInput
            label={label}
            error={error}
            hint={hint}
            type={show ? "text" : "password"}
            suffix={
                <button type="button" onClick={() => setShow(s => !s)} className="font-sans font-bold text-[10px] text-saffron hover:text-ink uppercase tracking-widest transition-colors">
                    {show ? "HIDE" : "SHOW"}
                </button>
            }
            {...props}
        />
    );
}

export function PasswordStrength({ password }: { password: string }) {
    const checks = [
        password.length >= 8,
        /[A-Z]/.test(password),
        /[a-z]/.test(password),
        /[0-9]/.test(password),
        /[^A-Za-z0-9]/.test(password),
    ];
    const score = checks.filter(Boolean).length;
    const levels = ["", "WEAK", "FAIR", "GOOD", "STRONG", "VERY STRONG"];
    const colors = ["", "bg-red-500", "bg-orange-500", "bg-yellow-400", "bg-saffron", "bg-saffron"];
    const textColors = ["", "text-red-500", "text-orange-500", "text-yellow-400", "text-saffron", "text-saffron"];
    if (!password) return null;
    return (
        <div className="space-y-1.5">
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= score ? colors[score] : "bg-ink/10"}`} />
                ))}
            </div>
            <p className={`font-sans font-bold tracking-widest text-[10px] ${textColors[score]}`}>{levels[score]}</p>
        </div>
    );
}
