/* eslint-disable tsdoc/syntax */
import { UserMessage } from 'components/UserMessage'
import React, { FunctionComponent } from 'react'
import FadeIn from 'react-fade-in'
import styles from './Toast.module.scss'
import { IToastProps } from './types'

/**
 * A component that supports a MessageBar with markdown using react-markdown
 *
 * @category Function Component
 */
export const Toast: FunctionComponent<IToastProps> = (
  props: IToastProps
) => {
  return (
    <FadeIn
      transitionDuration={1000}
      delay={750}
      className={styles.root}>
      <UserMessage
        {...props}
        styles={{ root: { padding: '20px 25px' } }}
        className={styles.message} />
    </FadeIn>
  )
}