import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import { signupSchema } from './signupSchema'
import { useAuth } from '../context/AuthContext'
import { addFavoriteRecord } from './favoritesStorage'

const API_URL = 'https://6aa2a038ccb3db9689a6caf0.mockapi.io/auth/users'

const initialFormData = { fullName: '', email: '', password: '', confirmPassword: '' }

export default function useSignupForm() {
    const navigate = useNavigate()
    const location = useLocation()
    const { login } = useAuth()

    const [formData, setFormData] = useState(initialFormData)
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const { id, value } = e.target
        setFormData((prev) => ({ ...prev, [id]: value }))
        if (errors[id]) setErrors((prev) => ({ ...prev, [id]: '' }))
    }

    const validate = () => {
        const result = signupSchema.safeParse(formData)
        if (!result.success) {
            const fieldErrors = {}
            result.error.issues.forEach((issue) => {
                const field = issue.path[0]
                if (!fieldErrors[field]) fieldErrors[field] = issue.message
            })
            setErrors(fieldErrors)
            const firstError = result.error.issues[0]?.message
            if (firstError) toast.error(firstError)
            return false
        }
        setErrors({})
        return true
    }

    const savePendingFavorite = (userId) => {
        const pending = sessionStorage.getItem('pendingFavorite')
        if (!pending) return
        sessionStorage.removeItem('pendingFavorite')
        try {
            const hotel = JSON.parse(pending)
            addFavoriteRecord(userId, hotel)
            toast.success(`${hotel.name} added to your favorites!`)
        } catch { }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validate()) return

        setLoading(true)
        try {
            const checkRes = await fetch(`${API_URL}?email=${formData.email}`)
            const existingUsers = await checkRes.json()

            if (existingUsers.length > 0) {
                toast.error('This email is already registered')
                setLoading(false)
                return
            }

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullName: formData.fullName,
                    email: formData.email,
                    password: formData.password,
                }),
            })

            if (!response.ok) throw new Error('Signup failed, please try again')

            const data = await response.json()

            // login فوري بعد التسجيل، من غير ما نطلب من اليوزر يعمل login تاني بنفسه
            login(
                { id: data.id, fullName: data.fullName, email: data.email },
                'token-' + data.id
            )

            savePendingFavorite(data.id)

            toast.success('Account created successfully!')
            navigate(location.state?.returnTo || '/')
        } catch (err) {
            toast.error(err.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return { formData, errors, loading, handleChange, handleSubmit }
}