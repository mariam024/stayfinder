import { useNavigate } from "react-router";
import { X, Heart } from "lucide-react";

export default function FavoriteAuthModal({ onClose }) {
    const navigate = useNavigate();

    const goTo = (path) => {
        onClose();
        navigate(path, { state: { returnTo: window.location.pathname } });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden />
            <div className="relative w-full max-w-sm rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 text-center space-y-4 shadow-xl">
                <button type="button" onClick={onClose} className="absolute top-4 right-4" aria-label="Close">
                    <X size={18} />
                </button>
                <div className="flex justify-center pt-2">
                    <span className="grid place-items-center size-12 rounded-full bg-[var(--color-primary)]/10">
                        <Heart className="text-[var(--color-primary)]" size={22} />
                    </span>
                </div>
                <h3 className="text-lg font-semibold">Save this stay</h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                    Sign in or create an account to add this stay to your favorites.
                </p>
                <div className="flex flex-col gap-2 pt-2">
                    <button
                        type="button"
                        onClick={() => goTo("/login")}
                        className="w-full px-4 py-2.5 rounded-full bg-[var(--color-primary)] text-white text-sm font-medium"
                    >
                        Log in
                    </button>
                    <button
                        type="button"
                        onClick={() => goTo("/signup")}
                        className="w-full px-4 py-2.5 rounded-full border border-[var(--color-border)] text-sm font-medium"
                    >
                        Sign up
                    </button>
                </div>
            </div>
        </div>
    );
}
