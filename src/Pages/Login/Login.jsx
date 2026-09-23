import React from 'react'
import Logo from '../../Components/Logo/Logo'
import LoginForm from '../../Components/LoginForm/LoginForm'

export default function Login() {
    return (
        <>
            <main className="min-h-screen bg-bg py-6 sm:py-10">
                <div className="container mx-auto py-4 px-6">
                    <div className="logo pb-10">
                        <Logo />
                    </div>
                    <div className="signup-form">
                        <LoginForm />
                    </div>
                </div>
            </main>
        </>
    )
}
