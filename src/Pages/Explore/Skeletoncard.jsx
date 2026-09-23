export default function SkeletonCard() {
    return (
        <div className="rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)] animate-pulse">
            <div className="aspect-[4/3] bg-[var(--color-border)]" />
            <div className="p-4 space-y-2">
                <div className="h-4 w-3/4 rounded bg-[var(--color-border)]" />
                <div className="h-3 w-1/2 rounded bg-[var(--color-border)]" />
                <div className="h-3 w-2/3 rounded bg-[var(--color-border)]" />
                <div className="h-5 w-1/3 rounded bg-[var(--color-border)] mt-3" />
            </div>
        </div>
    );
}