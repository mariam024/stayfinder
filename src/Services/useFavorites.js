import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import {
    readFavorites,
    addFavoriteRecord,
    removeFavoriteByHotelId,
    hotelIdsMatch,
} from "./favoritesStorage";

export default function useFavorites() {
    const { user, isAuthenticated } = useAuth();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchFavorites = useCallback(() => {
        if (!isAuthenticated || !user?.id) {
            setFavorites([]);
            return;
        }
        setLoading(true);
        try {
            setFavorites(readFavorites(user.id));
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated, user?.id]);

    useEffect(() => {
        fetchFavorites();
    }, [fetchFavorites]);

    const isFavorite = useCallback(
        (hotelId) => favorites.some((f) => hotelIdsMatch(f.hotelId, hotelId)),
        [favorites]
    );

    const addFavorite = useCallback(
        (hotel) => {
            if (!user?.id) return;
            const saved = addFavoriteRecord(user.id, hotel);
            setFavorites(readFavorites(user.id));
            return saved;
        },
        [user?.id]
    );

    const removeFavorite = useCallback(
        (hotelId) => {
            if (!user?.id) return;
            removeFavoriteByHotelId(user.id, hotelId);
            setFavorites(readFavorites(user.id));
        },
        [user?.id]
    );

    const toggleFavorite = useCallback(
        async (hotel) => {
            if (isFavorite(hotel.id)) removeFavorite(hotel.id);
            else addFavorite(hotel);
        },
        [isFavorite, addFavorite, removeFavorite]
    );

    return { favorites, loading, isFavorite, toggleFavorite, refetch: fetchFavorites };
}
