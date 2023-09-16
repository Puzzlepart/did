import { ReusableComponent } from 'components/types'
import React from 'react'
import _ from 'underscore'
import { UserMessage } from '../UserMessage'
import styles from './Toast.module.scss'
import { IToastProps } from './types'

/**
 * A Toast component that shows a `<UserMessage />` with
 * markdown using `react-markdown`
 *
 * @remarks Typically used with the `useToast` hook
 *
 * @category Reusable Component
 */
export const Toast: ReusableComponent<IToastProps> = (props) => {
  if (!props.text) return null
  return (
    <div className={Toast.className}>
      <UserMessage {..._.omit(props, 'hidden')} className={styles.message} />
    </div>
  )
}

Toast.displayName = 'Toast'
Toast.className = styles.toast
