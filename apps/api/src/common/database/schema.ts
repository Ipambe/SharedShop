import { LibSQLDatabase } from 'drizzle-orm/libsql'
import { products, productsRelations } from './schema/products'
import {
  shoppingListItems,
  shoppingListItemsRelations
} from './schema/shopping-list-items'
import {
  shoppingListMembers,
  shoppingListMembersRelations
} from './schema/shopping-list-members'
import { shoppingLists, shoppingListsRelations } from './schema/shopping-lists'
import { users, usersRelations } from './schema/users'

export const schema = {
  users,
  products,
  shoppingLists,
  shoppingListMembers,
  shoppingListItems,
  usersRelations,
  productsRelations,
  shoppingListsRelations,
  shoppingListMembersRelations,
  shoppingListItemsRelations
}

export type DatabaseType = LibSQLDatabase<typeof schema>
