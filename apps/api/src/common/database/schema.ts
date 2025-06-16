import { LibSQLDatabase } from 'drizzle-orm/libsql'
import { products, productsRelations } from './schema/products'
import {
  shoppingListMembers,
  shoppingListMembersRelations
} from './schema/shopping-list-members'
import { shoppingLists, shoppingListsRelations } from './schema/shopping-lists'
import { users, usersRelations } from './schema/users'
import { invitations, invitationsRelations } from './schema/invitation'

export const schema = {
  users,
  usersRelations,
  products,
  productsRelations,
  shoppingLists,
  shoppingListsRelations,
  shoppingListMembers,
  shoppingListMembersRelations,
  invitations,
  invitationsRelations
}

export type DatabaseType = LibSQLDatabase<typeof schema>
