import { Progress } from 'components/Progress'
import { IUserMessageProps, UserMessage } from 'components/UserMessage'
import React, { FunctionComponent, useContext } from 'react'
import { isMobile } from 'react-device-detect'
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

  if (loading) {
    return <Progress {...loading} />
  }

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        {messages.map((msg, key) => (
          <UserMessage key={key} {...defaultMessageProps} {...msg} />
        ))}
      </div>
    </div>
  )
}
