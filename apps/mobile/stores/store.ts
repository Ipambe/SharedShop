import { Product, ShoppingList, ShoppingListMember } from '@/types'
import { create } from 'zustand'

interface ShoppingListsStore {
  shoppingLists: ShoppingList[]
  setShoppingLists: (shoppingLists: ShoppingList[]) => void
  addShoppingList: (list: ShoppingList) => void
  removeShoppingList: (id: number) => void
}

interface ShoppingListStore {
  shoppingList: { products: Product[]; members: ShoppingListMember[] }
  setShoppingList: (shoppingList: {
    products: Product[]
    members: ShoppingListMember[]
  }) => void
  addProduct: (product: Product) => void
}

export const useShoppingListsStore = create<ShoppingListsStore>()((set) => ({
  shoppingLists: [],
  setShoppingLists: (shoppingLists) => set({ shoppingLists }),
  addShoppingList: (list) =>
    set((state) => ({
      shoppingLists: [...state.shoppingLists, list]
    })),
  removeShoppingList: (id) =>
    set((state) => ({
      shoppingLists: state.shoppingLists.filter((list) => list.id !== id)
    }))
}))

export const useShoppingListStore = create<ShoppingListStore>()((set) => ({
  shoppingList: { products: [], members: [] },
  setShoppingList: (shoppingList) => set({ shoppingList }),
  addProduct: (product) =>
    set((state) => ({
      shoppingList: {
        ...state.shoppingList,
        products: [...state.shoppingList.products, product]
      }
    }))
}))
