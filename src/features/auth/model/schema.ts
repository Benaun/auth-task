import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email format'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters')
})
export type LoginFormData = z.infer<typeof loginSchema>

export const secondFactorSchema = z.object({
  code: z.string().regex(/^\d{6}$/, 'Invalid code')
})
export type SecondFactorData = z.infer<typeof secondFactorSchema>
