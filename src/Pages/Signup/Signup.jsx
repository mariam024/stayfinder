import React from 'react'
import Logo from '../../Components/Logo/Logo'
import SignupForm from '../../Components/SignupForm/SignupForm'

export default function Signup() {
    return (
        <>
            <main className="min-h-screen bg-bg py-6 sm:py-10">
                <div className="container mx-auto py-4 px-6">
                    <div className="logo pb-10">
                        <Logo />
                    </div>
                    <div className="signup-form">
                        <SignupForm />
                    </div>
                </div>
            </main>
        </>
    )
}
