import { MessageBarProps } from '@fluentui/react-components'
import { CSSProperties } from 'react'
import { useAppContext } from 'AppContext'

/**
 * Get `background` and `color` styles for `UserMessage` based on
 * the provided `intent`. We use colors from `semanticColors` in
 * the legacy theme.
 *
 * In Fluent UI v9, we only apply custom colors if semanticColors are available,
 * otherwise we let MessageBar handle the intent styling natively.
 *
 * @category UserMessage
 */
export function useUserMessageStyles(
  intent: MessageBarProps['intent']
): CSSProperties {
  const { user } = useAppContext()
  const semanticColors = user?.theme?.legacyTheme?.semanticColors

  // Only apply custom styling if semanticColors are explicitly defined
  // Otherwise, let MessageBar use its native v9 intent styling
  if (semanticColors && intent) {
    const background = semanticColors[`${intent}Background`]
    const color = semanticColors[`${intent}Text`]

    // Only return styles if both background and color are defined
    if (background && color) {
      return { background, color }
    }
  }

  // Return empty object to let MessageBar use native styling
  return {}
}
