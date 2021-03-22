/* eslint-disable tsdoc/syntax */
import { Progress } from 'components/Progress'
import { IUserMessageProps, UserMessage } from 'components/UserMessage'
import React from 'react'
import { isMobile } from 'react-device-detect'
import FadeIn from 'react-fade-in'
import { isEmpty } from 'underscore'
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
    fixedCenter: 65,
    containerStyle: {}
  }

  const messages = useMessages()

  return (
    <FadeIn>
      <div className={styles.root} hidden={isEmpty(messages)}>
        {state.loading ? (
          <Progress {...state.loading} />
        ) : (
          <div className={styles.container} hidden={isEmpty(messages)}>
            {messages.map((message, key) => (
              <UserMessage key={key} {...defaultMessageProps} {...message} />
            ))}
          </div>
        )}
      </div>
    </FadeIn>
  )
}
