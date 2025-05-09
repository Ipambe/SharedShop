import { useAuth } from '@clerk/clerk-expo'
import { Redirect, Tabs } from 'expo-router'

export default function PublicLayout() {
  const { isSignedIn, isLoaded } = useAuth()

  if (!isLoaded) return null

  if (isSignedIn) return <Redirect href='/(private)' />

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: 'none'
        }
      }}
      backBehavior='none'
    />
  )
}
