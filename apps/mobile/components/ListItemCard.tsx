import { Text } from 'react-native'

interface ListItemCardProps {
  text: string
}

export const ListItemCard = ({ text }: ListItemCardProps) => {
  return (
    <Text className="mb-4 rounded-lg border border-neutral-300 bg-neutral-200 p-4 text-3xl text-neutral-900 shadow shadow-black dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
      {text}
    </Text>
  )
}
