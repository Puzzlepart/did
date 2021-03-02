import { Progress } from 'components/Progress'
import { IUserMessageProps, UserMessage } from 'components/UserMessage'
import React, { FunctionComponent, useContext } from 'react'
import { isMobile } from 'react-device-detect'
import FadeIn from 'react-fade-in'
import { TimesheetContext } from '../context'
import styles from './StatusBar.module.scss'
import { useMessages } from './useMessages'

export const StatusBar: FunctionComponent = () => {
  if (isMobile) styles.root += ` ${styles.mobile}`
  const { loading } = useContext(TimesheetContext)

  const defaultMessageProps: IUserMessageProps = {
    className: styles.message,
    fixedCenter: 65,
    containerStyle: {}
  }

  const messages = useMessages()

  return (
    <FadeIn>
      <div className={styles.root}>
        {loading ? (
          <Progress {...loading} />
        ) : (
          <div className={styles.container}>
            {messages.map((message, key) => (
              <UserMessage key={key} {...defaultMessageProps} {...message} />
            ))}
          </div>
        )}
      </div>
    </FadeIn>
  )
}
