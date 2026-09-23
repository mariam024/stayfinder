import { Search, Compass, Heart, Sparkles } from 'lucide-react'

export default function WhyChooseStayFinder() {
    const cards = [
        {
            id: 1,
            title: 'Easy Search',
            description: 'Find stays by destination with a simple search experience.',
            icon: Search,
        },
        {
            id: 2,
            title: 'Explore More',
            description: 'Discover different accommodations in destinations around the world.',
            icon: Compass,
        },
        {
            id: 3,
            title: 'Save Favorites',
            description: 'Keep the stays you love in one place.',
            icon: Heart,
        },
        {
            id: 4,
            title: 'Simple Experience',
            description: 'Browse and discover stays without unnecessary complexity.',
            icon: Sparkles,
        },
    ]

    return (
        <section className="py-16 sm:py-20 px-6">
            <div className="container mx-auto max-w-6xl flex flex-col items-center text-center gap-3 mb-10 sm:mb-12">
                <span className="text-xs font-bold tracking-widest text-primary uppercase">
                    Why StayFinder
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-text">
                    Built for discovery
                </h2>
                <p className="text-text-muted max-w-xl text-sm md:text-base">
                    Everything you need to search, explore, and save stays — without the noise.
                </p>
            </div>

            <div className="container mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                {cards.map((card) => {
                    const Icon = card.icon
                    return (
                        <div
                            key={card.id}
                            className="bg-surface rounded-2xl border border-border p-6 flex flex-col items-center gap-3 text-center"
                        >
                            <div className="flex items-center justify-center size-11 rounded-full bg-primary/10">
                                <Icon className="size-5 text-primary" />
                            </div>
                            <h3 className="text-base font-semibold text-text">{card.title}</h3>
                            <p className="text-sm text-text-muted leading-relaxed">{card.description}</p>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
