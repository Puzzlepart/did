/* eslint-disable tsdoc/syntax */
import React from 'react'
import { omit } from 'underscore'
import { UserMessage } from '../UserMessage'
import styles from './Toast.module.scss'
import { IToastProps } from './types'

/**
 * A Toast component that shows a `<MessageBar />` with
 * markdown using `react-markdown`
 *
 * @remarks Typically used with the `useToast` hook
 *
 * @category Function Component
 */
export const Toast: React.FC<IToastProps> = (props) => {
  if (!props.text) return null
  return (
    <div className={styles.root}>
      <UserMessage
        {...omit(props, 'hidden')}
        styles={{ root: { padding: '20px 25px' } }}
        className={styles.message}
        containerStyle={{ maxWidth: 550, lineHeight: 20 }}
      />
    </div>
  )
}

export * from './types'
export * from './useToast'
