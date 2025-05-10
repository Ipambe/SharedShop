import { Tabs } from 'expo-router'
import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { TamaguiProvider } from 'tamagui'

import './globals.css'
import { config } from '@/tamagui.config'

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <TamaguiProvider config={config}>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              display: 'none'
            }
          }}
          initialRouteName='(public)'
        ></Tabs>
      </TamaguiProvider>
    </ClerkProvider>
  )
}
