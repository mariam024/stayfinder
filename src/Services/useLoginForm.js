import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import { loginSchema } from './loginSchema'
import { useAuth } from '../context/AuthContext'
import { addFavoriteRecord } from './favoritesStorage'

const API_URL = 'https://6aa2a038ccb3db9689a6caf0.mockapi.io/auth/users'

const initialFormData = { email: '', password: '' }

export default function useLoginForm() {
    const navigate = useNavigate()
    const location = useLocation()
    const { login } = useAuth()

    const [formData, setFormData] = useState(initialFormData)
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleChange = (e) => {
        const { id, value } = e.target
        setFormData((prev) => ({ ...prev, [id]: value }))
        if (errors[id]) setErrors((prev) => ({ ...prev, [id]: '' }))
    }

    const validate = () => {
        const result = loginSchema.safeParse(formData)
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

    // بعد أي نجاح في اللوجين، لو فيه فندق كان مضغوط عليه ❤️ قبل التسجيل، يتحفظ تلقائي
    const savePendingFavorite = (userId) => {
        const pending = sessionStorage.getItem('pendingFavorite')
        if (!pending) return
        sessionStorage.removeItem('pendingFavorite')
        try {
            const hotel = JSON.parse(pending)
            addFavoriteRecord(userId, hotel)
            toast.success(`${hotel.name} added to your favorites!`)
        } catch {
            // saving favorites should not block login
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validate()) return

        setLoading(true)
        try {
            const response = await fetch(`${API_URL}?email=${formData.email}`)
            const users = await response.json()
            const matchedUser = users.find((user) => user.password === formData.password)

            if (!matchedUser) {
                toast.error('Invalid email or password')
                setLoading(false)
                return
            }

            login(
                { id: matchedUser.id, fullName: matchedUser.fullName, email: matchedUser.email },
                'token-' + matchedUser.id
            )

            savePendingFavorite(matchedUser.id)

            toast.success('Logged in successfully!')
            navigate(location.state?.returnTo || '/')
        } catch (err) {
            toast.error('Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return { formData, errors, loading, showPassword, setShowPassword, handleChange, handleSubmit }
}