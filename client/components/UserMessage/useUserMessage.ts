/* eslint-disable tsdoc/syntax */
import {
  IMessageBarStyleProps,
  IMessageBarStyles,
  IStyleFunctionOrObject,
  MessageBarType
} from '@fluentui/react'
import { IUserMessageProps } from './types'

/**
 * A component that supports a `<MessageBar />` with
 * markdown using `react-markdown`.
 *
 * @category Function Component
 */
export function useUserMessage(props: IUserMessageProps) {
  const messageBarStyles: IStyleFunctionOrObject<
    IMessageBarStyleProps,
    IMessageBarStyles
  > = props.styles || {}

  const messageBarType = MessageBarType[props.type] || MessageBarType.info

  if (props.fixedHeight) {
    messageBarStyles['root'] = {
      ...messageBarStyles['root'],
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: props.fixedHeight
    }
  }

  return {
    messageBarStyles,
    messageBarType
  }
}
