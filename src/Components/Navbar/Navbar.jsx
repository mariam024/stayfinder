import { Moon, Sun, TextAlignJustify, X, Heart, LogOut } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router'
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import Logo from '../Logo/Logo';

const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-text'}`;

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isDark, toggleTheme } = useTheme();
    const { isAuthenticated, user, logout } = useAuth();

    const links = [
        { id: 1, to: "/", label: "Home" },
        { id: 2, to: "/explore", label: "Explore" },
        { id: 3, to: "/contact", label: "Contact" },
        { id: 4, to: "/favorites", label: "Favorites", icon: Heart },
    ];

    return (
        <nav className="bg-transparent py-2 border-b border-transparent">
            <div className="container mx-auto flex justify-between items-center py-4 px-4 sm:px-6">
                <Logo />

                <div className="hidden md:block">
                    <ul className="flex items-center gap-6">
                        {links.map((link) => (
                            <li key={link.to}>
                                <NavLink to={link.to} className={navLinkClass}>
                                    {link.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="hidden md:flex items-center gap-3 text-sm">
                    {isAuthenticated ? (
                        <>
                            {user?.fullName && (
                                <span className="text-text-muted max-w-[9rem] truncate text-sm" title={user.fullName}>
                                    Hi, {user.fullName.split(' ')[0]}
                                </span>
                            )}
                            <button
                                type="button"
                                onClick={logout}
                                aria-label="Log out"
                                className="p-2 rounded-full border border-border hover:border-primary/40 transition-colors"
                            >
                                <LogOut size={18} />
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="py-2 px-5 rounded-full border border-border hover:border-primary/40 transition-colors">
                                Login
                            </Link>
                            <Link to="/signup" className="bg-text text-bg py-2 px-5 rounded-full hover:opacity-90 transition-opacity">
                                Sign Up
                            </Link>
                        </>
                    )}

                    <button
                        type="button"
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                        className="p-2 rounded-full border border-border hover:border-primary/40 transition-colors"
                    >
                        {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
                    </button>
                </div>

                <div className="md:hidden flex items-center gap-2">
                    <NavLink to="/favorites" aria-label="Favorites" className="p-2 rounded-full border border-border">
                        <Heart size={18} className="text-primary" />
                    </NavLink>
                    <button type="button" onClick={toggleTheme} className="p-2 rounded-full border border-border">
                        {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
                    </button>
                    <button
                        type="button"
                        className="p-2 text-text"
                        aria-label="Menu"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X /> : <TextAlignJustify />}
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden px-4 pb-4 flex flex-col gap-4 border-t border-border/50">
                    <ul className="flex flex-col items-center gap-3 pt-4">
                        {links.map((link) => (
                            <li key={link.to}>
                                <NavLink
                                    to={link.to}
                                    className={navLinkClass}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    {isAuthenticated ? (
                        <button
                            type="button"
                            onClick={() => { logout(); setIsMenuOpen(false); }}
                            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-full border w-full"
                        >
                            <LogOut size={18} /> Log out
                        </button>
                    ) : (
                        <div className="flex gap-3">
                            <Link to="/login" className="flex-1 py-2.5 rounded-full text-center border text-sm" onClick={() => setIsMenuOpen(false)}>
                                Login
                            </Link>
                            <Link to="/signup" className="flex-1 bg-text text-bg py-2.5 rounded-full text-center text-sm" onClick={() => setIsMenuOpen(false)}>
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    )
}
