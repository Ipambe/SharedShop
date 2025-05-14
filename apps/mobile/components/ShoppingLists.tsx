import { useShoppingListsStore } from '@/stores/store'
import { FlatList, Pressable } from 'react-native'
import { Link } from 'expo-router'
import { ListItemCard } from './ListItemCard'

export const ShoppingLists = () => {
  const shoppingLists = useShoppingListsStore((s) => s.shoppingLists)
  return (
    <FlatList
      className="flex-1"
      data={shoppingLists}
      renderItem={({ item }) => (
        <Link href={`/${item.id}`} asChild>
          <Pressable>
            <ListItemCard text={item.name} />
          </Pressable>
        </Link>
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  )
}
