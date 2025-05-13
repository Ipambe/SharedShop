import { relations } from 'drizzle-orm'
import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { shoppingListMembers } from './shopping-list-members'

export const users = sqliteTable('users', {
  id: text().primaryKey().notNull(),
  username: text().notNull().unique()
})

export const usersRelations = relations(users, ({ many }) => ({
  shoppingLists: many(shoppingListMembers)
}))
