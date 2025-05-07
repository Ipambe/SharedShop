import { useStore } from '@/stores'
import { Text, TouchableOpacity, View } from 'react-native'

export default function Index() {
  const { setToken } = useStore()
  const pressHandler = () => {
    setToken(null)
  }
  return (
    <View className='flex-1 items-center justify-center bg-black'>
      <TouchableOpacity onPress={pressHandler}>
        <Text className='text-white text-9xl'>HOLA</Text>
      </TouchableOpacity>
    </View>
  )
}

