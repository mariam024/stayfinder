import React from 'react'
import { Link } from 'react-router'
import loginImage from '../../Assets/loginImg.svg'
import { Eye, EyeOff } from 'lucide-react'
import useLoginForm from '../../Services/useLoginForm'

export default function LoginForm() {
    const {
        formData,
        errors,
        loading,
        showPassword,
        setShowPassword,
        handleChange,
        handleSubmit,
    } = useLoginForm()

    return (
        <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 bg-surface border border-border rounded-2xl shadow-sm px-6 py-8 sm:px-10 sm:py-10">
            <div className="w-full md:w-1/2 max-w-sm mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-2xl sm:text-[28px] font-semibold text-text tracking-tight">
                        Welcome Back
                    </h1>
                    <p className="mt-2 text-sm text-text-muted leading-relaxed">
                        Sign in to save stays and access your favorites.
                    </p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>

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
                            placeholder="Enter your email"
                            className={`w-full px-4 py-2.5 rounded-lg border ${errors.email ? 'border-red-400' : 'border-border'} bg-bg text-text placeholder-text-muted/70 text-sm outline-none transition-colors duration-150 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-surface`}
                        />
                        {errors.email && (
                            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-text mb-1.5"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className={`w-full px-4 py-2.5 pr-11 rounded-lg border ${errors.password ? 'border-red-400' : 'border-border'} bg-bg text-text placeholder-text-muted/70 text-sm outline-none transition-colors duration-150 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-surface`}
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
                        {errors.password && (
                            <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-white text-sm font-medium py-3 rounded-full mt-2 transition-opacity duration-150 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2 focus:ring-offset-surface disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Logging in...' : 'Log In'}
                    </button>
                </form>

                <p className="text-center text-sm text-text-muted mt-8">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-primary font-semibold hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
            <div className="hidden md:block md:w-1/2">
                <img
                    src={loginImage}
                    alt="Login"
                    className="w-full h-full object-cover rounded-xl"
                />
            </div>
        </div>
    )
}