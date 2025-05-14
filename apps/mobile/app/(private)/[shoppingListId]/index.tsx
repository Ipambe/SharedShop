import { ListItemCard } from '@/components/ListItemCard'
import { WithDarkModeBackground } from '@/components/WithDarkModeBackground'
import { useShoppingListStore } from '@/stores/store'
import { View } from 'react-native'

export default function Index() {
  const products = useShoppingListStore((s) => s.shoppingList.products)

  return (
    <WithDarkModeBackground className="p-4">
      <View className="mt-6 flex-1">
        {products.map((product) => (
          <ListItemCard key={product.id} text={product.name} />
        ))}
      </View>
    </WithDarkModeBackground>
  )
}
