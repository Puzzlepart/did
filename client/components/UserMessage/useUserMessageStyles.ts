import { MessageBarProps } from '@fluentui/react-components'
import { CSSProperties } from 'react'

/**
 * Get `background` and `color` styles for `UserMessage` based on
 * the provided `intent`. In Fluent UI v9, MessageBar handles intent
 * styling natively, so we return an empty object.
 *
 * @category UserMessage
 */
export function useUserMessageStyles(
  _intent: MessageBarProps['intent']
): CSSProperties {
  // Return empty object to let MessageBar use native v9 intent styling
  return {}
}
