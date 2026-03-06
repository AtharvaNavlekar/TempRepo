/**
 * ship-score.ts — Dynamic Ship Score Engine
 *
 * Department-aware scoring system. Each department has its own
 * set of weighted parameters. When an artifact is submitted,
 * the engine looks up the department config and computes a final
 * score out of 100.
 *
 * Adding a new department is as simple as adding an entry to
 * DEPARTMENT_CONFIGS — everything else adapts automatically.
 */

/* ═══════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════ */

/** A single scoring parameter definition */
export interface ScoreParameter {
    key: string;           // unique machine key, e.g. "codeComplexity"
    label: string;         // human label, e.g. "Code Complexity"
    description: string;   // tooltip / help text for the builder
    weight: number;        // 0–1, all weights in a department must sum to 1
    inputType: "slider" | "boolean" | "select";
    min?: number;          // for slider
    max?: number;          // for slider
    options?: string[];    // for select
}

/** The full configuration for one department */
export interface DepartmentConfig {
    id: string;
    name: string;
    icon: string;
    description: string;
    parameters: ScoreParameter[];
}

/** What the builder submits (key → value) */
export interface ScoreInputs {
    [parameterKey: string]: number; // always normalized to 0–100
}

/** The result of scoring an artifact */
export interface ScoreResult {
    department: string;
    totalScore: number;                     // 0–100 final weighted score
    breakdown: {
        parameterKey: string;
        parameterLabel: string;
        rawValue: number;
        weight: number;
        weightedScore: number;
    }[];
    scoredAt: string;
}

/* ═══════════════════════════════════════════════════════════
   DEPARTMENT CONFIGURATIONS
   Add a new department here → the entire system adapts.
   ═══════════════════════════════════════════════════════════ */

export const DEPARTMENT_CONFIGS: DepartmentConfig[] = [
    // ── Software Engineering ─────────────────────────────
    {
        id: "software-engineering",
        name: "Software Engineering",
        icon: "💻",
        description: "Apps, APIs, websites, tools, open-source libraries",
        parameters: [
            {
                key: "codeComplexity",
                label: "Code Complexity",
                description: "Number of files, languages used, architecture depth",
                weight: 0.25,
                inputType: "slider", min: 0, max: 100,
            },
            {
                key: "techStackBreadth",
                label: "Tech Stack Breadth",
                description: "How many different technologies were used",
                weight: 0.15,
                inputType: "slider", min: 0, max: 100,
            },
            {
                key: "isDeployed",
                label: "Is It Live / Deployed?",
                description: "A live URL scores higher than just a repo",
                weight: 0.20,
                inputType: "boolean",
            },
            {
                key: "documentationQuality",
                label: "Documentation Quality",
                description: "README, comments, API docs",
                weight: 0.10,
                inputType: "slider", min: 0, max: 100,
            },
            {
                key: "communityTraction",
                label: "Community Traction",
                description: "Stars, forks, downloads (if open source)",
                weight: 0.10,
                inputType: "slider", min: 0, max: 100,
            },
            {
                key: "builderConsistency",
                label: "Builder Consistency",
                description: "Total number of projects shipped by this builder",
                weight: 0.10,
                inputType: "slider", min: 0, max: 100,
            },
            {
                key: "endorsement",
                label: "Client / Peer Endorsement",
                description: "Has the work been verified by someone?",
                weight: 0.10,
                inputType: "boolean",
            },
        ],
    },

    {
        id: "data-science",
        name: "Data Science / Analytics",
        icon: "📊",
        description: "ML models, dashboards, data analysis, visualizations",
        parameters: [
            {
                key: "modelPerformance",
                label: "Model Accuracy / Performance",
                description: "Accuracy %, F1 score, RMSE — actual ML metrics",
                weight: 0.25,
                inputType: "slider", min: 0, max: 100,
            },
            {
                key: "datasetComplexity",
                label: "Dataset Complexity",
                description: "Size + structured vs unstructured",
                weight: 0.15,
                inputType: "select",
                options: ["Small (< 10K rows)", "Medium (10K-1M)", "Large (1M-100M)", "Massive (100M+)"],
            },
            {
                key: "businessImpact",
                label: "Business Impact",
                description: "Did the analysis actually drive a real decision?",
                weight: 0.20,
                inputType: "slider", min: 0, max: 100,
            },
            {
                key: "visualizationQuality",
                label: "Visualization Quality",
                description: "Raw numbers vs beautiful dashboards",
                weight: 0.15,
                inputType: "slider", min: 0, max: 100,
            },
            {
                key: "codeMethodology",
                label: "Code / Methodology",
                description: "Is the notebook clean, reproducible, well-documented?",
                weight: 0.15,
                inputType: "slider", min: 0, max: 100,
            },
            {
                key: "endorsement",
                label: "Stakeholder Endorsement",
                description: "Were the insights actually used?",
                weight: 0.10,
                inputType: "boolean",
            },
        ],
    },
];

/* ═══════════════════════════════════════════════════════════
   SCORING ENGINE
   ═══════════════════════════════════════════════════════════ */

/**
 * Get the config for a department by ID.
 * Returns undefined if the department doesn't exist.
 */
export function getDepartmentConfig(departmentId: string): DepartmentConfig | undefined {
    return DEPARTMENT_CONFIGS.find(d => d.id === departmentId);
}

/**
 * Get all available departments (for dropdowns, onboarding, etc.)
 */
export function getAllDepartments(): Pick<DepartmentConfig, "id" | "name" | "icon" | "description">[] {
    return DEPARTMENT_CONFIGS.map(({ id, name, icon, description }) => ({ id, name, icon, description }));
}

/**
 * Get the scoring parameters for a specific department.
 * Used by the frontend to dynamically render the scoring form.
 */
export function getDepartmentParameters(departmentId: string): ScoreParameter[] {
    const config = getDepartmentConfig(departmentId);
    return config?.parameters ?? [];
}

/**
 * Normalize a select option to a 0-100 score.
 * First option = 25, second = 50, third = 75, fourth = 100
 */
function normalizeSelectValue(optionIndex: number, totalOptions: number): number {
    if (totalOptions <= 1) return 100;
    return Math.round(((optionIndex + 1) / totalOptions) * 100);
}

/**
 * Compute the Ship Score for an artifact.
 *
 * @param departmentId - The department this artifact belongs to
 * @param inputs       - Key-value pairs where key = parameter key, value = raw score (0-100)
 *                       For booleans: 0 = false, 100 = true
 *                       For selects:  pass the option index (0-based), will be normalized
 *
 * @returns ScoreResult with total + per-parameter breakdown
 */
export function computeShipScore(departmentId: string, inputs: ScoreInputs): ScoreResult {
    const config = getDepartmentConfig(departmentId);

    if (!config) {
        throw new Error(`Unknown department: "${departmentId}". Available: ${DEPARTMENT_CONFIGS.map(d => d.id).join(", ")}`);
    }

    const breakdown: ScoreResult["breakdown"] = [];
    let totalScore = 0;

    for (const param of config.parameters) {
        let rawValue = inputs[param.key] ?? 0;

        // Clamp to 0-100
        rawValue = Math.max(0, Math.min(100, rawValue));

        // For select inputs, normalize the option index
        if (param.inputType === "select" && param.options) {
            rawValue = normalizeSelectValue(rawValue, param.options.length);
        }

        // For booleans: input should be 0 or 100
        if (param.inputType === "boolean") {
            rawValue = rawValue > 0 ? 100 : 0;
        }

        const weightedScore = Math.round(rawValue * param.weight);
        totalScore += weightedScore;

        breakdown.push({
            parameterKey: param.key,
            parameterLabel: param.label,
            rawValue,
            weight: param.weight,
            weightedScore,
        });
    }

    // Ensure total is capped at 100
    totalScore = Math.min(100, Math.round(totalScore));

    return {
        department: departmentId,
        totalScore,
        breakdown,
        scoredAt: new Date().toISOString(),
    };
}
