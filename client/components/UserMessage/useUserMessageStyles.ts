/* eslint-disable tsdoc/syntax */
import { makeStyles } from '@fluentui/react'
import { UserMessageType } from './types'

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
export function useUserMessageStyles(type: UserMessageType = 'info') {
  return makeStyles(theme => ({
    root: {
      background: theme.semanticColors[`${type}Background`],
      color: theme.semanticColors[`${type}Text`]
    },
  }))()
}
