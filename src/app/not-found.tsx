import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-obsidian flex items-center justify-center text-white font-sans">
            <div className="text-center">
                <h1 className="font-clash font-bold text-[12rem] leading-none text-lime/10">404</h1>
                <h2 className="font-clash font-bold text-3xl -mt-8 mb-4">VOID DETECTED</h2>
                <p className="font-mono text-sm text-white/40 mb-8 max-w-md mx-auto">This route doesn&apos;t exist in the Forge. It may have been shipped, deleted, or never built.</p>
                <Link href="/" className="inline-block px-8 py-3 bg-lime text-obsidian font-clash font-bold rounded-bento-sm hover:shadow-brutal transition-shadow">RETURN TO BASE</Link>
            </div>
        </div>
    );
}
