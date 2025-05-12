import { useAuth } from '@clerk/clerk-expo'
import { ToggleModalButton } from './ToggleModalButton'
import { WithModal } from './WithModal'
import { useState } from 'react'
import { Input, Button, XStack } from 'tamagui'
import { api } from '@/api'
import { useStore } from '@/stores/store'

export const AddShoppingListForm = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { getToken } = useAuth()
  const addShoppingList = useStore((s) => s.addShoppingList)
  const [input, setInput] = useState('')

  const handleInputChange = (text: string) => {
    setInput(text.trim())
  }

  const showModal = () => {
    setIsModalVisible(true)
  }

  const closeModal = () => {
    setIsModalVisible(false)
  }

  const handleAddShoppingList = async () => {
    const token = await getToken()
    const { data } = await api.post(
      'shopping-lists',
      {
        name: input
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    addShoppingList(data)
    closeModal()
  }

  return (
    <>
      <ToggleModalButton showModal={showModal} />
      <WithModal
        closeModal={closeModal}
        isModalVisible={isModalVisible}
        modalTitle='Agregar lista de compras'
      >
        <XStack gap={10} alignItems='center'>
          <Input
            value={input}
            onChangeText={handleInputChange}
            placeholder='Nombre de la lista'
            fontSize={20}
            flex={1}
            borderRadius={10}
            padding={10}
            focusStyle={{
              borderColor: '#000',
              backgroundColor: '#fff'
            }}
          />
          <Button
            onPress={handleAddShoppingList}
            borderRadius={10}
            padding={10}
            marginLeft={10}
            pressStyle={{
              backgroundColor: '#444',
              scale: 1.05
            }}
          >
            Agregar lista
          </Button>
        </XStack>
      </WithModal>
    </>
  )
}
