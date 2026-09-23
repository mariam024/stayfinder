import { ArrowRight } from "lucide-react"
import { Link } from "react-router"

const destinations = [
    {
        id: 1,
        city: "Paris",
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
    },
    {
        id: 2,
        city: 'Dubai',
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
    },
    {
        id: 3,
        city: 'London',
        image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80',
    },
    {
        id: 4,
        city: 'Bali',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
    },
    {
        id: 5,
        city: 'New York',
        image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80',
    },
    {
        id: 6,
        city: 'Barcelona',
        image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80',
    },
]

function DestinationCard({ destination }) {
    return (
        <Link
            to={`/explore?city=${encodeURIComponent(destination.city)}`}
            className="group relative block aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden border border-border/60 hover:border-primary/40 transition-colors"
        >
            <img
                src={destination.image}
                alt={destination.city}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#212529]/75 via-[#212529]/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <h3 className="text-white text-lg sm:text-xl font-semibold">{destination.city}</h3>
                <span className="mt-2 inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-white/90 opacity-90 group-hover:opacity-100 transition-opacity">
                    Explore stays
                    <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
            </div>
        </Link>
    )
}

export default function PopularDestinations() {
    return (
        <section className="py-16 sm:py-20 px-6">
            <div className="container mx-auto max-w-6xl flex flex-col items-center text-center gap-3 mb-10 sm:mb-12">
                <span className="text-xs font-bold tracking-widest text-primary uppercase">
                    Popular Destinations
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-text">
                    Where will you go next?
                </h2>
                <p className="text-text-muted max-w-xl text-sm md:text-base">
                    Jump straight into stay search for some of the world&apos;s most loved destinations.
                </p>
            </div>

            <div className="container mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
                {destinations.map((destination) => (
                    <DestinationCard key={destination.id} destination={destination} />
                ))}
            </div>
        </section>
    )
}
