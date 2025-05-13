import { api } from '@/api'
import { useAuth } from '@clerk/clerk-expo'
import { Tabs, useLocalSearchParams } from 'expo-router'
import { useEffect, useRef } from 'react'

export default function ShoppingListLayout() {
  const { shoppingListId } = useLocalSearchParams()
  // const { getToken } = useAuth()
  // const refGetToken = useRef(getToken)
  const refGetToken = useRef(useAuth().getToken) // Hay que usar useRef para evitar que se vuelva a crear la función en cada renderizado

  useEffect(() => {
    const fetchShoppingList = async () => {
      const token = await refGetToken.current()
      const { data } = await api.get(`users/shopping-lists/${shoppingListId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log('data', data)
    }
    fetchShoppingList()
  }, [shoppingListId])

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name='index' options={{ title: 'Shopping List' }} />
      <Tabs.Screen name='products' options={{ title: 'Products' }} />
      <Tabs.Screen name='members' options={{ title: 'Members' }} />
    </Tabs>
  )
}
