/**
 * Score Routes — Ship Score Engine API
 *
 * GET  /api/score/departments           → List all available departments
 * GET  /api/score/departments/:id       → Get scoring parameters for a department
 * POST /api/score/compute               → Compute Ship Score for an artifact
 */

import { Router, Request, Response } from "express";
import {
    getAllDepartments,
    getDepartmentConfig,
    getDepartmentParameters,
    computeShipScore,
} from "../lib/ship-score";

const router = Router();

/**
 * GET /api/score/departments
 * Returns all available departments with id, name, icon, description.
 * Used by frontend dropdowns and onboarding.
 */
router.get("/departments", (_req: Request, res: Response) => {
    const departments = getAllDepartments();
    res.json({ departments });
});

/**
 * GET /api/score/departments/:id
 * Returns the full config for a single department, including all
 * scoring parameters with labels, weights, and input types.
 * The frontend uses this to dynamically render the scoring form.
 */
router.get("/departments/:id", (req: Request, res: Response) => {
    const id = req.params.id as string;
    const config = getDepartmentConfig(id);

    if (!config) {
        res.status(404).json({
            error: `Department "${id}" not found`,
            available: getAllDepartments().map(d => d.id),
        });
        return;
    }

    res.json({ department: config });
});

/**
 * GET /api/score/departments/:id/parameters
 * Returns just the scoring parameters for a department.
 * Lighter payload if you don't need the full config.
 */
router.get("/departments/:id/parameters", (req: Request, res: Response) => {
    const id = req.params.id as string;
    const parameters = getDepartmentParameters(id);

    if (parameters.length === 0) {
        res.status(404).json({ error: `No parameters found for department "${id}"` });
        return;
    }

    res.json({ departmentId: id, parameters });
});

/**
 * POST /api/score/compute
 * Body: { departmentId: string, inputs: { [paramKey]: number } }
 *
 * Computes the Ship Score for the given inputs using the department's
 * weighted parameters. Returns total score + full breakdown.
 */
router.post("/compute", (req: Request, res: Response) => {
    try {
        const { departmentId, inputs } = req.body;

        if (!departmentId || typeof departmentId !== "string") {
            res.status(400).json({ error: "departmentId is required (string)" });
            return;
        }

        if (!inputs || typeof inputs !== "object") {
            res.status(400).json({ error: "inputs is required (object with paramKey: number)" });
            return;
        }

        const result = computeShipScore(departmentId, inputs);
        res.json({ score: result });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error";
        res.status(400).json({ error: message });
    }
});

export default router;
