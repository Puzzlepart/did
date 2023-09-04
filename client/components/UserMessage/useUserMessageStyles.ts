import { makeStyles } from '@fluentui/react-components'
import { AlertProps } from '@fluentui/react-components/dist/unstable'
import { useAppContext } from 'AppContext'

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
  const { user } = useAppContext()
  const theme = user.theme[0]
  return makeStyles(() => ({
    root: {
      background: theme.semanticColors[`${intent}Background`],
      color: theme.semanticColors[`${intent}Text`]
    }
  }))()
}
