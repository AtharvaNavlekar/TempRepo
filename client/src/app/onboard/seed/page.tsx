"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ForgeButton, BentoCard, PulseTag } from "@/components/forge";

export default function ArtifactSeedPage() {
    const router = useRouter();
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleContinue = () => {
        if (!file) return;
        setIsUploading(true);
        setTimeout(() => {
            router.push("/onboard/contract");
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center p-6 relative">
            <div className="w-full max-w-3xl relative z-10">

                <div className="text-center mb-10">
                    <p className="font-mono text-white/50 text-sm tracking-widest uppercase mb-4">Step 3 // Your First Project</p>
                    <h1 className="font-clash font-black text-4xl md:text-5xl text-white mb-4">Upload Your Best Work.</h1>
                    <p className="font-mono text-white/60 max-w-xl mx-auto text-sm leading-relaxed">
                        Drop your best piece of work. A repo zip, a figma file, a pitch deck pdf. This establishes your baseline Verified Score.
                        <span className="text-lime block mt-2">Make it count. Our AI will analyze your skills based on this.</span>
                    </p>
                </div>

                <BentoCard
                    className={`relative border-2 border-dashed transition-all duration-300 p-12 flex flex-col items-center justify-center text-center min-h-[300px]
            ${isDragging ? 'border-lime bg-lime/5 scale-[1.02]' : 'border-white/20 hover:border-white/40'}
            ${file ? 'border-solid border-cyber bg-cyber/5' : ''}
          `}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <AnimatePresence mode="wait">
                        {!file ? (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="flex flex-col items-center pointer-events-none"
                            >
                                <div className={`w-20 h-20 rounded-full mb-6 flex items-center justify-center transition-colors
                  ${isDragging ? 'bg-lime text-black' : 'bg-white/5 text-white/50'}
                `}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                </div>
                                <h3 className="font-clash font-bold text-2xl text-white mb-2">Drag & Drop File</h3>
                                <p className="font-mono text-white/40 text-xs uppercase tracking-widest">
                                    .ZIP, .PDF, .FIG, .JS (MAX 50MB)
                                </p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="filled"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center w-full"
                            >
                                <div className="w-20 h-20 rounded-bento-sm bg-cyber/20 border border-cyber flex items-center justify-center mb-6">
                                    <span className="font-mono font-bold text-cyber uppercase">{file.name.split('.').pop()}</span>
                                </div>
                                <PulseTag status="shipped" label="FILE UPLOADED" className="border-cyber text-cyber bg-cyber/10" />
                                <h3 className="font-mono font-bold text-white mt-4 max-w-[80%] truncate">
                                    {file.name}
                                </h3>
                                <p className="font-mono text-white/40 text-xs mt-2">
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>

                                <button
                                    onClick={() => setFile(null)}
                                    className="mt-6 font-mono text-xs text-white/30 hover:text-red-400 transition-colors uppercase tracking-widest underline decoration-white/10 underline-offset-4"
                                >
                                    REMOVE FILE
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </BentoCard>

                <div className="mt-8 flex justify-center">
                    <ForgeButton
                        size="lg"
                        onClick={handleContinue}
                        disabled={!file}
                        loading={isUploading}
                        className={`w-full md:w-auto px-16 ${file ? 'bg-cyber text-white hover:bg-white hover:text-obsidian border-none' : ''}`}
                    >
                        COMPLETE PROFILE
                    </ForgeButton>
                </div>

            </div>
        </div>
    );
}
