const EXCLUDE_KEYWORDS = [
    "bar",
    "restaurant",
    "cafe",
    "coffee shop",
    "lounge",
    "grill",
    "nightclub",
    "night club",
    "spa",
    "salon",
    "store",
    "shop",
    "pub",
    "brewery",
    "winery",
    "market",
    "gym",
    "bank",
    "museum",
    "theater",
    "theatre",
];

const INCLUDE_KEYWORDS = [
    "hotel",
    "resort",
    "motel",
    "hostel",
    "guest house",
    "guesthouse",
    "inn",
    "lodge",
    "apartment",
    "villa",
    "residence",
    "suites",
    "accommodation",
    "bed and breakfast",
    "bnb",
    "ryokan",
    "homestay",
    "serviced apartment",
    "extended stay",
];

function includesKeyword(text, keywords) {
    const normalized = text.toLowerCase();
    return keywords.some((kw) => normalized.includes(kw));
}

/**
 * Conservative filter: drop obvious non-stays; keep ambiguous places that may still be accommodations.
 */
export function isAccommodationStay(stay) {
    const category = (stay.category || stay.type || "").trim();
    const name = (stay.name || "").trim();
    const combined = `${category} ${name}`.trim();

    if (!combined) return false;

    const categoryIsStay = includesKeyword(category, INCLUDE_KEYWORDS);
    const combinedIsStay = includesKeyword(combined, INCLUDE_KEYWORDS);
    const categoryExcluded =
        category && includesKeyword(category, EXCLUDE_KEYWORDS) && !categoryIsStay;
    const nameExcluded =
        includesKeyword(name, EXCLUDE_KEYWORDS) && !combinedIsStay && !categoryIsStay;

    if (categoryExcluded || nameExcluded) return false;
    if (categoryIsStay || combinedIsStay) return true;

    // Unknown category: keep unless the name clearly signals a venue, not a stay.
    return !includesKeyword(name, EXCLUDE_KEYWORDS);
}

export function filterAccommodationStays(stays) {
    return stays.filter(isAccommodationStay);
}
