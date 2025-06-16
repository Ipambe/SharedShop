import { shoppingListMembers } from './shopping-list-members'
import { relations } from 'drizzle-orm'
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'
import { products } from './products'
import { invitations } from './invitation'

export const shoppingLists = sqliteTable('shopping-lists', {
  id: integer().primaryKey({ autoIncrement: true }).notNull(),
  name: text().notNull()
})

export const shoppingListsRelations = relations(
  shoppingLists,
  ({ one, many }) => ({
    members: many(shoppingListMembers),
    products: many(products),
    invitation: one(invitations)
  })
)
