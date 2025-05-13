import { Tabs } from 'expo-router'
import { StatusBar } from 'react-native'
import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { TamaguiProvider } from 'tamagui'

import './globals.css'
import { config } from '@/tamagui.config'

export default function RootLayout() {
  return (
    <>
      <ClerkProvider tokenCache={tokenCache}>
        <TamaguiProvider config={config}>
          <Tabs
            screenOptions={{
              headerShown: false,
              tabBarStyle: {
                display: 'none'
              }
            }}
          ></Tabs>
        </TamaguiProvider>
      </ClerkProvider>
      <StatusBar
        className='bg-neutral-300 dark:bg-neutral-950'
        backgroundColor='transparent'
      />
    </>
  )
}
