import { View, Text } from 'react-native'

interface ProductCardProps {
  id: number
  name: string
}

export const ProductCard = ({ id, name }: ProductCardProps) => {
  return (
    <View className='flex-row items-center bg-gray-100 rounded-2xl p-4 mb-3 shadow shadow-black'>
      <Text className='text-2xl text-gray-800'>{name}</Text>
    </View>
  )
}
