"use client";

import { motion } from "framer-motion";
import { BentoCard, GlitchText } from "@/components/forge";
import { IconTerminal } from "@/components/icons";
import { useState, useRef, useEffect } from "react";

const COMMANDS = [
    { cmd: "goto /feed", desc: "Navigate to Discovery Feed", category: "NAV" },
    { cmd: "goto /bounties", desc: "Browse Challenge Marketplace", category: "NAV" },
    { cmd: "goto /guilds", desc: "Open Guild Directory", category: "NAV" },
    { cmd: "goto /pulse", desc: "View Global Pulse", category: "NAV" },
    { cmd: "score --me", desc: "Display your current Ship Score", category: "INFO" },
    { cmd: "score --user=0xAlice", desc: "View another builder's score", category: "INFO" },
    { cmd: "search bounties --status=live", desc: "Search active bounties", category: "SEARCH" },
    { cmd: "search builders --guild=react", desc: "Find builders in a guild", category: "SEARCH" },
    { cmd: "guild join react", desc: "Request to join the React Guild", category: "ACTION" },
    { cmd: "project create", desc: "Create a new War Room", category: "ACTION" },
    { cmd: "dispute file --project=proj-001", desc: "File a dispute", category: "ACTION" },
    { cmd: "deploy --staging", desc: "Deploy current build to staging", category: "ACTION" },
    { cmd: "export --format=json", desc: "Export all data as JSON", category: "UTIL" },
    { cmd: "config --theme dark", desc: "Set application theme", category: "UTIL" },
    { cmd: "help", desc: "Show all available commands", category: "UTIL" },
    { cmd: "clear", desc: "Clear terminal history", category: "UTIL" },
];

const CATEGORY_COLORS: Record<string, string> = { NAV: "text-cyber", ACTION: "text-lime", SEARCH: "text-yellow-400", INFO: "text-acid", UTIL: "text-white/40" };

export default function TerminalPage() {
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<Array<{ type: "system" | "input" | "output"; text: string }>>([
        { type: "system", text: "CollabRise Terminal v2.0.0" },
        { type: "system", text: "Type a command or press Tab to autocomplete." },
        { type: "system", text: "Type 'help' to see all available commands." },
        { type: "system", text: "" },
    ]);
    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [history]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        const newHistory = [...history, { type: "input" as const, text: `$ ${input}` }];

        if (input === "clear") { setHistory([]); setInput(""); return; }
        if (input === "help") { newHistory.push({ type: "output", text: "Available commands:" }); COMMANDS.forEach(c => newHistory.push({ type: "output", text: `  ${c.cmd.padEnd(40)} ${c.desc}` })); }
        else if (input.startsWith("score --me")) { newHistory.push({ type: "output", text: "Ship Score: 12,400 PTS | Rank: #1 Global | Streak: 14d" }); }
        else if (input.startsWith("goto")) { newHistory.push({ type: "output", text: `Navigating to ${input.replace("goto ", "")}...` }); }
        else { newHistory.push({ type: "output", text: `Command executed: ${input}` }); }

        setHistory(newHistory);
        setInput("");
    };

    const filteredCmds = input ? COMMANDS.filter(c => c.cmd.toLowerCase().includes(input.toLowerCase())).slice(0, 6) : [];

    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans">
            <main className="max-w-5xl mx-auto px-6 py-32">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="font-clash font-bold text-5xl mb-2"><GlitchText text="GLOBAL TERMINAL" /></h1>
                    <p className="font-mono text-white/50 mb-8 flex items-center gap-2"><IconTerminal className="w-4 h-4 text-lime" />K — The power user&apos;s interface. Navigate, search, and execute from one place.</p>
                </motion.div>

                {/* Terminal Window */}
                <BentoCard className="p-0 overflow-hidden border-lime/20 mb-8">
                    <div className="p-3 bg-white/5 border-b border-white/10 flex items-center gap-2">
                        <div className="w-3 h-3 bg-acid rounded-full" /><div className="w-3 h-3 bg-yellow-400 rounded-full" /><div className="w-3 h-3 bg-lime rounded-full" />
                        <span className="font-mono text-xs text-white/30 ml-3">collabrise:terminal — bash</span>
                        <span className="ml-auto font-mono text-xs text-lime/40">{history.length} lines</span>
                    </div>
                    <div className="p-6 font-mono text-sm min-h-[400px] max-h-[500px] overflow-y-auto bg-black/60 cursor-text" onClick={() => inputRef.current?.focus()}>
                        {history.map((line, i) => (
                            <div key={i} className={`${line.type === "input" ? "text-lime font-bold" : line.type === "output" ? "text-white/60" : "text-white/30"} ${line.text === "" ? "h-4" : ""}`}>
                                {line.text}
                            </div>
                        ))}
                        <div ref={bottomRef} />
                    </div>

                    {/* Autocomplete */}
                    {filteredCmds.length > 0 && (
                        <div className="border-t border-white/10 bg-white/[0.03] px-6 py-2">
                            {filteredCmds.map(c => (
                                <div key={c.cmd} className="flex items-center gap-3 p-2 rounded hover:bg-white/5 cursor-pointer transition-colors" onClick={() => { setInput(c.cmd); inputRef.current?.focus(); }}>
                                    <span className={`font-mono text-[10px] font-bold w-12 ${CATEGORY_COLORS[c.category]}`}>{c.category}</span>
                                    <span className="font-mono text-sm text-lime">{c.cmd}</span>
                                    <span className="font-mono text-xs text-white/30 ml-auto">{c.desc}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex border-t border-white/10 bg-black/40">
                        <span className="p-4 font-mono text-lime text-sm">$</span>
                        <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} placeholder="Type a command..."
                            className="flex-1 bg-transparent font-mono text-sm text-white outline-none p-4" autoFocus />
                    </form>
                </BentoCard>

                {/* Command Reference */}
                <h3 className="font-clash font-semibold text-xl mb-4">Command Reference</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {COMMANDS.map(c => (
                        <div key={c.cmd} className="p-3 bg-white/[0.03] border border-white/5 rounded-bento-sm cursor-pointer hover:bg-white/[0.06] transition-colors"
                            onClick={() => { setInput(c.cmd); inputRef.current?.focus(); }}>
                            <div className="flex items-center gap-2">
                                <span className={`font-mono text-[10px] font-bold ${CATEGORY_COLORS[c.category]}`}>{c.category}</span>
                                <span className="font-mono text-sm text-lime">{c.cmd}</span>
                            </div>
                            <p className="font-mono text-xs text-white/30 mt-0.5">{c.desc}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
