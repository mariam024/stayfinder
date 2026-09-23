import { Link, NavLink } from 'react-router'

export default function Footer() {
    const navLinks = [
        { label: 'Home', to: '/' },
        { label: 'Explore', to: '/explore' },
        { label: 'Favorites', to: '/favorites' },
        { label: 'Contact', to: '/contact' },
    ]

    return (
        <footer className="py-12 px-6 border-t border-border/80 mt-auto">
            <div className="container mx-auto max-w-6xl flex flex-col items-center gap-8">
                <div className="text-center">
                    <h2 className="font-semibold text-lg text-text">StayFinder</h2>
                    <p className="text-text-muted text-sm mt-1 max-w-md">
                        Discover and save stays — search destinations, explore accommodations, and keep your favorites in one place.
                    </p>
                </div>

                <ul className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2">
                    {navLinks.map((link) => (
                        <li key={link.label}>
                            <NavLink
                                to={link.to}
                                className={({ isActive }) =>
                                    `text-sm transition-colors ${isActive ? 'text-primary font-medium' : 'text-text hover:text-primary'}`
                                }
                            >
                                {link.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                <p className="text-center text-text-muted text-xs pt-4 border-t border-border w-full">
                    © 2026 StayFinder. All rights reserved.
                </p>
            </div>
        </footer>
    )
}
