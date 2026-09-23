import React, { useState } from 'react'
import { Link } from 'react-router'
import { Mail, Phone, MapPin, Send, HelpCircle, ArrowRight } from 'lucide-react'
import Navbar from './../../Components/Navbar/Navbar';

export default function Contact() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        subject: '',
        message: '',
    })
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        setSubmitted(true)
        setFormData({ fullName: '', email: '', subject: '', message: '' })
        setTimeout(() => setSubmitted(false), 4000)
    }

    const contactInfo = [
        { icon: Mail, label: 'Email', value: 'support@stayfinder.com' },
        { icon: Phone, label: 'Phone', value: '+20 100 000 0000' },
        { icon: MapPin, label: 'Location', value: 'Cairo, Egypt' },
    ]

    return (
        <main>
            <Navbar />
            <section className="py-16 px-6 text-center">
                <div className="container mx-auto flex flex-col items-center gap-3">
                    <span className="text-xs font-bold tracking-widest text-primary uppercase">
                        Contact Us
                    </span>
                    <h1 className="text-3xl md:text-4xl font-bold text-text">
                        Get in Touch
                    </h1>
                    <p className="text-text-muted max-w-xl text-sm md:text-base">
                        Have a question, need help with your booking, or want to learn more about StayFinder? We're here to help.
                    </p>
                </div>
            </section>

            <section className="pb-20 px-6">
                <div className="container mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">
                    <div className="lg:col-span-2 flex flex-col gap-8">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-xl font-semibold text-text">
                                We'd Love to Hear From You
                            </h2>
                            <p className="text-text-muted text-sm leading-relaxed">
                                Whether you have a question about a property, need assistance with your search, or have feedback to share, feel free to reach out to us.
                            </p>
                        </div>

                        <div className="flex flex-col gap-5">
                            {contactInfo.map((info) => {
                                const Icon = info.icon
                                return (
                                    <div key={info.label} className="flex items-center gap-4">
                                        <div className="flex items-center justify-center size-11 rounded-full bg-primary/10 shrink-0">
                                            <Icon className="size-5 text-primary" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs text-text-muted">{info.label}</span>
                                            <span className="text-sm font-medium text-text">{info.value}</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="lg:col-span-3 bg-bg rounded-2xl p-6 md:p-8">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="fullName" className="text-sm font-medium text-text">
                                        Full Name
                                    </label>
                                    <input
                                        id="fullName"
                                        name="fullName"
                                        type="text"
                                        required
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className="bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-text placeholder:text-gray-400 outline-none focus:border-primary transition-colors duration-200"
                                    />
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="email" className="text-sm font-medium text-text">
                                        Email Address
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-text placeholder:text-gray-400 outline-none focus:border-primary transition-colors duration-200"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="subject" className="text-sm font-medium text-text">
                                    Subject
                                </label>
                                <input
                                    id="subject"
                                    name="subject"
                                    type="text"
                                    required
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-text placeholder:text-gray-400 outline-none focus:border-primary transition-colors duration-200"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="message" className="text-sm font-medium text-text">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Write your message here..."
                                    className="bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-text placeholder:text-gray-400 outline-none focus:border-primary transition-colors duration-200 resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="group flex items-center justify-center gap-2 bg-primary text-surface py-3 rounded-full font-semibold text-sm hover:scale-[1.02] hover:shadow-lg transition-all duration-200 cursor-pointer"
                            >
                                {submitted ? 'Message Sent ✓' : 'Send Message'}
                                {!submitted && (
                                    <Send className="size-4 group-hover:translate-x-1 transition-transform duration-200" />
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    )
}