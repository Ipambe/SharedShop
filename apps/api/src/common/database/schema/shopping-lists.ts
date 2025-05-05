import { products } from './products'
import { users } from './users'
import { relations } from 'drizzle-orm'
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'

export const shoppingLists = sqliteTable('shopping-lists', {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull()
})

export const shoppingListsRelations = relations(shoppingLists, ({ many }) => ({
  users: many(users),
  products: many(products)
}))
