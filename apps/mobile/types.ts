export interface User {
  id: string
  username: string
}

export interface Product {
  id: number
  name: string
}

export interface ShoppingList {
  id: number
  name: string
}

export interface ShoppingListItem {
  productId: number
  shoppingListId: number
  status: boolean
}

export interface ShoppingListMember {
  userId: string
  shoppingListId: number
  isOwner: boolean
  createdAt: string
}
