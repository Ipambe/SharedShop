import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const invitations = sqliteTable('invitations', {
  id: integer().primaryKey({ autoIncrement: true }).notNull(),
  token: text().notNull(),
  isSingleUse: integer({ mode: 'boolean' }).notNull()
})
