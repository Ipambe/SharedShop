import { NewProductForm } from '@/components/NewProductForm'
import { ProductCard } from '@/components/ProductCard'
import { useShoppingListStore } from '@/stores/store'
import { View } from 'react-native'
export default function Products() {
  const products = useShoppingListStore((s) => s.shoppingList.products)

  return (
    <View className='flex-1 flex-col justify-start m-4'>
      <View className='flex-1 mt-6'>
        {products.map((product) => (
          <ProductCard key={product.id} id={product.id} name={product.name} />
        ))}
      </View>
      <NewProductForm />
    </View>
  )
}
