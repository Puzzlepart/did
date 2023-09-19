import { UserMessage, UserMessageContainer } from 'components/UserMessage'
import React from 'react'
import { isMobile } from 'react-device-detect'
import FadeIn from 'react-fade-in'
import { StyledComponent } from 'types'
import _ from 'underscore'
import styles from './StatusBar.module.scss'
import { useStatusBar } from './useStatusBar'

/**
 * @category Timesheet
 */
export const StatusBar: StyledComponent = () => {
  const { className, messages } = useStatusBar()

  return (
    <FadeIn>
      <div className={className} hidden={_.isEmpty(messages)}>
        <div className={styles.container} hidden={_.isEmpty(messages)}>
          <UserMessageContainer height='auto' vertical={isMobile}>
            {messages.map((message, key) => (
              <UserMessage key={key} {...message} />
            ))}
          </UserMessageContainer>
        </div>
      </div>
    </FadeIn>
  )
}

StatusBar.displayName = 'Timesheet.StatusBar'
StatusBar.className = styles.statusBar
