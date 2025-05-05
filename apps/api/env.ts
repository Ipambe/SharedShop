import { loadEnvFile } from 'node:process'
import { z } from 'zod'

loadEnvFile()

const envSchema = z.object({
  TURSO_DB_URL: z.string().url(),
  TURSO_AUTH_TOKEN: z.string()
})

const { success, error, data } = envSchema.safeParse(process.env)

if (!success) {
  console.error('Invalid environment variables:', error.format())
  process.exit(1)
}

export const { TURSO_AUTH_TOKEN, TURSO_DB_URL } = data
