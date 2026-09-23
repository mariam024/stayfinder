import { Sparkles } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'

export default function Logo() {
    return (
        <>
            <div className="logo flex gap-1 items-center text-primary">
                <Sparkles className='size-4' />
                <Link to="/" className='font-semibold text-lg'>StayFinder</Link>
            </div>
        </>
    )
}
