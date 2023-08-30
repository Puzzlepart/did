import { HTMLAttributes } from 'react'
import styles from './UserMessage.module.scss'
import { IUserMessageProps } from './types'
import _ from 'lodash'

/**
 * A component that supports a `<MessageBar />` with
 * markdown using `react-markdown`.
 *
 * @category Function Component
 */
export function useUserMessage(props: IUserMessageProps) {
  const container: HTMLAttributes<HTMLDivElement> = {
    id: props.id,
    className: [styles.root, props.className].join(' '),
    style: props.containerStyle,
    hidden: props.hidden,
    onClick: props.onClick
  }
  
  const className = [styles.root, !_.isEmpty(props.actions) && styles.hasActions].filter(Boolean).join(' ')

  return {
    className,
    container
  }
}
