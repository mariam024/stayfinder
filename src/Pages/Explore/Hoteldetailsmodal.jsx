import { useEffect, useCallback } from "react";
import { X, Star, MapPin, Phone, Globe, ArrowLeft, ExternalLink } from "lucide-react";
import useHotelDetails from "../../Services/Usehoteldetails";

function formatDistance(meters) {
    if (meters == null || Number.isNaN(meters)) return null;
    if (meters < 1000) return `${Math.round(meters)} m from search center`;
    return `${(meters / 1000).toFixed(1)} km from search center`;
}

function ModalShell({ onClose, children, titleId }) {
    const handleKeyDown = useCallback(
        (e) => {
            if (e.key === "Escape") onClose();
        },
        [onClose]
    );

    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
            role="presentation"
        >
            <div
                className="absolute inset-0 bg-[#212529]/55 backdrop-blur-[2px]"
                onClick={onClose}
                aria-hidden
            />
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                className="relative z-10 w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[88vh] overflow-hidden rounded-t-2xl sm:rounded-2xl bg-surface border border-border shadow-[0_24px_48px_rgba(0,0,0,0.12)] dark:shadow-[0_24px_48px_rgba(0,0,0,0.45)] flex flex-col"
            >
                {children}
            </div>
        </div>
    );
}

function DetailsBody({ d, onClose, distance, titleId, loading }) {
    const distanceLabel = formatDistance(distance ?? d.distance);
    const displayImage = d.image || null;

    return (
        <>
            <div className="relative shrink-0">
                {displayImage ? (
                    <img
                        src={displayImage}
                        alt=""
                        className="w-full aspect-[16/10] sm:aspect-[2/1] object-cover bg-border"
                    />
                ) : (
                    <div className="w-full aspect-[16/10] sm:aspect-[2/1] bg-bg-soft flex items-center justify-center text-text-muted text-sm">
                        No image available
                    </div>
                )}
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-3 right-3 grid place-items-center size-9 rounded-full bg-surface/95 border border-border text-text hover:opacity-90 shadow-sm"
                    aria-label="Close"
                >
                    <X size={18} />
                </button>
            </div>

            <div className="overflow-y-auto flex-1 px-5 sm:px-7 pb-6 sm:pb-8 pt-5">
                <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:opacity-90 mb-4"
                >
                    <ArrowLeft size={16} />
                    Back to Explore
                </button>

                {loading ? (
                    <p className="text-sm text-text-muted py-6 text-center">Loading stay details…</p>
                ) : (
                    <>
                        <div className="space-y-3">
                            {(d.category || d.type) && (
                                <span className="inline-block text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                                    {d.category || d.type}
                                </span>
                            )}
                            <h2 id={titleId} className="text-xl sm:text-2xl font-semibold leading-snug text-text">
                                {d.name}
                            </h2>
                            {d.location && (
                                <p className="flex items-start gap-2 text-sm text-text-muted leading-relaxed">
                                    <MapPin size={16} className="shrink-0 mt-0.5 text-primary" />
                                    {d.location}
                                </p>
                            )}
                            {distanceLabel && (
                                <p className="text-sm text-text-muted pl-6 sm:pl-0">{distanceLabel}</p>
                            )}
                            {d.rating != null && (
                                <p className="inline-flex items-center gap-2 text-sm text-text">
                                    <Star size={15} className="fill-primary text-primary" />
                                    <span>
                                        Rating <span className="font-medium">{d.rating}</span>/10
                                    </span>
                                </p>
                            )}
                        </div>

                        {d.description && (
                            <div className="mt-6 pt-5 border-t border-border">
                                <h3 className="text-xs font-semibold uppercase tracking-wide text-text-muted mb-2">
                                    About this stay
                                </h3>
                                <p className="text-sm text-text leading-relaxed">{d.description}</p>
                            </div>
                        )}

                        {(d.tel || d.website) && (
                            <div className="mt-6 pt-5 border-t border-border space-y-3">
                                <h3 className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                                    Contact
                                </h3>
                                {d.tel && (
                                    <a
                                        href={`tel:${d.tel}`}
                                        className="flex items-center gap-2.5 text-sm text-text hover:text-primary transition-colors"
                                    >
                                        <span className="grid place-items-center size-8 rounded-full bg-bg-soft border border-border">
                                            <Phone size={14} className="text-primary" />
                                        </span>
                                        {d.tel}
                                    </a>
                                )}
                                {d.website && (
                                    <a
                                        href={d.website}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-2.5 text-sm text-primary hover:opacity-90"
                                    >
                                        <span className="grid place-items-center size-8 rounded-full bg-bg-soft border border-border">
                                            <Globe size={14} className="text-primary" />
                                        </span>
                                        Visit website
                                        <ExternalLink size={14} className="opacity-70" />
                                    </a>
                                )}
                            </div>
                        )}

                        <div className="mt-8 flex flex-col sm:flex-row gap-3">
                            {d.website ? (
                                <a
                                    href={d.website}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full text-sm font-medium bg-primary text-white hover:opacity-95 transition-opacity"
                                >
                                    Open website
                                    <ExternalLink size={15} />
                                </a>
                            ) : (
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 py-3 px-5 rounded-full text-sm font-medium bg-primary text-white hover:opacity-95 transition-opacity"
                                >
                                    Done
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 py-3 px-5 rounded-full text-sm font-medium border border-border text-text hover:border-primary/40 transition-colors"
                            >
                                Back to Explore
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

const TITLE_ID = "stay-details-title";

function LiveDetails({ hotel, onClose }) {
    const { loading, error, details } = useHotelDetails(hotel.id);

    const merged =
        !loading && details
            ? {
                  ...hotel,
                  ...details,
                  category: details.category || hotel.category,
                  rating: details.rating ?? null,
                  image: details.photos?.[0] ?? hotel.image ?? null,
              }
            : null;

    const bodyData = !loading && merged && !error ? merged : hotel;

    return (
        <ModalShell onClose={onClose} titleId={TITLE_ID}>
            <DetailsBody
                d={bodyData}
                onClose={onClose}
                distance={hotel.distance}
                titleId={TITLE_ID}
                loading={loading}
            />
        </ModalShell>
    );
}

export default function HotelDetailsModal({ hotel, useFallback, onClose }) {
    if (useFallback) {
        return (
            <ModalShell onClose={onClose} titleId={TITLE_ID}>
                <DetailsBody
                    d={hotel}
                    onClose={onClose}
                    distance={hotel.distance}
                    titleId={TITLE_ID}
                    loading={false}
                />
            </ModalShell>
        );
    }
    return <LiveDetails hotel={hotel} onClose={onClose} />;
}
