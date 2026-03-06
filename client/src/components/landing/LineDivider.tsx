export function LineDivider() {
    return (
        <div className="flex items-center justify-center py-4 px-8">
            <div className="flex-1 h-px max-w-md" style={{ background: "linear-gradient(90deg, transparent, rgba(201,147,58,0.15), transparent)" }} />
            <div className="mx-5 flex gap-1.5">
                <div className="w-1 h-1 rounded-full bg-royal-gold/25" />
                <div className="w-1.5 h-1.5 rounded-full bg-royal-gold/40" />
                <div className="w-1 h-1 rounded-full bg-royal-gold/25" />
            </div>
            <div className="flex-1 h-px max-w-md" style={{ background: "linear-gradient(90deg, transparent, rgba(201,147,58,0.15), transparent)" }} />
        </div>
    );
}
