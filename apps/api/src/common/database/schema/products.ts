import { relations } from 'drizzle-orm'
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'
import { shoppingLists } from './shopping-lists'

export const products = sqliteTable('products', {
  id: integer().primaryKey({ autoIncrement: true }).notNull(),
  name: text().notNull().unique()
})

export const productsRelations = relations(products, ({ many }) => ({
  shoppingLists: many(shoppingLists)
}))
