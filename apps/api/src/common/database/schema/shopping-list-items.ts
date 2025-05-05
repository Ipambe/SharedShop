import { relations } from 'drizzle-orm'
import { sqliteTable, integer, primaryKey } from 'drizzle-orm/sqlite-core'
import { products } from './products'
import { shoppingLists } from './shopping-lists'

export const shoppingListItems = sqliteTable(
  'shopping-list-items',
  {
    productId: integer()
      .notNull()
      .references(() => products.id),
    shoppingListId: integer()
      .notNull()
      .references(() => shoppingLists.id),
    status: integer({ mode: 'boolean' }).notNull().default(false)
  },
  (t) => [primaryKey({ columns: [t.productId, t.shoppingListId] })]
)

export const shoppingListItemsRelations = relations(
  shoppingListItems,
  ({ one }) => ({
    product: one(products, {
      fields: [shoppingListItems.productId],
      references: [products.id]
    }),
    shoppingList: one(shoppingLists, {
      fields: [shoppingListItems.shoppingListId],
      references: [shoppingLists.id]
    })
  })
)
