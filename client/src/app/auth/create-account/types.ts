/**
 * types.ts — Shared form types for the multi-step create account flow
 */

export type AccountType = "builder" | "company";

export interface CoreData {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    handle: string;
    country: string;
}

export interface BuilderDetailsData {
    craft: string;
    experienceLevel: string;
    yearsOfExperience: number;
    skills: string[];
    githubUrl: string;
    portfolioUrl: string;
    employmentStatus: string;
}

export interface BuilderPrefsData {
    openToBounties: boolean;
    minBountyReward: number;
    preferredProjectLength: string[];
    workPreference: string;
    availability: number;
}

export interface BuilderPersonalityData {
    manifesto: string;
    commitmentLevel: string;
    guilds: string[];
    bestProject: string;
}

export interface CompanyDetailsData {
    companyName: string;
    industry: string;
    companySize: string;
    companyWebsite: string;
    recruiterTitle: string;
    recruiterLinkedIn: string;
}

export interface CompanyPrefsData {
    hiringFor: string[];
    targetRoles: string[];
    targetExperienceLevels: string[];
    minBudget: number;
    maxBudget: number;
    remotePolicy: string;
    hqLocation: string;
}

export interface CompanyCultureData {
    teamStack: string[];
    companyDifferentiator: string;
    findBuildersVia: string[];
    recruitFromGuilds: string[];
}

export interface FinalData {
    agreedToTerms: boolean;
    agreedToProtocol: boolean;
    referralSource: string;
    newsletterSubscribed: boolean;
}

export interface FormState {
    accountType: AccountType | null;
    core: CoreData;
    builderDetails: BuilderDetailsData;
    builderPrefs: BuilderPrefsData;
    builderPersonality: BuilderPersonalityData;
    companyDetails: CompanyDetailsData;
    companyPrefs: CompanyPrefsData;
    companyCulture: CompanyCultureData;
    final: FinalData;
}

export const INITIAL_FORM_STATE: FormState = {
    accountType: null,
    core: { fullName: "", email: "", password: "", confirmPassword: "", handle: "", country: "" },
    builderDetails: { craft: "", experienceLevel: "", yearsOfExperience: 0, skills: [], githubUrl: "", portfolioUrl: "", employmentStatus: "" },
    builderPrefs: { openToBounties: true, minBountyReward: 500, preferredProjectLength: [], workPreference: "", availability: 10 },
    builderPersonality: { manifesto: "", commitmentLevel: "", guilds: [], bestProject: "" },
    companyDetails: { companyName: "", industry: "", companySize: "", companyWebsite: "", recruiterTitle: "", recruiterLinkedIn: "" },
    companyPrefs: { hiringFor: [], targetRoles: [], targetExperienceLevels: [], minBudget: 500, maxBudget: 5000, remotePolicy: "", hqLocation: "" },
    companyCulture: { teamStack: [], companyDifferentiator: "", findBuildersVia: [], recruitFromGuilds: [] },
    final: { agreedToTerms: false, agreedToProtocol: false, referralSource: "", newsletterSubscribed: false },
};

export const SKILLS = ["React", "Next.js", "TypeScript", "Python", "Node.js", "Vue", "Go", "Rust", "Swift", "Kotlin", "Solidity", "PostgreSQL", "MongoDB", "Docker", "AWS", "GraphQL", "TailwindCSS", "Unity", "C++", "Java", "C#"];
export const GUILDS = ["⚡ React Guild", "🔧 Backend Guild", "🔒 Security Guild", "🤖 AI/ML Guild", "🎮 Game Dev Guild", "📐 Hardware Guild", "🌐 Web3 Guild", "📱 Mobile Guild", "☁️ Cloud Guild", "📊 Data Guild"];
export const CRAFTS = ["Frontend Engineer", "Backend Engineer", "Fullstack Engineer", "Mobile Developer", "Data Scientist", "Machine Learning Engineer", "DevOps Engineer", "Security Researcher", "Smart Contract Engineer", "Hardware Engineer", "Tech Founder", "Cloud Architect"];
export const INDUSTRIES = ["SaaS / Software", "Fintech", "Gaming", "Healthcare", "E-commerce", "Web3 / Crypto", "AI / ML", "EdTech", "Hardware / IoT", "Deep Tech", "Cybersecurity", "Cloud Computing"];
export const COUNTRIES = ["India", "United States", "United Kingdom", "Germany", "Canada", "Australia", "Singapore", "France", "Brazil", "Japan", "Netherlands", "UAE", "Other"];
export const TEAM_SKILLS = ["React", "Next.js", "TypeScript", "Python", "Go", "Rust", "AWS", "GCP", "PostgreSQL", "MongoDB", "Docker", "Kubernetes", "GraphQL", "Solidity", "Swift", "Kotlin", "C++", "Java"];
export const FINDER_METHODS = ["Browse Venture Logs", "Post Strategic Bounties", "Run Venture Challenges", "Browse Alpha Leaderboard", "Guild Networking"];
export const REFERRAL_SOURCES = ["Twitter / X", "GitHub", "ProductHunt", "Friend Referral", "LinkedIn", "Discord", "YouTube", "Other"];
