import { z } from 'zod'

export const signupSchema = z
    .object({
        fullName: z
            .string()
            .trim()
            .min(1, 'Full name is required')
            .min(3, 'Full name must be at least 3 characters')
            .regex(/^[A-Za-z\s]+$/, 'Full name must contain letters only'),

        email: z
            .string()
            .trim()
            .min(1, 'Email is required')
            .regex(
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                'Invalid email format'
            ),

        password: z
            .string()
            .min(1, 'Password is required')
            .min(6, 'Password must be at least 6 characters')
            .regex(
                /^(?=.*[A-Za-z])(?=.*\d).+$/,
                'Password must contain at least one letter and one number'
            ),

        confirmPassword: z.string().min(1, 'Please confirm your password'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    })