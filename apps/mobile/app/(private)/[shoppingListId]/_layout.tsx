import { Tabs } from 'expo-router'

export default function ShoppingListLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name='index' options={{ title: 'Shopping List' }} />
      <Tabs.Screen name='products' options={{ title: 'Products' }} />
      <Tabs.Screen name='members' options={{ title: 'Members' }} />
    </Tabs>
  )
}
