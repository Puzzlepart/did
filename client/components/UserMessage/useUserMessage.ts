/* eslint-disable tsdoc/syntax */
import { MessageBarType } from '@fluentui/react'
import { IUserMessageProps } from './types'

/**
 * A component that supports a `<MessageBar />` with
 * markdown using `react-markdown`.
 *
 * @category Function Component
 */
export function useUserMessage(props: IUserMessageProps) {
  const messageBarType = MessageBarType[props.type] || MessageBarType.info
  return {
    messageBarType
  }
}
