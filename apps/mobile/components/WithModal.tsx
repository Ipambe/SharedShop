import { Text, TouchableOpacity, View } from 'react-native'

interface WithModalProps {
  isModalVisible: boolean
  closeModal: () => void
  modalTitle: string
  children?: React.ReactNode
}

export const WithModal = ({
  isModalVisible,
  closeModal,
  modalTitle,
  children
}: WithModalProps) => {
  return (
    <View
      className={`absolute bottom-0 left-0 right-0 top-0 z-50 bg-black/50 ${isModalVisible ? 'flex' : 'hidden'} items-center justify-center`}
    >
      <View className="w-[80%] gap-10 rounded-lg bg-fuchsia-50 px-4 pb-10 pt-4 dark:bg-neutral-700">
        <View className="flex-row items-center justify-between">
          <Text className="text-2xl text-neutral-100">{modalTitle}</Text>
          <TouchableOpacity
            onPress={closeModal}
            className="aspect-square h-8 w-8 items-center justify-center rounded-full bg-neutral-800"
          >
            <Text className="text-2xl text-neutral-100">X</Text>
          </TouchableOpacity>
        </View>
        {children}
      </View>
    </View>
  )
}
