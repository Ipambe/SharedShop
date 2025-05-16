import { ListItemCard } from '@/components/ListItemCard'
import { WithDarkModeBackground } from '@/components/WithDarkModeBackground'
import { useShoppingListStore } from '@/stores/store'
import { Text } from 'react-native'

export default function Members() {
  const { members } = useShoppingListStore((state) => state.shoppingList)
  return (
    <WithDarkModeBackground className="p-4">
      <Text className="mb-8 text-xl font-bold text-neutral-900 dark:text-neutral-100">
        Miembros de la lista de compras
      </Text>
      {members.map((member) => (
        <ListItemCard key={member.user.id} text={member.user.username} />
      ))}
    </WithDarkModeBackground>
  )
}
