import { api } from '@/api'
import { useStore } from '@/stores/store'
import { useEffect } from 'react'
import { useAuth } from '@clerk/clerk-expo'
import { View } from 'react-native'
import { ShoppingLists } from '@/components/ShoppingLists'
import { AddShoppingListForm } from '@/components/AddShoppingListForm'

export default function Index() {
  const setShoppingLists = useStore((s) => s.setShoppingLists)
  const { getToken, isLoaded } = useAuth()
  useEffect(() => {
    if (!isLoaded) return

    const fetchShoppingLists = async () => {
      console.log('fetching shopping lists')
      const token = await getToken()

      const { data } = await api.get(`/users/shopping-lists`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setShoppingLists(data)
      console.log('finished fetching', data)
    }

    fetchShoppingLists()
  }, [isLoaded, getToken, setShoppingLists])

  return (
    <View className='flex-1 relative bg-neutral-300 dark:bg-neutral-950'>
      <ShoppingLists />
      <AddShoppingListForm />
    </View>
  )
}

