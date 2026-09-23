import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router";
import HeroSearch from "./HeroSearch";
import ResultsHeader from "./ResultsHeader";
import HotelCard from "./HotelCard";
import SkeletonCard from "./SkeletonCard";
import EmptyState from "./EmptyState";
import HotelDetailsModal from "./HotelDetailsModal";
import FavoriteAuthModal from "./FavoriteAuthModal";
import useHotelSearch from "../../Services/useHotelSearch";
import useDebouncedValue from "../../Services/useDebouncedValue";
import useFavorites from "../../Services/useFavorites";
import { useAuth } from "../../context/AuthContext";
import { SORTS, MOCK_HOTELS_NORMALIZED } from "../../Services/Exploredata";
import Navbar from "../../Components/Navbar/Navbar";

const DEFAULT_CITY = "Cairo";

export default function ExplorePage() {
    const [searchParams] = useSearchParams();
    const [sort, setSort] = useState(SORTS[0]);
    const [activeHotel, setActiveHotel] = useState(null);
    const [destinationInput, setDestinationInput] = useState("");
    const [showAuthModal, setShowAuthModal] = useState(false);

    const { isAuthenticated } = useAuth();
    const { isFavorite, toggleFavorite } = useFavorites();

    useEffect(() => {
        const city = searchParams.get("city");
        if (city) setDestinationInput(city);
    }, [searchParams]);

    const debouncedInput = useDebouncedValue(destinationInput, 500);
    const near = debouncedInput.trim().length >= 2 ? debouncedInput.trim() : DEFAULT_CITY;

    const { loading: hotelsLoading, error: hotelsError, hotels, refetch } =
        useHotelSearch({ query: "hotel", near, limit: 50 });

    const usingFallback = !hotelsLoading && !!hotelsError;
    const baseHotels = usingFallback ? MOCK_HOTELS_NORMALIZED : hotels;

    const hasRatings = useMemo(
        () => baseHotels.some((h) => h.rating != null && h.rating > 0),
        [baseHotels]
    );

    const results = useMemo(() => {
        let list = [...baseHotels];
        if (sort === "Highest Rated" && hasRatings) {
            list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        }
        return list;
    }, [baseHotels, sort, hasRatings]);

    useEffect(() => {
        if (!hasRatings && sort === "Highest Rated") {
            setSort(SORTS[0]);
        }
    }, [hasRatings, sort]);

    const handleToggleFav = (hotel) => {
        if (!isAuthenticated) {
            sessionStorage.setItem("pendingFavorite", JSON.stringify(hotel));
            setShowAuthModal(true);
            return;
        }
        toggleFavorite(hotel);
    };

    const showSkeleton = hotelsLoading;
    const showEmpty = !hotelsLoading && results.length === 0;

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] px-4 sm:px-8 py-8 sm:py-10">
                <HeroSearch destination={destinationInput} onDestinationChange={setDestinationInput} />

                <section className="max-w-6xl mx-auto">
                    <ResultsHeader
                        count={results.length}
                        sort={sort}
                        onSortChange={setSort}
                        hasRatings={hasRatings}
                    />

                    {usingFallback && (
                        <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
                            <div>
                                <p className="font-medium">Something went wrong while loading stays.</p>
                                <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                                    Showing sample stays instead. Please try again.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={refetch}
                                className="shrink-0 px-4 py-2 rounded-full text-xs font-medium bg-[var(--color-primary)] text-white hover:opacity-90"
                            >
                                Try again
                            </button>
                        </div>
                    )}

                    {showSkeleton ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <SkeletonCard key={i} />
                            ))}
                        </div>
                    ) : showEmpty ? (
                        <EmptyState onClear={() => setDestinationInput("")} />
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {results.map((h) => (
                                <HotelCard
                                    key={h.id}
                                    h={h}
                                    fav={isFavorite(h.id)}
                                    onToggleFav={handleToggleFav}
                                    onView={() => setActiveHotel(h)}
                                />
                            ))}
                        </div>
                    )}
                </section>

                {activeHotel && (
                    <HotelDetailsModal
                        hotel={activeHotel}
                        useFallback={usingFallback}
                        onClose={() => setActiveHotel(null)}
                    />
                )}
                {showAuthModal && <FavoriteAuthModal onClose={() => setShowAuthModal(false)} />}
            </div>
        </>
    );
}
