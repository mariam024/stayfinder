import React from 'react'
import { Link } from 'react-router'
import signupImage from '../../assets/signupImg.svg'
import useSignupForm from '../../Services/useSignupForm'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export default function SignupForm() {
    const {
        formData,
        errors,
        serverError,
        loading,
        handleChange,
        handleSubmit,
    } = useSignupForm()

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    return (
        <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 sm:gap-12 bg-surface border border-border rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] px-8 py-10 sm:px-10 sm:py-12">
            <div className="hidden md:block md:w-1/2">
                <img
                    src={signupImage}
                    alt="Signup"
                    className="w-full h-full object-cover rounded-xl"
                />
            </div>

            <div className="w-full md:w-1/2 max-w-md mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-2xl sm:text-[28px] font-semibold text-text tracking-tight">
                        Create your account
                    </h1>
                    <p className="mt-2 text-sm text-text-muted leading-relaxed">
                        Create an account to save stays and sync your favorites.
                    </p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>

                    <div>
                        <label
                            htmlFor="fullName"
                            className="block text-sm font-medium text-text mb-1.5"
                        >
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Your full name"
                            className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg text-text placeholder-text-muted/70 text-sm outline-none transition-colors duration-150 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-surface"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-text mb-1.5"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg text-text placeholder-text-muted/70 text-sm outline-none transition-colors duration-150 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-surface"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-text mb-1.5">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="w-full px-4 py-2.5 pr-11 rounded-lg border border-border bg-bg text-text placeholder-text-muted/70 text-sm outline-none transition-colors duration-150 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-surface"
                            />
                            {formData.password.length > 0 && (
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text transition-colors"
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-text mb-1.5">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                id="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Re-enter your password"
                                className="w-full px-4 py-2.5 pr-11 rounded-lg border border-border bg-bg text-text placeholder-text-muted/70 text-sm outline-none transition-colors duration-150 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-surface"
                            />
                            {formData.confirmPassword.length > 0 && (
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text transition-colors"
                                    tabIndex={-1}
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-white text-sm font-medium py-3 rounded-full mt-2 transition-opacity duration-150 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2 focus:ring-offset-surface"
                    >
                        Create Account
                    </button>
                </form>

                <p className="text-center text-sm text-text-muted mt-8">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary font-semibold hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    )
}