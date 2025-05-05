import { users } from '@/users/users'
import { LibSQLDatabase } from 'drizzle-orm/libsql'

export const schema = {
  users
}

export type DatabaseType = LibSQLDatabase<typeof schema>
