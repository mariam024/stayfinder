/** Browser calls same-origin proxy; Vite adds auth server-side (see vite.config.js). */
export const PLACES_API_BASE = "/api/foursquare";

export const FOURSQUARE_API_VERSION = "2025-06-17";

export function placesSearchUrl(params) {
    const qs = params instanceof URLSearchParams ? params : new URLSearchParams(params);
    return `${PLACES_API_BASE}/places/search?${qs.toString()}`;
}

export function placeDetailsUrl(fsqPlaceId, fields) {
    const qs = new URLSearchParams({ fields });
    return `${PLACES_API_BASE}/places/${fsqPlaceId}?${qs.toString()}`;
}
