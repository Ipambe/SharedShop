import { ToggleModalButton } from './ToggleModalButton'
import { WithModal } from './WithModal'
import { useState } from 'react'
import { Button, Form, Input } from 'tamagui'

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
        <Form onSubmit={() => console.log()}>
          <Input />
          <Form.Trigger asChild>
            <Button></Button>
          </Form.Trigger>
        </Form>
      </WithModal>
    </>
  )
}
