import { api } from '@/api'
import { WithDarkModeBackground } from '@/components/WithDarkModeBackground'
import { useShoppingListStore } from '@/stores/store'
import { useAuth } from '@clerk/clerk-expo'
import { useOptimistic } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export default function Index() {
  const products = useShoppingListStore((s) => s.shoppingList.products)
  const toggleBought = useShoppingListStore((s) => s.toggleBought)
  const [optimisticProducts, setOptimisticProducts] = useOptimistic(
    products,
    (op, id: number) =>
      op.map((e) => (e.id === id ? { ...e, bought: !e.bought } : e))
  )
  const { getToken } = useAuth()

  const toggleBoughtHandler = async (id: number) => {
    setOptimisticProducts(id)
    const token = await getToken()
    const res = await api.patch(
      `products/${id}/bought`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    if (res.status >= 400) return setOptimisticProducts(id)

    toggleBought(id)
  }

  return (
    <WithDarkModeBackground className="p-4">
      <View>
        {optimisticProducts.map((product) => (
          <TouchableOpacity
            key={product.id}
            onPress={() => toggleBoughtHandler(product.id)}
          >
            <ProductCard text={product.name} bought={product.bought} />
          </TouchableOpacity>
        ))}
      </View>
    </WithDarkModeBackground>
  )
}
interface ProductCardProps {
  text: string
  bought: boolean
}
const ProductCard = ({ text, bought }: ProductCardProps) => {
  return (
    <View
      className={`mb-4 rounded-lg border p-4 shadow shadow-black ${
        bought
          ? 'border-green-400 bg-green-100 dark:border-green-600 dark:bg-green-900'
          : 'border-neutral-300 bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800'
      } `}
    >
      <Text
        className={`text-3xl ${
          bought
            ? 'text-green-700 line-through dark:text-green-300'
            : 'text-neutral-900 dark:text-neutral-200'
        }`}
      >
        {text}
      </Text>
    </View>
  )
}
