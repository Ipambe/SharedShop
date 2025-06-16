import { relations } from 'drizzle-orm'
import { sqliteTable, integer, text, primaryKey } from 'drizzle-orm/sqlite-core'
import { shoppingLists } from './shopping-lists'

export const invitations = sqliteTable(
  'invitations',
  {
    token: text().notNull(),
    shoppingListId: integer().references(() => shoppingLists.id)
  },
  (t) => [primaryKey({ columns: [t.shoppingListId, t.token] })]
)

export const invitationsRelations = relations(invitations, ({ one }) => ({
  shoppingList: one(shoppingLists, {
    fields: [invitations.shoppingListId],
    references: [shoppingLists.id]
  })
}))
