import { AlertProps } from '@fluentui/react-components/unstable'
import { useAppContext } from 'AppContext'

/**
 * Get `background` and `color` styles for `UserMessage` based on
 * the provided `intent`. We use colors from `semanticColors` in 
 * the legacy theme.
 *
 * @category UserMessage
 */
export function useUserMessageStyles(intent: AlertProps['intent']) {
  const { user } = useAppContext()
  const semanticColors = user.theme.legacyTheme?.semanticColors ?? {}
  return {
    background: semanticColors[`${intent}Background`],
    color: semanticColors[`${intent}Text`]
  }
}
