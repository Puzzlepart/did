import { IUserMessageProps, UserMessage } from 'components/UserMessage'
import React, { FC } from 'react'
import { isMobile } from 'react-device-detect'
import FadeIn from 'react-fade-in'
import _ from 'underscore'
import styles from './StatusBar.module.scss'
import { useMessages } from './useMessages'

/**
 * @category Timesheet
 */
export const StatusBar: FC = () => {
  if (isMobile) styles.root += ` ${styles.mobile}`

  const defaultMessageProps: IUserMessageProps = {
    className: styles.message,
    fixedHeight: 65
  }

  const messages = useMessages()

  return (
    <FadeIn>
      <div className={styles.root} hidden={_.isEmpty(messages)}>
        <div className={styles.container} hidden={_.isEmpty(messages)}>
          {messages.map((message, key) => (
            <UserMessage key={key} {...defaultMessageProps} {...message} />
          ))}
        </div>
      </div>
    </FadeIn>
  )
}
