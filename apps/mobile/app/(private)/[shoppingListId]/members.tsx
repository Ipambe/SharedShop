import { api } from '@/api'
import { ListItemCard } from '@/components/ListItemCard'
import { WithDarkModeBackground } from '@/components/WithDarkModeBackground'
import { useShoppingListStore } from '@/stores/store'
import { useAuth } from '@clerk/clerk-expo'
import { useLocalSearchParams } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'
import { setStringAsync } from 'expo-clipboard'

export default function Members() {
  const { members } = useShoppingListStore((state) => state.shoppingList)
  const { shoppingListId } = useLocalSearchParams()
  const { getToken } = useAuth()

  const shareListHandler = async () => {
    const token = await getToken()

    const { data } = await api.get(
      `shopping-lists/${shoppingListId}/invitations`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    await setStringAsync(data.url)
    alert('Enlace copiado al portapapeles')
  }

  return (
    <WithDarkModeBackground className="p-4">
      <View className="mb-8 flex-row items-center justify-between">
        <Text className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
          Miembros de la lista de compras
        </Text>
        <TouchableOpacity onPress={shareListHandler}>
          <Text className="text-sm font-semibold text-blue-500 dark:text-blue-400">
            Compartir lista
          </Text>
        </TouchableOpacity>
      </View>
      {members.map((member) => (
        <ListItemCard key={member.user.id} text={member.user.username} />
      ))}
    </WithDarkModeBackground>
  )
}
