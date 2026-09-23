export const HOTELS = [
  { id: 1, name: "Marrakesh Riad Azalea", location: "Marrakesh, Morocco", type: "Villa", rating: 4.8, reviews: 214, price: 182, note: "Rooftop pool · Free cancellation", img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80" },
  { id: 2, name: "The Alden Townhouse", location: "Edinburgh, Scotland", type: "Hotel", rating: 4.6, reviews: 389, price: 149, note: "Breakfast included", img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80" },
  { id: 3, name: "Kaiyō Onsen Retreat", location: "Hakone, Japan", type: "Resort", rating: 4.9, reviews: 502, price: 268, note: "Private hot spring", img: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80" },
  { id: 4, name: "Casa Verde Apartments", location: "Lisbon, Portugal", type: "Apartment", rating: 4.4, reviews: 128, price: 96, note: "Kitchenette · Wi-Fi", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80" },
  { id: 5, name: "Nordkapp Fjord Lodge", location: "Tromsø, Norway", type: "Villa", rating: 4.7, reviews: 97, price: 231, note: "Aurora-view terrace", img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80" },
  { id: 6, name: "Harbour House Hotel", location: "Cape Town, South Africa", type: "Hotel", rating: 4.3, reviews: 276, price: 121, note: "Free parking", img: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80" },
];

export const MOCK_HOTELS_NORMALIZED = HOTELS.map((h) => ({
  id: h.id,
  name: h.name,
  location: h.location,
  type: h.type,
  rating: h.rating,
  reviewCount: h.reviews,
  price: h.price,
  currency: "USD",
  image: h.img,
}));

export const AMENITIES = [
  { key: "wifi", label: "Wi-Fi" },
  { key: "pool", label: "Pool" },
  { key: "parking", label: "Parking" },
  { key: "breakfast", label: "Breakfast" },
];

export const TYPES = [
  { id: "Hotel", name: "Hotel" },
  { id: "Apartment", name: "Apartment" },
  { id: "Resort", name: "Resort" },
  { id: "Villa", name: "Villa" },
];
export const SORTS = ["Recommended", "Highest Rated"];