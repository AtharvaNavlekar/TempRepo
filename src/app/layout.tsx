import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const spaceGrotesk = Space_Grotesk({
    variable: "--font-space-grotesk",
    subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
    variable: "--font-jetbrains-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "CollabRise | The Universal Proof-of-Work Protocol",
    description: "Ship. Or Die Trying. The Gen Z OS for Human Potential.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark scroll-smooth">
            <body
                className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} font-sans bg-obsidian text-white antialiased selection:bg-lime/30 selection:text-lime grain-overlay min-h-screen flex flex-col relative overflow-x-hidden`}
            >
                <Navbar />
                <main className="flex-grow pt-20">
                    {children}
                </main>
            </body>
        </html>
    );
}
