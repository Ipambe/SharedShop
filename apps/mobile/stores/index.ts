import { setItemAsync } from 'expo-secure-store'
import { create } from 'zustand'

interface TokenStore {
  token: string | null
  setToken: (token: string | null) => void
}

export const useStore = create<TokenStore>()((set) => ({
  token: null,
  setToken: async (token) => {
    set({ token })
    await setItemAsync('token', token || '')
  }
}))
