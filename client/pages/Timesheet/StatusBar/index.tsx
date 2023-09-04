import { UserMessage, UserMessageContainer } from 'components/UserMessage'
import React, { FC } from 'react'
import { isMobile } from 'react-device-detect'
import FadeIn from 'react-fade-in'
import _ from 'underscore'
import styles from './StatusBar.module.scss'
import { useStatusBar } from './useStatusBar'

/**
 * @category Timesheet
 */
export const StatusBar: FC = () => {
  if (isMobile) styles.root += ` ${styles.mobile}`
  const messages = useStatusBar()

  return (
    <FadeIn>
      <div className={styles.root} hidden={_.isEmpty(messages)}>
        <div className={styles.container} hidden={_.isEmpty(messages)}>
          <UserMessageContainer height={65}>
            {messages.map((message, key) => (
              <UserMessage key={key} {...message} />
            ))}
          </UserMessageContainer>
        </div>
      </div>
    </FadeIn>
  )
}
