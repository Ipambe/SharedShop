import { api } from '@/api'
import { useShoppingListStore } from '@/stores/store'
import { useAuth } from '@clerk/clerk-expo'
import { useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { View } from 'react-native'
import { Button, Input, XStack } from 'tamagui'

export const NewProductForm = () => {
  const { shoppingListId } = useLocalSearchParams()
  const [productName, setProductName] = useState('')
  const { getToken } = useAuth()
  const addProduct = useShoppingListStore((state) => state.addProduct)

  const handleChange = (text: string) => {
    setProductName(text)
  }

  const handleSubmit = async () => {
    if (!productName.trim()) {
      console.error('El nombre del producto no puede estar vacío')
      return
    }
    const token = await getToken()

    const { data, status } = await api.post(
      `shopping-lists/${shoppingListId}/products`,
      {
        name: productName
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    if (status === 201) {
      addProduct(data)
      setProductName('')
    } else {
      console.error('Error al agregar el producto:', data)
    }
  }

  return (
    <View>
      <XStack gap={8}>
        <Input
          placeholder="Nombre del producto"
          flex={1}
          value={productName}
          onChangeText={handleChange}
        />
        <Button onPress={handleSubmit} theme="white">
          Agregar
        </Button>
      </XStack>
    </View>
  )
}
