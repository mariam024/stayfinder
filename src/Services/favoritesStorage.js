function storageKey(userId) {
    return `stayfinder_favorites_${userId}`;
}

export function readFavorites(userId) {
    if (!userId) return [];
    try {
        const raw = localStorage.getItem(storageKey(userId));
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function writeFavorites(userId, list) {
    localStorage.setItem(storageKey(userId), JSON.stringify(list));
}

export function hotelIdsMatch(a, b) {
    return String(a) === String(b);
}

export function addFavoriteRecord(userId, hotel) {
    const list = readFavorites(userId);
    if (list.some((f) => hotelIdsMatch(f.hotelId, hotel.id))) {
        return list.find((f) => hotelIdsMatch(f.hotelId, hotel.id));
    }
    const record = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        userId: String(userId),
        hotelId: hotel.id,
        name: hotel.name,
        location: hotel.location,
        image: hotel.image,
        category: hotel.category || hotel.type || "",
        rating: hotel.rating ?? null,
    };
    writeFavorites(userId, [...list, record]);
    return record;
}

export function removeFavoriteByHotelId(userId, hotelId) {
    const list = readFavorites(userId);
    const next = list.filter((f) => !hotelIdsMatch(f.hotelId, hotelId));
    writeFavorites(userId, next);
}
