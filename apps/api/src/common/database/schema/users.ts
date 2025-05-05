import { relations } from 'drizzle-orm'
import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { shoppingLists } from './shopping-lists'

export const users = sqliteTable('users', {
  id: text().primaryKey().notNull(),
  username: text().notNull().unique()
})

export const usersRelations = relations(users, ({ many }) => ({
  shoppingLists: many(shoppingLists)
}))
