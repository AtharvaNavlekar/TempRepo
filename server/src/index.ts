/**
 * CollabRise API Server — Express entry point
 * Standalone backend server that provides REST API endpoints.
 */

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth";
import feedRoutes from "./routes/feed";
import inviteRoutes from "./routes/invite";
import userRoutes from "./routes/user";

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

/* ─── Middleware ─── */
app.use(cors({
    origin: CLIENT_URL,
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

/* ─── Routes ─── */
app.use("/api/auth", authRoutes);
app.use("/api/feed", feedRoutes);
app.use("/api/invite", inviteRoutes);
app.use("/api/user", userRoutes);

/* ─── Health Check ─── */
app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});

/* ─── Start ─── */
app.listen(PORT, () => {
    console.log(`\n🚀 CollabRise API Server running on http://localhost:${PORT}`);
    console.log(`   CORS origin: ${CLIENT_URL}\n`);
});
