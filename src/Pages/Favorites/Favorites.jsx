import { Link } from "react-router";
import { Heart } from "lucide-react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import HotelCard from "../Explore/Hotelcard";
import SkeletonCard from "../Explore/Skeletoncard";
import useFavorites from "../../Services/useFavorites";
import { useAuth } from "../../context/AuthContext";

export default function Favorites() {
    const { isAuthenticated, ready } = useAuth();
    const { favorites, loading, isFavorite, toggleFavorite } = useFavorites();

    const cards = favorites.map((f) => ({
        id: f.hotelId,
        name: f.name,
        location: f.location,
        image: f.image,
        category: f.category,
        type: f.category,
        rating: f.rating,
    }));

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] px-4 sm:px-8 py-8 sm:py-10 flex flex-col">
                <section className="max-w-6xl mx-auto w-full flex-1">
                    <div className="mb-8 sm:mb-10">
                        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight flex items-center gap-2">
                            <Heart className="fill-[var(--color-primary)] text-[var(--color-primary)]" size={26} />
                            Saved Stays
                        </h1>
                        <p className="text-sm text-[var(--color-text-muted)] mt-2">
                            Accommodations you saved from Explore.
                        </p>
                    </div>

                    {!ready || loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <SkeletonCard key={i} />
                            ))}
                        </div>
                    ) : !isAuthenticated ? (
                        <div className="text-center py-16 sm:py-20 px-4 border border-dashed border-[var(--color-border)] rounded-2xl bg-[var(--color-surface)]">
                            <p className="font-medium text-lg">Sign in to view saved stays</p>
                            <p className="text-sm text-[var(--color-text-muted)] mt-2 max-w-md mx-auto">
                                Browse and search without an account. Sign in when you&apos;re ready to save favorites.
                            </p>
                            <div className="flex flex-wrap justify-center gap-3 mt-6">
                                <Link
                                    to="/login"
                                    state={{ returnTo: "/favorites" }}
                                    className="px-5 py-2.5 rounded-full text-sm font-medium bg-[var(--color-primary)] text-white"
                                >
                                    Log in
                                </Link>
                                <Link
                                    to="/signup"
                                    state={{ returnTo: "/favorites" }}
                                    className="px-5 py-2.5 rounded-full text-sm font-medium border border-[var(--color-border)]"
                                >
                                    Sign up
                                </Link>
                            </div>
                        </div>
                    ) : cards.length === 0 ? (
                        <div className="text-center py-16 sm:py-20 px-4 border border-dashed border-[var(--color-border)] rounded-2xl bg-[var(--color-surface)]">
                            <p className="font-medium text-lg">No saved stays yet</p>
                            <p className="text-sm text-[var(--color-text-muted)] mt-2">
                                Tap the heart on any stay in Explore to add it here.
                            </p>
                            <Link
                                to="/explore"
                                className="inline-block mt-6 px-5 py-2.5 rounded-full text-sm font-medium bg-[var(--color-primary)] text-white"
                            >
                                Explore stays
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {cards.map((h) => (
                                <HotelCard
                                    key={String(h.id)}
                                    h={h}
                                    fav={isFavorite(h.id)}
                                    onToggleFav={toggleFavorite}
                                    onView={() => {}}
                                />
                            ))}
                        </div>
                    )}
                </section>
                <Footer />
            </div>
        </>
    );
}
