import { z } from 'zod'

const envSchema = z.object({
  EXPO_PUBLIC_API_URL: z.string()
})
const { success, error, data } = envSchema.safeParse(process.env)

if (!success) {
  console.error('Invalid environment variables:', error.format())
  throw new Error('Invalid environment variables')
}

export const { EXPO_PUBLIC_API_URL } = data
