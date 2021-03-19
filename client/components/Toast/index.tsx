/* eslint-disable tsdoc/syntax */
import React, { FunctionComponent } from 'react'
import { omit } from 'underscore'
import { UserMessage } from '../UserMessage'
import styles from './Toast.module.scss'
import { IToastProps } from './types'

/**
 * A Toast component that shows a MessageBar with
 * markdown using `react-markdown`
 *
 * @remarks Typically used with the `useToast` hook
 *
 * @category Function Component
 */
export const Toast: FunctionComponent<IToastProps> = (props: IToastProps) => {
  const classNames = [styles.root]
  if (props.hidden) classNames.push(styles.fadeOut)
  return (
    <div className={classNames.join(' ')}>
      <UserMessage
        {...omit(props, 'hidden')}
        styles={{ root: { padding: '20px 25px' } }}
        className={styles.message}
        containerStyle={{ maxWidth: 550, lineHeight: 20 }}
      />
    </div>
  )
}
