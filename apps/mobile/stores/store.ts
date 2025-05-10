import { ShoppingList } from '@/types'
import { create } from 'zustand'

interface ShoppingListsStore {
  shoppingLists: ShoppingList[]
  setShoppingLists: (shoppingLists: ShoppingList[]) => void
  addShoppingList: (list: ShoppingList) => void
  removeShoppingList: (id: number) => void
}

export const useStore = create<ShoppingListsStore>()((set) => ({
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
