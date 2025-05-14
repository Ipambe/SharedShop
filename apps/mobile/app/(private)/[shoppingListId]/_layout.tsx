import { api } from '@/api'
import { useShoppingListStore } from '@/stores/store'
import { useAuth } from '@clerk/clerk-expo'
import { Tabs, useLocalSearchParams } from 'expo-router'
import { useEffect, useRef } from 'react'

export default function ShoppingListLayout() {
  const { shoppingListId } = useLocalSearchParams() as {
    shoppingListId: string
  }
  const { setShoppingList } = useShoppingListStore()
  const refGetToken = useRef(useAuth().getToken)

  useEffect(() => {
    const fetchShoppingList = async () => {
      const token = await refGetToken.current()
      const { data } = await api.get(`users/shopping-lists/${shoppingListId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setShoppingList(data)
    }
    fetchShoppingList()
  }, [shoppingListId, setShoppingList])

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name='index'
        options={{
          title: 'Shopping List',
          href: {
            pathname: '/(private)/[shoppingListId]',
            params: { shoppingListId }
          }
        }}
      />
      <Tabs.Screen
        name='products'
        options={{
          title: 'Products',
          href: {
            pathname: '/(private)/[shoppingListId]/products',
            params: { shoppingListId }
          }
        }}
      />
      <Tabs.Screen
        name='members'
        options={{
          title: 'Members',
          href: {
            pathname: '/(private)/[shoppingListId]/members',
            params: { shoppingListId }
          }
        }}
      />
    </Tabs>
  )
}
