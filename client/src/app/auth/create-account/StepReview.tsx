"use client";
import { Toggle, FormSelect } from "./FormField";
import type { FinalData, FormState } from "./types";
import { REFERRAL_SOURCES } from "./types";

/* ─── Review Row ─── */
function ReviewRow({ label, value }: { label: string; value?: string | string[] | number | boolean }) {
    if (value === undefined || value === "" || (Array.isArray(value) && value.length === 0)) return null;
    const display = Array.isArray(value) ? value.join(", ") : typeof value === "boolean" ? (value ? "Yes" : "No") : String(value);
    return (
        <div className="flex justify-between items-start py-2 border-b border-ink/10 last:border-0">
            <span className="font-sans font-bold text-[10px] text-smoke/70 uppercase tracking-widest w-1/2">{label}</span>
            <span className="font-sans font-medium text-[13px] text-ink text-right w-1/2">{display}</span>
        </div>
    );
}

function ReviewSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="p-5 bg-white/60 border border-ink/10 rounded-lg shadow-sm">
            <p className="font-sans font-bold text-[10px] text-smoke/60 uppercase tracking-[0.25em] mb-3">{title}</p>
            {children}
        </div>
    );
}

interface StepReviewProps {
    form: FormState;
    finalData: FinalData;
    onFinalChange: (d: FinalData) => void;
    onJumpToStep: (step: number) => void;
    errors: Partial<Record<keyof FinalData, string>>;
}

export default function StepReview({ form, finalData, onFinalChange, onJumpToStep, errors }: StepReviewProps) {
    const isBuilder = form.accountType === "builder";

    return (
        <div className="space-y-5">
            {/* Summary Section */}
            <div className="space-y-4">
                <ReviewSection title="Identity">
                    <ReviewRow label="Name" value={form.core.fullName} />
                    <ReviewRow label="Email" value={form.core.email} />
                    <ReviewRow label="Handle" value={`@${form.core.handle}`} />
                    <ReviewRow label="Country" value={form.core.country} />
                    <button onClick={() => onJumpToStep(1)} className="mt-2 font-sans font-bold text-[10px] text-saffron hover:text-ink transition-colors uppercase tracking-widest">EDIT →</button>
                </ReviewSection>

                {isBuilder ? (
                    <>
                        <ReviewSection title="Founder Profile">
                            <ReviewRow label="Craft" value={form.builderDetails.craft} />
                            <ReviewRow label="Level" value={form.builderDetails.experienceLevel} />
                            <ReviewRow label="Skills" value={form.builderDetails.skills} />
                            <ReviewRow label="Status" value={form.builderDetails.employmentStatus} />
                            <button onClick={() => onJumpToStep(2)} className="mt-2 font-sans font-bold text-[10px] text-saffron hover:text-ink transition-colors uppercase tracking-widest">EDIT →</button>
                        </ReviewSection>
                        <ReviewSection title="Preferences">
                            <ReviewRow label="Open to Bounties" value={form.builderPrefs.openToBounties} />
                            <ReviewRow label="Min Reward" value={`$${form.builderPrefs.minBountyReward.toLocaleString()}`} />
                            <ReviewRow label="Work Pref" value={form.builderPrefs.workPreference} />
                            <ReviewRow label="Availability" value={`${form.builderPrefs.availability} hrs/wk`} />
                            <button onClick={() => onJumpToStep(3)} className="mt-2 font-sans font-bold text-[10px] text-saffron hover:text-ink transition-colors uppercase tracking-widest">EDIT →</button>
                        </ReviewSection>
                        <ReviewSection title="Founder Identity">
                            <ReviewRow label="Commitment" value={form.builderPersonality.commitmentLevel} />
                            <ReviewRow label="Guilds" value={form.builderPersonality.guilds} />
                            <ReviewRow label="Best Venture" value={form.builderPersonality.bestProject} />
                            <button onClick={() => onJumpToStep(4)} className="mt-2 font-sans font-bold text-[10px] text-saffron hover:text-ink transition-colors uppercase tracking-widest">EDIT →</button>
                        </ReviewSection>
                    </>
                ) : (
                    <>
                        <ReviewSection title="Company">
                            <ReviewRow label="Company" value={form.companyDetails.companyName} />
                            <ReviewRow label="Industry" value={form.companyDetails.industry} />
                            <ReviewRow label="Size" value={form.companyDetails.companySize} />
                            <ReviewRow label="Your Role" value={form.companyDetails.recruiterTitle} />
                            <button onClick={() => onJumpToStep(2)} className="mt-2 font-sans font-bold text-[10px] text-indigo hover:text-ink transition-colors uppercase tracking-widest">EDIT →</button>
                        </ReviewSection>
                        <ReviewSection title="Hiring Preferences">
                            <ReviewRow label="Hiring For" value={form.companyPrefs.hiringFor} />
                            <ReviewRow label="Budget" value={`$${form.companyPrefs.minBudget.toLocaleString()} – $${form.companyPrefs.maxBudget.toLocaleString()}`} />
                            <ReviewRow label="Remote Policy" value={form.companyPrefs.remotePolicy} />
                            <button onClick={() => onJumpToStep(3)} className="mt-2 font-sans font-bold text-[10px] text-indigo hover:text-ink transition-colors uppercase tracking-widest">EDIT →</button>
                        </ReviewSection>
                    </>
                )}
            </div>

            {/* Final Agreements */}
            <div className="pt-4 border-t border-ink/10 space-y-4">
                <FormSelect
                    label="How did you hear about CollabRise?"
                    value={finalData.referralSource}
                    onChange={e => onFinalChange({ ...finalData, referralSource: e.target.value })}
                    options={REFERRAL_SOURCES.map(r => ({ value: r, label: r }))}
                />
                <Toggle
                    label="Subscribe to Founder Digest"
                    desc="Weekly roundup of top ventures, strategic bounties, and founder insights"
                    checked={finalData.newsletterSubscribed}
                    onChange={v => onFinalChange({ ...finalData, newsletterSubscribed: v })}
                />
                <div className="space-y-3">
                    {[
                        { key: "agreedToTerms" as keyof FinalData, label: "I agree to the Terms of Service and Privacy Policy" },
                        { key: "agreedToProtocol" as keyof FinalData, label: "I agree to the Proof-of-Execution Protocol Rules — no fake traction, no vanity projects" },
                    ].map(({ key, label }) => (
                        <button
                            key={key}
                            type="button"
                            onClick={() => onFinalChange({ ...finalData, [key]: !finalData[key] })}
                            className={`w-full flex items-start gap-3 p-4 rounded-lg border text-left transition-all shadow-sm ${finalData[key] ? "border-saffron/40 bg-saffron/5" : "border-ink/10 bg-white/50 hover:bg-white/80 hover:border-ink/30"}`}
                        >
                            <div className={`mt-0.5 w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-all ${finalData[key] ? "bg-saffron border-saffron" : "border-ink/20"}`}>
                                {finalData[key] && <span className="text-white text-[10px] font-bold">✓</span>}
                            </div>
                            <span className="font-sans font-medium text-[13px] text-ink/80">{label}</span>
                        </button>
                    ))}
                    {errors.agreedToTerms && <p className="font-sans font-medium text-[10px] text-red-500">{errors.agreedToTerms}</p>}
                    {errors.agreedToProtocol && <p className="font-sans font-medium text-[10px] text-red-500">{errors.agreedToProtocol}</p>}
                </div>
            </div>
        </div>
    );
}
