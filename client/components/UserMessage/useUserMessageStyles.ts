/* eslint-disable tsdoc/syntax */
import { makeStyles } from '@fluentui/react'
import { UserMessageType } from './types'

/**
 * @category UserMessage
 */
export function useUserMessageStyles(type: UserMessageType) {
  return makeStyles(theme => ({
    root: {
      background: theme.semanticColors[`${type}Background`],
      color: theme.semanticColors[`${type}Text`]
    },
  }))()
}
