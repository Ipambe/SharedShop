import { Text, View } from 'react-native'
import { ToggleModalButton } from './ToggleModalButton'
import { WithModal } from './WithModal'
import { useState } from 'react'

export const AddShoppingListForm = () => {
  const [isModalVisible, setIsModalVisible] = useState(true)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const closeModal = () => {
    setIsModalVisible(false)
  }

  return (
    <>
      <ToggleModalButton showModal={showModal} />
      <WithModal
        closeModal={closeModal}
        isModalVisible={isModalVisible}
        modalTitle='Agregar lista de compras'
      >
        <View>

        </View>
      </WithModal>
    </>
  )
}
