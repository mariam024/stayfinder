import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'

const inspirations = [
    {
        id: 'city',
        title: 'City Escape',
        description: 'Stay close to the heart of the city.',
        image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80',
    },
    {
        id: 'beach',
        title: 'Beach Getaway',
        description: 'Relax, unwind, and enjoy a perfect escape.',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
    },
    {
        id: 'home',
        title: 'A Home Away From Home',
        description: 'Find comfortable apartments and private stays.',
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
    },
    {
        id: 'luxury',
        title: 'Luxury Experience',
        description: 'Discover elegant stays for an unforgettable trip.',
        image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80',
    },
]

export default function FeaturedStays() {
    return (
        <section className="py-16 sm:py-24 px-6">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
                    <span className="text-xs font-bold tracking-widest text-primary uppercase">
                        Discover
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-text mt-2 leading-tight">
                        Find Your Stay, Your Way
                    </h2>
                    <p className="text-text-muted text-sm md:text-base mt-3 leading-relaxed">
                        Whether you&apos;re planning a city break, a beach getaway, or a relaxing escape,
                        find a stay that fits your journey.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    {inspirations.map((item) => (
                        <Link
                            key={item.id}
                            to="/explore"
                            className="group relative block aspect-[16/10] sm:aspect-[5/3] rounded-2xl overflow-hidden"
                        >
                            <img
                                src={item.image}
                                alt=""
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                draggable={false}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#212529]/85 via-[#212529]/35 to-transparent" />
                            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                                <h3 className="text-white text-xl sm:text-2xl font-semibold tracking-tight">
                                    {item.title}
                                </h3>
                                <p className="text-white/85 text-sm sm:text-base mt-2 max-w-md leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="flex justify-center mt-12">
                    <Link
                        to="/explore"
                        className="group inline-flex items-center gap-2 bg-primary text-white px-8 py-3.5 rounded-full font-semibold text-sm hover:opacity-95 transition-opacity"
                    >
                        Start Exploring
                        <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    )
}
