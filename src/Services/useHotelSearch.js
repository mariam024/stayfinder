import { useEffect, useState, useCallback, useRef } from "react";
import { placesSearchUrl } from "./foursquareClient";
import { filterAccommodationStays } from "./accommodationFilter";

const STATIC_IMAGES = [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=80",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500&q=80",
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=500&q=80",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&q=80",
    "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=500&q=80",
    "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=500&q=80",
    "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=500&q=80",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&q=80",
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=500&q=80",
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=500&q=80",
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=500&q=80",
    "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=500&q=80",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500&q=80",
    "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?w=500&q=80",
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=500&q=80",
    "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=500&q=80",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=500&q=80",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=500&q=80",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=500&q=80",
    "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=500&q=80",
];

function normalizeSearchResult(place, index) {
    const category = place.categories?.[0];
    return {
        id: place.fsq_place_id,
        name: place.name ?? "",
        location: place.location?.formatted_address
            ?? [place.location?.locality, place.location?.region].filter(Boolean).join(", ")
            ?? "",
        category: category?.name ?? "",
        type: category?.name ?? "",
        distance: place.distance ?? null,
        tel: place.tel ?? "",
        website: place.website ?? "",
        rating: null,
        image: STATIC_IMAGES[index % STATIC_IMAGES.length],
    };
}

export default function useHotelSearch({
    query = "hotel",
    near = "",
    limit = 20,
} = {}) {
    const [state, setState] = useState({ loading: false, error: null, hotels: [] });

    const fetchHotels = useCallback(async () => {
        if (!near.trim()) {
            setState({ loading: false, error: null, hotels: [] });
            return;
        }
        setState((s) => ({ ...s, loading: true, error: null }));

        const params = new URLSearchParams({ query, near, limit: String(limit) });

        try {
            const res = await fetch(placesSearchUrl(params), {
                headers: { Accept: "application/json" },
            });
            if (!res.ok) {
                const body = await res.text().catch(() => "");
                throw new Error(body || `Request failed (${res.status})`);
            }
            const raw = await res.json();
            const normalized = (raw.results ?? []).map((p, i) => normalizeSearchResult(p, i));
            const hotels = filterAccommodationStays(normalized);
            setState({ loading: false, error: null, hotels });
        } catch (err) {
            setState((s) => ({ ...s, loading: false, error: err.message }));
        }
    }, [query, near, limit]);

    const lastKeyRef = useRef(null);
    useEffect(() => {
        const key = JSON.stringify({ query, near, limit });
        if (lastKeyRef.current === key) return;
        lastKeyRef.current = key;
        fetchHotels();
    }, [fetchHotels]);

    return { ...state, refetch: fetchHotels };
}