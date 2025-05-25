import { View } from 'react-native'

interface WithDarkModeProps {
  children: React.ReactNode
  className?: string
  props?: any
}

export const WithDarkModeBackground = ({
  children,
  className,
  props
}: WithDarkModeProps) => {
  return (
    <View
      className={`flex-1 bg-neutral-50 dark:bg-neutral-950 mt-safe ${className}`}
      {...props}
    >
      {children}
    </View>
  )
}
