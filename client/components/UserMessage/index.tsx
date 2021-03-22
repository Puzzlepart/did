/* eslint-disable tsdoc/syntax */
import {
  IMessageBarStyleProps,
  IMessageBarStyles,
  IStyleFunctionOrObject,
  MessageBar
} from 'office-ui-fabric-react'
import React from 'react'
import ReactMarkdown from 'react-markdown/with-html'
import { IUserMessageProps } from './types'
import styles from './UserMessage.module.scss'

/**
 * A component that supports a `<MessageBar />` with
 * markdown using `react-markdown`.
 *
 * @category Function Component
 */
export const UserMessage: React.FC<IUserMessageProps> = (props) => {
  const _styles: IStyleFunctionOrObject<
    IMessageBarStyleProps,
    IMessageBarStyles
  > = props.styles || {}

  if (props.fixedCenter) {
    _styles['root'] = {
      ..._styles['root'],
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: props.fixedCenter
    }
  }

  return (
    <div
      id={props.id}
      className={`${styles.root} ${props.className}`}
      style={props.containerStyle}
      hidden={props.hidden}
      onClick={props.onClick}>
      <MessageBar
        styles={_styles}
        isMultiline={props.isMultiline}
        messageBarType={props.type}
        messageBarIconProps={props.iconName && { iconName: props.iconName }}
        onDismiss={props.onDismiss}
        actions={props.actions}>
        {props.text && <ReactMarkdown source={props.text} escapeHtml={false} />}
        {props.children && props.children}
      </MessageBar>
    </div>
  )
}

export * from './types'
export * from './useMessage'
