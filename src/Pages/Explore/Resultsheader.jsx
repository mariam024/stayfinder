import { ChevronDown } from "lucide-react";
import { SORTS } from "../../Services/Exploredata";

export default function ResultsHeader({ count, sort, onSortChange, hasRatings }) {
    const sortOptions = hasRatings ? SORTS : [SORTS[0]];
    const label = count === 1 ? "1 stay found" : `${count} stays found`;

    return (
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <div>
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">Explore Stays</h2>
                <p className="text-sm text-[var(--color-text-muted)] mt-0.5">{label}</p>
            </div>
            <div className="relative">
                <select
                    value={sort}
                    onChange={(e) => onSortChange(e.target.value)}
                    className="appearance-none pl-4 pr-9 py-2.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-sm cursor-pointer hover:border-[var(--color-primary)]/40 transition-colors"
                >
                    {sortOptions.map((s) => (
                        <option key={s} value={s}>
                            {s}
                        </option>
                    ))}
                </select>
                <ChevronDown
                    size={14}
                    className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--color-text-muted)]"
                />
            </div>
        </div>
    );
}
