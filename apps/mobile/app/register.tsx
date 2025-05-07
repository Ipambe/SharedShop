import { api } from '@/api'
import { useStore } from '@/stores'
import { User } from '@/types'
import { useState } from 'react'
import { TextInput, View, Text, TouchableOpacity } from 'react-native'

export default function Register() {
  const [username, setUsername] = useState('')
  const { setToken } = useStore()

  const textChangeHandler = (text: string) => {
    setUsername(text)
  }

  const registerHandler = async () => {
    const { data } = await api.post<User>('users', {
      username
    })
    setToken(data.id || null)
  }
  return (
    <View className='flex-1 items-center justify-center bg-white'>
      <Text className='text-2xl font-bold'>Registrate</Text>
      <TextInput
        className='border border-gray-300 rounded-lg p-2 mt-4 w-80'
        placeholder='Username'
        value={username}
        onChangeText={textChangeHandler}
        autoCapitalize='none'
        autoCorrect={false}
        autoComplete='off'
      />
      <TouchableOpacity
        className='bg-blue-500 rounded-lg p-2 mt-4 w-80'
        onPress={() => registerHandler()}
      >
        <Text className='text-white text-center'>Registrate</Text>
      </TouchableOpacity>
    </View>
  )
}
