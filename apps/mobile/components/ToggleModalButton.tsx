import { Text } from 'react-native'
import { Button } from 'tamagui'

interface ToggleModalButtonProps {
  showModal: () => void
}

export const ToggleModalButton = ({ showModal }: ToggleModalButtonProps) => {
  return (
    <Button
      animation="bouncy"
      onPress={showModal}
      backgroundColor="#333"
      position="absolute"
      bottom={20}
      right={20}
      borderRadius={100}
      width={70}
      height={70}
      zIndex={20}
      justifyContent="center"
      alignItems="center"
      pressStyle={{
        backgroundColor: '#444',
        scale: 2.95
      }}
    >
      <Text className="text-6xl font-bold text-white">+</Text>
    </Button>
  )
}
