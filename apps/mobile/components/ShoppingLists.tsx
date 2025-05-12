import { useStore } from '@/stores/store'
import { FlatList } from 'react-native'
import { Link } from 'expo-router'

export const ShoppingLists = () => {
  const shoppingLists = useStore((s) => s.shoppingLists)
  return (
    <FlatList
      className='flex-1 mt-16'
      data={shoppingLists}
      renderItem={({ item }) => (
        <Link
          href={`/${item.id}`}
          className='px-4 py-6 border-b border-neutral-200 text-2xl text-white'
        >
          {item.name}
        </Link>
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  )
}
