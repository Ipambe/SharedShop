import { Text, View } from 'react-native'
import { Button } from 'tamagui'

interface ToggleModalButtonProps {
  showModal: () => void
}

export const ToggleModalButton = ({ showModal }: ToggleModalButtonProps) => {
  return (
    <Button
      animation='bouncy'
      onPress={showModal}
      background={'none'}
      pressStyle={{ scale: 0.95, backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
    >
      <View className='bg-blue-500 rounded-full p-4 aspect-square items-center justify-center'>
        <Text className='text-white text-4xl font-bold'>X</Text>
      </View>
    </Button>
  )
}
