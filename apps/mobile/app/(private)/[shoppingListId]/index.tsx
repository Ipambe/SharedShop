import { useLocalSearchParams } from 'expo-router'
import { View, Text } from 'react-native'

export default function Index() {
  const { shoppingListId } = useLocalSearchParams() as {
    shoppingListId: string
  }
  return (
    <View className='flex-1 items-center justify-center'>
      <Text className='text-2xl font-bold'>{shoppingListId} - index</Text>
    </View>
  )
}
