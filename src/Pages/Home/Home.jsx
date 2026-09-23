import { useRef } from "react";
import Navbar from '../../Components/Navbar/Navbar'
import Hero from '../../Components/Hero/Hero'
import FeaturedStays from '../../Components/FeaturedStays/FeaturedStays'
import PopularDestinations from '../../Components/PopularDestinations/PopularDestinations'
import WhyChooseStayFinder from '../../Components/WhyChooseStayFinder/WhyChooseStayFinder'
import About from '../../Components/About/About'
import Footer from '../../Components/Footer/Footer'

export default function Home() {
    const aboutRef = useRef(null);
    const scrollToAbout = () => {
        aboutRef.current?.scrollIntoView({
            behavior: 'smooth',
        });
    };

    return (
        <div className="min-h-screen bg-bg text-text">
            <Navbar />
            <Hero onLearnMore={scrollToAbout} />
            <FeaturedStays />
            <div className="bg-bg-soft/80">
                <PopularDestinations />
            </div>
            <WhyChooseStayFinder />
            <About ref={aboutRef} />
            <Footer />
        </div>
    )
}
