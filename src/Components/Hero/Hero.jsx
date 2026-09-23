import { useState } from "react";

import { CircleChevronDown, SearchCheck } from "lucide-react";
import { Link } from "react-router";
import { HERO_IMAGE_URL } from "../../assets/heroImage";
import heroFallback from "../../assets/heroImg.svg";

export default function Hero({ onLearnMore }) {
    const [imgSrc, setImgSrc] = useState(HERO_IMAGE_URL);

    return (
        <section className=" px-2 pt-5 pb-8 sm:px-6 sm:pt-7 sm:pb-10 lg:px-8 lg:pt-8 lg:pb-12">
            <div
                className="
          relative mx-auto
          w-full max-w-8xl
          min-h-[500px] sm:min-h-[540px] lg:min-h-[600px]
          overflow-hidden
          rounded-2xl sm:rounded-3xl
          border border-black/10 dark:border-white/10
          shadow-[0_12px_40px_rgba(33,37,41,0.10)]
          dark:shadow-[0_16px_50px_rgba(0,0,0,0.35)]
        "
            >
                {/* Hero Image */}
                <img
                    src={imgSrc}
                    alt=""
                    className="absolute inset-0 z-0 h-full w-full object-cover object-[center_42%]"
                    fetchPriority="high"
                    decoding="async"
                    onError={() => {
                        if (imgSrc !== heroFallback) {
                            setImgSrc(heroFallback);
                        }
                    }}
                />

                {/* Main gradient */}
                <div
                    className="
            absolute inset-0 z-[1]
            bg-gradient-to-r
            from-[#212529]/80
            via-[#212529]/42
            via-45%
            to-transparent
            to-[88%]
          "
                    aria-hidden
                />

                {/* Bottom gradient */}
                <div
                    className="
            absolute inset-0 z-[1]
            bg-gradient-to-t
            from-[#212529]/50
            via-transparent
            via-35%
            to-transparent
          "
                    aria-hidden
                />

                {/* Content */}
                <div className="relative z-10 flex min-h-[460px] sm:min-h-[540px] lg:min-h-[580px] items-end">
                    <div className="w-full px-6 pb-9 pt-28 sm:px-10 sm:pb-12 lg:px-14 lg:pb-14">
                        <div className="max-w-xl">
                            <span className="inline-block rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-white/90 backdrop-blur-sm">
                                Stay discovery made simple
                            </span>

                            <h1 className="mt-4 text-3xl font-bold leading-[1.1] tracking-tight text-white drop-shadow-sm sm:text-4xl lg:text-[2.9rem]">
                                Find Your Perfect Stay, Anywhere.
                            </h1>

                            <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/90 drop-shadow-sm sm:text-base">
                                Search destinations, explore real stays from our places data,
                                and save the accommodations you love — all in one calm,
                                focused experience.
                            </p>

                            {/* CTAs */}
                            <div className="mt-8 flex flex-wrap gap-3">
                                <Link
                                    to="/explore"
                                    className="
                    inline-flex items-center justify-center gap-2
                    rounded-full
                    bg-primary
                    px-6 py-3
                    text-sm font-medium text-white
                    shadow-sm
                    transition-all duration-200
                    hover:opacity-95
                    hover:shadow-md
                  "
                                >
                                    <SearchCheck className="size-4" />
                                    Explore Stays
                                </Link>

                                <button
                                    type="button"
                                    onClick={onLearnMore}
                                    className="
                    inline-flex items-center justify-center gap-2
                    rounded-full
                    border border-white/40
                    bg-white/5
                    px-6 py-3
                    text-sm font-medium text-white
                    backdrop-blur-sm
                    transition-colors
                    hover:bg-white/15
                  "
                                >
                                    <CircleChevronDown className="size-4" />
                                    Learn More
                                </button>
                            </div>

                            {/* Feature hints */}
                            <div className="mt-9 hidden gap-10 text-xs text-white/70 lg:flex">
                                <div>
                                    <span className="mb-0.5 block text-sm font-medium text-white/95">
                                        Search
                                    </span>
                                    By destination
                                </div>

                                <div>
                                    <span className="mb-0.5 block text-sm font-medium text-white/95">
                                        Explore
                                    </span>
                                    Real place data
                                </div>

                                <div>
                                    <span className="mb-0.5 block text-sm font-medium text-white/95">
                                        Save
                                    </span>
                                    Your favorites
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}