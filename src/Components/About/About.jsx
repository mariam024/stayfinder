import { forwardRef } from 'react'
import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import AboutImage from '../../Assets/aboutImg.svg'

const About = forwardRef(function About(_props, ref) {
    return (
        <section ref={ref} className="py-16 sm:py-20 px-6">
            <div className="container mx-auto max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                    <div className="order-2 lg:order-1 text-center lg:text-left">
                        <span className="text-xs font-bold tracking-widest text-primary uppercase">
                            About StayFinder
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-text leading-tight mt-2">
                            Discover stays, your way
                        </h2>
                        <p className="text-text-muted text-sm md:text-base mt-4 leading-relaxed">
                            StayFinder helps you search destinations and explore accommodation listings
                            powered by place data. Browse stays, view details, and save favorites when
                            you&apos;re signed in — we focus on discovery, not booking.
                        </p>
                        <p className="text-text-muted text-sm md:text-base mt-3 leading-relaxed">
                            From city apartments to coastal resorts, find inspiration for your next trip
                            and keep track of the stays that stand out to you.
                        </p>
                        <Link
                            to="/explore"
                            className="inline-flex items-center gap-2 mt-8 text-sm font-semibold text-primary hover:opacity-90"
                        >
                            Start exploring stays
                            <ArrowRight className="size-4" />
                        </Link>
                    </div>
                    <div className="order-1 lg:order-2 flex justify-center">
                        <img
                            src={AboutImage}
                            alt="Illustration of travel and stay discovery"
                            className="w-full max-w-sm h-auto"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
})

export default About
