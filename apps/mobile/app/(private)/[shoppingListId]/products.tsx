import { ListItemCard } from '@/components/ListItemCard'
import { NewProductForm } from '@/components/NewProductForm'
import { WithDarkModeBackground } from '@/components/WithDarkModeBackground'
import { useShoppingListStore } from '@/stores/store'
import { Text, View } from 'react-native'
export default function Products() {
  const products = useShoppingListStore((s) => s.shoppingList.products)

  return (
    <WithDarkModeBackground className="p-4">
      <Text className="mb-8 text-xl font-bold text-neutral-900 dark:text-neutral-100">
        Listado de productos
      </Text>

      <View className="flex-1">
        {products.map((product) => (
          <ListItemCard key={product.id} text={product.name} />
        ))}
      </View>
      <NewProductForm />
    </WithDarkModeBackground>
  )
}
