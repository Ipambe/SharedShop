import { api } from '@/api'
import { User } from '@/types'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { Redirect, Tabs } from 'expo-router'
import { useEffect } from 'react'

export default function PrivateLayout() {
  const { isSignedIn, isLoaded, getToken, signOut } = useAuth()
  const { user } = useUser()

  useEffect(() => {
    const checkOrCreateUser = async () => {
      if (!isSignedIn) return console.error('User is not signed in')

      const token = await getToken()
      if (!token) return console.error('Token is not available')

      const { status } = await api.post<User>(
        'users',
        {
          id: user?.id,
          username: user?.firstName
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      if (status > 400) return await signOut()
    }
    checkOrCreateUser()
  }, [signOut, user, getToken, isSignedIn])

  if (!isLoaded) return null

  if (!isSignedIn) return <Redirect href='/(public)' />

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: 'none'
        }
      }}
    />
  )
}
