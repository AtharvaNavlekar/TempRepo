import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnnouncementBanner from "@/components/layout/AnnouncementBanner";
import AuthProvider from "@/components/auth/AuthProvider";

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
        default: "CollabRise | The Universal Proof-of-Execution Protocol",
        template: "%s | CollabRise",
    },
    description: "Launch real ventures, earn a verifiable Traction Score, and replace your pitch deck forever. The OS for Founders and Visionaries.",
    keywords: ["proof of execution", "venture log", "traction score", "collaboration", "founders", "guilds", "strategic bounties", "scale"],
    authors: [{ name: "CollabRise Protocol" }],
    openGraph: {
        type: "website",
        locale: "en_US",
        siteName: "CollabRise",
        title: "CollabRise | Launch and Scale.",
        description: "The universal execution protocol. Launch real ventures, earn a verifiable Traction Score, and replace your pitch deck forever.",
    },
    twitter: { card: "summary_large_image", title: "CollabRise | Launch and Scale.", description: "The universal execution protocol for founders and visionaries." },
    robots: { index: true, follow: true },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
            <body
                className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} font-sans bg-obsidian text-white antialiased selection:bg-lime/30 selection:text-lime min-h-screen flex flex-col relative overflow-x-hidden`}
                suppressHydrationWarning
            >
                <AuthProvider>
                    <AnnouncementBanner />
                    <Navbar />
                    <main className="flex-grow flex flex-col relative w-full">
                        {children}
                    </main>
                    <Footer />
                </AuthProvider>
            </body>
        </html>
    );
}
