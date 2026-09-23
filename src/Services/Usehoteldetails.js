import { useEffect, useState, useCallback, useRef } from "react";
import { placeDetailsUrl } from "./foursquareClient";

const FIELDS = "name,location,categories,tel,website,rating,photos,hours,price,description";

function normalizeDetails(d) {
    const category = d.categories?.[0];
    return {
        name: d.name ?? "",
        location: d.location?.formatted_address
            ?? [d.location?.locality, d.location?.region].filter(Boolean).join(", ")
            ?? "",
        category: category?.name ?? "",
        description: d.description ?? "",
        rating: d.rating ?? null,
        photos: (d.photos ?? []).map((p) => `${p.prefix}500x300${p.suffix}`),
        tel: d.tel ?? "",
        website: d.website ?? "",
        price: d.price ?? null,
        hours: d.hours?.display ?? "",
    };
}

export default function useHotelDetails(fsqPlaceId) {
    const [state, setState] = useState({ loading: false, error: null, details: null });

    const fetchDetails = useCallback(async () => {
        if (!fsqPlaceId) return;
        setState((s) => ({ ...s, loading: true, error: null }));

        try {
            const res = await fetch(placeDetailsUrl(fsqPlaceId, FIELDS), {
                headers: { Accept: "application/json" },
            });
            if (!res.ok) throw new Error(`Request failed (${res.status})`);
            const raw = await res.json();
            setState({ loading: false, error: null, details: normalizeDetails(raw) });
        } catch (err) {
            setState((s) => ({ ...s, loading: false, error: err.message, details: null }));
        }
    }, [fsqPlaceId]);

    const lastKeyRef = useRef(null);
    useEffect(() => {
        if (lastKeyRef.current === fsqPlaceId) return;
        lastKeyRef.current = fsqPlaceId;
        fetchDetails();
    }, [fetchDetails, fsqPlaceId]);

    return { ...state, refetch: fetchDetails };
}
