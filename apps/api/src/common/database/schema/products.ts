import { sqliteTable, integer, text, unique } from 'drizzle-orm/sqlite-core'
import { shoppingLists } from './shopping-lists'
import { relations } from 'drizzle-orm'

export const products = sqliteTable(
  'products',
  {
    id: integer().primaryKey({ autoIncrement: true }).notNull(),
    name: text().notNull(),
    bought: integer({ mode: 'boolean' }).notNull().default(false),
    quantity: integer().notNull().default(1),
    shoppingListId: integer()
      .notNull()
      .references(() => shoppingLists.id)
  },
  (t) => [unique().on(t.name, t.shoppingListId)]
)

export const productsRelations = relations(products, ({ one }) => ({
  shoppingList: one(shoppingLists, {
    fields: [products.shoppingListId],
    references: [shoppingLists.id]
  })
}))
