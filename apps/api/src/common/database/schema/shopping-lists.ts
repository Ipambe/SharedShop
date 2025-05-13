import { shoppingListMembers } from './shopping-list-members'
import { relations } from 'drizzle-orm'
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'
import { shoppingListItems } from './shopping-list-items'

export const shoppingLists = sqliteTable('shopping-lists', {
  id: integer().primaryKey({ autoIncrement: true }).notNull(),
  name: text().notNull()
})

export const shoppingListsRelations = relations(shoppingLists, ({ many }) => ({
  members: many(shoppingListMembers),
  items: many(shoppingListItems)
}))
