import { api } from '@/api'
import { useStore } from '@/stores'
import { useRef, useEffect } from 'react'
import { useAuth } from '@clerk/clerk-expo'
import { Text, View, FlatList } from 'react-native'

export default function Index() {
  const shoppingLists = useStore((state) => state.shoppingLists)

  const setShoppingLists = useRef(useStore.getState().setShoppingLists)
  const { getToken, isLoaded } = useAuth()

  useEffect(() => {
    if (!isLoaded) return console.log('not loaded yet')

    const fetchShoppingLists = async () => {
      console.log('fetching shopping lists')
      const token = await getToken()

      const { data } = await api.get(`/users/shopping-lists`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setShoppingLists.current(data)
      console.log('finished fetching', data)
    }

    fetchShoppingLists()
  }, [isLoaded, getToken, setShoppingLists])

  return (
    <FlatList
      data={shoppingLists}
      renderItem={({ item }) => (
        <View>
          <Text className='text-black text-2xl'>{item.name}</Text>
        </View>
      )}
    />
  )
}

