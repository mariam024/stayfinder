export default function EmptyState({ onClear }) {
    return (
        <div className="text-center py-16 sm:py-20 px-4 border border-dashed border-[var(--color-border)] rounded-2xl bg-[var(--color-surface)]">
            <p className="font-medium text-lg">No stays found</p>
            <p className="text-sm text-[var(--color-text-muted)] mt-2 max-w-sm mx-auto">
                Try searching for another destination.
            </p>
            {onClear && (
                <button
                    type="button"
                    onClick={onClear}
                    className="mt-5 px-5 py-2.5 rounded-full text-sm font-medium bg-[var(--color-primary)] text-white hover:opacity-90"
                >
                    Clear search
                </button>
            )}
        </div>
    );
}
