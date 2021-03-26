/* eslint-disable tsdoc/syntax */
import {
  IMessageBarProps,
  IMessageBarStyleProps,
  IMessageBarStyles,
  IStyleFunctionOrObject,
  MessageBarType
} from '@fluentui/react'
import { HTMLAttributes } from 'react'
import { IUserMessageProps } from './types'
import styles from './UserMessage.module.scss'

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

  const container: HTMLAttributes<HTMLDivElement> = {
    id: props.id,
    className: [styles.root, props.className].join(' '),
    style: props.containerStyle,
    hidden: props.hidden,
    onClick: props.onClick,
  }

  const message: IMessageBarProps = {
    styles: messageBarStyles,
        isMultiline: props.isMultiline,
        messageBarType,
        messageBarIconProps: props.iconName && { iconName: props.iconName },
        onDismiss: props.onDismiss,
        actions: props.actions
  }

  return {
    container,
    message
  }
}
