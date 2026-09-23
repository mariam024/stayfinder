import { Search, MapPin } from "lucide-react";

export default function HeroSearch({ destination, onDestinationChange }) {
    return (
        <section className="max-w-3xl mx-auto text-center mb-8 sm:mb-10">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--color-text)]">
                Find Your Perfect Stay
            </h1>
            <p className="text-[var(--color-text-muted)] mt-2 text-sm sm:text-base max-w-lg mx-auto">
                Discover comfortable stays in your favorite destinations.
            </p>

            <div className="mt-6 sm:mt-8 flex rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-[var(--color-primary)]/25 transition-shadow">
                <label className="flex flex-1 items-center gap-3 px-4 sm:px-5 py-3.5 sm:py-4">
                    <MapPin size={18} className="text-[var(--color-primary)] shrink-0 hidden sm:block" />
                    <Search size={18} className="text-[var(--color-primary)] shrink-0 sm:hidden" />
                    <input
                        value={destination}
                        onChange={(e) => onDestinationChange(e.target.value)}
                        placeholder="Where are you going?"
                        className="bg-transparent outline-none text-sm sm:text-base w-full text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]"
                    />
                </label>
            </div>
        </section>
    );
}
