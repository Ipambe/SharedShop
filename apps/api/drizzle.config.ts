import { defineConfig } from 'drizzle-kit'
import { TURSO_DB_URL, TURSO_AUTH_TOKEN } from './env'

export default defineConfig({
  schema: './src/common/database/schema/*',
  out: './drizzle',
  dialect: 'turso',
  dbCredentials: {
    url: TURSO_DB_URL,
    authToken: TURSO_AUTH_TOKEN
  }
})
