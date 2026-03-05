import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const spaceGrotesk = Space_Grotesk({
    variable: "--font-space-grotesk",
    subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
    variable: "--font-jetbrains-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: {
        default: "CollabRise | The Universal Proof-of-Work Protocol",
        template: "%s | CollabRise",
    },
    description: "Ship real projects, earn a verifiable Ship Score, and replace your resume forever. The Gen Z OS for Human Potential.",
    keywords: ["proof of work", "portfolio", "ship score", "collaboration", "builders", "guilds", "bounties", "hire"],
    authors: [{ name: "CollabRise Protocol" }],
    openGraph: {
        type: "website",
        locale: "en_US",
        siteName: "CollabRise",
        title: "CollabRise | Ship. Or Die Trying.",
        description: "The universal Proof-of-Work protocol. Ship real projects, earn a verifiable Ship Score, and replace your resume forever.",
    },
    twitter: { card: "summary_large_image", title: "CollabRise | Ship. Or Die Trying.", description: "The universal Proof-of-Work protocol for builders." },
    robots: { index: true, follow: true },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark scroll-smooth">
            <body
                className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} font-sans bg-obsidian text-white antialiased selection:bg-lime/30 selection:text-lime min-h-screen flex flex-col relative overflow-x-hidden`}
            >
                <Navbar />
                <main className="flex-grow pt-16">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
