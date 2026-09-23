import { MapPin, Star, Heart, Globe, Phone } from "lucide-react";

function formatDistance(meters) {
    if (meters == null || Number.isNaN(meters)) return null;
    if (meters < 1000) return `${Math.round(meters)} m away`;
    return `${(meters / 1000).toFixed(1)} km away`;
}

export default function HotelCard({ h, fav, onToggleFav, onView }) {
    const distanceLabel = formatDistance(h.distance);

    return (
        <article className="group rounded-2xl overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)] hover:shadow-md hover:border-[var(--color-primary)]/30 transition-all duration-300">
            <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-border)]">
                {h.image && (
                    <img
                        src={h.image}
                        alt={h.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                )}
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleFav(h);
                    }}
                    aria-label={fav ? "Remove from favorites" : "Save to favorites"}
                    className="absolute top-3 right-3 grid place-items-center w-9 h-9 rounded-full bg-[var(--color-surface)]/95 shadow-sm border border-[var(--color-border)] hover:scale-105 transition-transform"
                >
                    <Heart
                        size={16}
                        className={
                            fav
                                ? "fill-[var(--color-primary)] text-[var(--color-primary)]"
                                : "text-[var(--color-text)]"
                        }
                    />
                </button>
                {(h.type || h.category) && (
                    <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-xs bg-[var(--color-surface)]/95 text-[var(--color-text)] border border-[var(--color-border)]">
                        {h.type || h.category}
                    </span>
                )}
            </div>
            <div className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                    <h3 className="font-medium leading-snug line-clamp-2">{h.name}</h3>
                    {h.rating != null && (
                        <span className="flex items-center gap-1 text-sm shrink-0">
                            <Star size={14} className="fill-[var(--color-primary)] text-[var(--color-primary)]" />
                            {h.rating}
                        </span>
                    )}
                </div>
                {h.location && (
                    <p className="flex items-start gap-1 text-sm text-[var(--color-text-muted)] line-clamp-2">
                        <MapPin size={13} className="shrink-0 mt-0.5" /> {h.location}
                    </p>
                )}
                {distanceLabel && (
                    <p className="text-xs text-[var(--color-text-muted)]">{distanceLabel}</p>
                )}
                {(h.website || h.tel) && (
                    <div className="flex flex-wrap gap-3 pt-1 text-xs text-[var(--color-text-muted)]">
                        {h.tel && (
                            <span className="inline-flex items-center gap-1">
                                <Phone size={12} /> {h.tel}
                            </span>
                        )}
                        {h.website && (
                            <a
                                href={h.website}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-1 text-[var(--color-primary)] hover:underline"
                            >
                                <Globe size={12} /> Website
                            </a>
                        )}
                    </div>
                )}
                <div className="pt-2">
                    <button
                        type="button"
                        onClick={() => onView(h)}
                        className="w-full px-4 py-2.5 rounded-full text-sm font-medium bg-[var(--color-primary)] text-white hover:opacity-90 transition-opacity"
                    >
                        View Stay
                    </button>
                </div>
            </div>
        </article>
    );
}
