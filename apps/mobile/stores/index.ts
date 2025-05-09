import { ShoppingList, User } from '@/types'
import { create } from 'zustand'

interface UserStore {
  user: User | null
  setUser: (user: User) => void
}

interface ShoppingListsStore {
  shoppingLists: ShoppingList[]
  setShoppingLists: (shoppingLists: ShoppingList[]) => void
  addShoppingList: (list: ShoppingList) => void
  removeShoppingList: (id: number) => void
}

export const useStore = create<UserStore & ShoppingListsStore>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  shoppingLists: [],
  setShoppingLists: (shoppingLists) =>
    set((state) =>
      JSON.stringify(state.shoppingLists) !== JSON.stringify(shoppingLists)
        ? { shoppingLists }
        : state
    ),
  addShoppingList: (list) =>
    set((state) => ({
      ...state,
      shoppingLists: [...state.shoppingLists, list]
    })),
  removeShoppingList: (id) =>
    set((state) => ({
      ...state,
      shoppingLists: state.shoppingLists.filter((list) => list.id !== id)
    }))
}))
