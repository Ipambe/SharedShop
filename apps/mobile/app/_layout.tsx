import { Tabs } from 'expo-router'
import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import './globals.css'

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            display: 'none'
          }
        }}
        initialRouteName='(public)'
      ></Tabs>
    </ClerkProvider>
  )
}
