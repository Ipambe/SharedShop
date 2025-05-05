import { shoppingLists } from './shopping-lists'
import { users } from './users'
import { relations, sql } from 'drizzle-orm'
import { sqliteTable, integer, primaryKey } from 'drizzle-orm/sqlite-core'

export const shoppingListMembers = sqliteTable(
  'shopping-list-members',
  {
    userId: integer()
      .notNull()
      .references(() => users.id),
    shoppingListId: integer()
      .notNull()
      .references(() => shoppingLists.id),
    isOwner: integer({ mode: 'boolean' }).notNull().default(false),
    createdAt: integer({ mode: 'timestamp' })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`)
  },
  (t) => [primaryKey({ columns: [t.userId, t.shoppingListId] })]
)

export const shoppingListMembersRelations = relations(
  shoppingListMembers,
  ({ one }) => ({
    user: one(users, {
      fields: [shoppingListMembers.userId],
      references: [users.id]
    }),
    shoppingList: one(shoppingLists, {
      fields: [shoppingListMembers.shoppingListId],
      references: [shoppingLists.id]
    })
  })
)
