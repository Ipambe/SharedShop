import React, { useCallback } from 'react'
import * as WebBrowser from 'expo-web-browser'
import * as AuthSession from 'expo-auth-session'
import { View, TouchableOpacity, Text } from 'react-native'
import { useAuth, useSSO } from '@clerk/clerk-expo'
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser'

WebBrowser.maybeCompleteAuthSession()

export default function Index() {
  useWarmUpBrowser()

  const { startSSOFlow } = useSSO()
  const { signOut } = useAuth()

  const signInHandler = useCallback(
    async (strategy: OAuthStrategy) => {
      try {
        const { createdSessionId, setActive } = await startSSOFlow({
          strategy,
          redirectUrl: AuthSession.makeRedirectUri()
        })

        if (!createdSessionId) return await signOut()
        setActive!({ session: createdSessionId })
      } catch (err) {
        console.error(JSON.stringify(err, null, 2))
      }
    },
    [startSSOFlow, signOut]
  )

  return (
    <View className='flex-1 items-center justify-center bg-black'>
      <TouchableOpacity
        onPress={() => signInHandler('oauth_google')}
        className='bg-cyan-600 p-4 rounded shadow-md'
      >
        <Text>Sign in with Google SSO</Text>
      </TouchableOpacity>
    </View>
  )
}
type OAuthProvider = 'google' | 'github' | 'discord'

type OAuthStrategy = `oauth_${OAuthProvider}`
