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
      className={`absolute top-0 left-0 right-0 bottom-0 bg-black/50 ${isModalVisible ? 'flex' : 'hidden'} items-center justify-center`}
    >
      <View
        className='w-96 aspect-square bg-fuchsia-50 dark:bg-neutral-700 rounded-lg p-4 gap-10'
      >
        <View className='flex-row items-center justify-between'>
          <Text className='text-2xl text-neutral-100'>{modalTitle}</Text>
          <TouchableOpacity
            onPress={closeModal}
            className='rounded-full aspect-square bg-neutral-800 w-8 h-8 items-center justify-center'
          >
            <Text className='text-2xl text-neutral-100'>X</Text>
          </TouchableOpacity>
        </View>
        {children}
      </View>
    </View>
  )
}
