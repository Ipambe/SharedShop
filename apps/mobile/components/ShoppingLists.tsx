import { useStore } from '@/stores/store'
import { FlatList, View, Text } from 'react-native'

export const ShoppingLists = () => {
  const shoppingLists = useStore((s) => s.shoppingLists)
  return (
    <FlatList
      className='flex-1'
      data={shoppingLists}
      renderItem={({ item }) => (
        <View className='p-4 border-b border-neutral-200'>
          <Text className='text-lg font-semibold text-neutral-950 dark:text-neutral-50'>
            {item.name}
          </Text>
        </View>
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  )
}
