import { makeStyles } from '@fluentui/react'
import { AlertProps } from '@fluentui/react-components/dist/unstable'

/**
 * We use `makeStyles` to get our `background` and `color`
 * styles.
 *
 * `theme.semanticColors` contains variables for all types of
 * messages in the format `successText`, `successIcon` and
 * `successBackground`. We dynamically get these variables (colors)
 * with our type (`UserMessageType`)
 *
 * @category UserMessage
 */
export function useUserMessageStyles(intent: AlertProps['intent'] = 'info') {
  return makeStyles((theme) => ({
    root: {
      background: theme.semanticColors[`${intent}Background`],
      color: theme.semanticColors[`${intent}Text`]
    }
  }))()
}
