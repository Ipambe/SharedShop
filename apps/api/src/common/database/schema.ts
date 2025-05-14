import { LibSQLDatabase } from 'drizzle-orm/libsql'
import { products, productsRelations } from './schema/products'
import {
  shoppingListMembers,
  shoppingListMembersRelations
} from './schema/shopping-list-members'
import { shoppingLists, shoppingListsRelations } from './schema/shopping-lists'
import { users, usersRelations } from './schema/users'

export const schema = {
  users,
  usersRelations,
  products,
  productsRelations,
  shoppingLists,
  shoppingListsRelations,
  shoppingListMembers,
  shoppingListMembersRelations
}

export type DatabaseType = LibSQLDatabase<typeof schema>
