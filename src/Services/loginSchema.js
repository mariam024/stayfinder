import { z } from 'zod'

export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, 'Email is required')
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format'),

    password: z.string().min(1, 'Password is required'),
})