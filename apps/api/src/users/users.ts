import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: text().primaryKey().notNull(),
  username: text().notNull().unique()
})
