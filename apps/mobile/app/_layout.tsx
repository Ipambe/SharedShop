import { Tabs } from 'expo-router'
import { useEffect } from 'react'
import { getItemAsync } from 'expo-secure-store'
import { useStore } from '@/stores'
import { StatusBar } from 'expo-status-bar'
import './globals.css'

export default function RootLayout() {
  const { token, setToken } = useStore()
  useEffect(() => {
    const checkToken = async () => {
      const token = await getItemAsync('token')
      setToken(token || null)
    }
    checkToken()
  }, [setToken])

  return (
    <>
      <StatusBar style='dark' />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            display: 'none'
          }
        }}
      >
        <Tabs.Protected guard={!!token}>
          <Tabs.Screen name='index' />
          <Tabs.Screen name='create' />
        </Tabs.Protected>
        <Tabs.Protected guard={!token}>
          <Tabs.Screen name='register' />
        </Tabs.Protected>
      </Tabs>
    </>
  )
}
