import { Text } from 'react-native'
import { ShoppingLists } from '@/components/ShoppingLists'
import { AddShoppingListForm } from '@/components/AddShoppingListForm'
import { useShoppingListsStore } from '@/stores/store'
import { useAuth } from '@clerk/clerk-expo'
import { useEffect } from 'react'
import { api } from '@/api'
import { WithDarkModeBackground } from '@/components/WithDarkModeBackground'

export default function Index() {
  const setShoppingLists = useShoppingListsStore((s) => s.setShoppingLists)
  const { getToken, isLoaded } = useAuth()
  useEffect(() => {
    if (!isLoaded) return

    const fetchShoppingLists = async () => {
      const token = await getToken()

      const { data } = await api.get(`/users/shopping-lists`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setShoppingLists(data)
    }

    fetchShoppingLists()
  }, [isLoaded, getToken, setShoppingLists])

  return (
    <WithDarkModeBackground className="relative flex-1 gap-8 p-4">
      <Text className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
        Listas de compras
      </Text>
      <ShoppingLists />
      <AddShoppingListForm />
    </WithDarkModeBackground>
  )
}
