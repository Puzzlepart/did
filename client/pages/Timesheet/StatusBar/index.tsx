/* eslint-disable tsdoc/syntax */
import { Progress } from 'components/Progress'
import { IUserMessageProps, UserMessage } from 'components/UserMessage'
import React from 'react'
import { isMobile } from 'react-device-detect'
import FadeIn from 'react-fade-in'
import _  from 'underscore'
import { useTimesheetContext } from '../context'
import styles from './StatusBar.module.scss'
import { useMessages } from './useMessages'

/**
 * @category Timesheet
 */
export const StatusBar: React.FC = () => {
  if (isMobile) styles.root += ` ${styles.mobile}`
  const { state } = useTimesheetContext()

  const defaultMessageProps: IUserMessageProps = {
    className: styles.message,
    fixedHeight: 65
  }

  const messages = useMessages()

  return (
    <FadeIn>
      <div className={styles.root} hidden={_.isEmpty(messages)}>
        {state.loading ? (
          <Progress {...state.loading} />
        ) : (
          <div className={styles.container} hidden={_.isEmpty(messages)}>
            {messages.map((message, key) => (
              <UserMessage key={key} {...defaultMessageProps} {...message} />
            ))}
          </div>
        )}
      </div>
    </FadeIn>
  )
}
