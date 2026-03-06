import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AuthProvider from "@/components/auth/AuthProvider";

const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "600", "700", "800"],
    style: ["normal", "italic"],
    variable: "--font-playfair",
    display: "swap",
});

const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    variable: "--font-dm-sans",
    display: "swap",
});

const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["300", "400", "600"],
    style: ["normal", "italic"],
    variable: "--font-cormorant",
    display: "swap",
});

const jetbrains = JetBrains_Mono({
    subsets: ["latin"],
    weight: ["400", "500"],
    variable: "--font-jetbrains",
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        default: "CollabRise | The Proof-of-Work Protocol for Entrepreneurs",
        template: "%s | CollabRise",
    },
    description: "Launch real ventures, earn a verifiable Venture Score, and replace your pitch deck forever. The OS for Founders and Visionaries.",
    keywords: ["proof of execution", "venture log", "venture score", "collaboration", "founders", "guilds", "entrepreneurs", "scale"],
    authors: [{ name: "CollabRise Protocol" }],
    openGraph: {
        type: "website",
        locale: "en_US",
        siteName: "CollabRise",
        title: "CollabRise | Launch. Prove. Rise.",
        description: "The proof-of-work protocol for entrepreneurs. Launch real ventures, earn a verifiable Venture Score, and replace your pitch deck forever.",
    },
    twitter: { card: "summary_large_image", title: "CollabRise | Launch. Prove. Rise.", description: "The proof-of-work protocol for entrepreneurs and visionaries." },
    robots: { index: true, follow: true },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth" suppressHydrationWarning>
            <body
                className={`${playfair.variable} ${dmSans.variable} ${cormorant.variable} ${jetbrains.variable} font-sans bg-cream text-ink antialiased selection:bg-saffron/20 selection:text-ink min-h-screen flex flex-col relative overflow-x-hidden`}
                suppressHydrationWarning
            >
                <AuthProvider>
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
