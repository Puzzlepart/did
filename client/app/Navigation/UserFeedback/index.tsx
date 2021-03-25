/* eslint-disable tsdoc/syntax */
import { Icon } from '@fluentui/react'
import React, { useState } from 'react'
import { isMobile } from 'react-device-detect'
import { FeedbackPanel } from './FeedbackPanel'
import styles from './UserFeedback.module.scss'

/**
 * @category Function Component
 */
export const UserFeedback: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className={styles.root} onClick={() => setIsOpen(true)} hidden={isMobile}>
      <a>
        <div className={styles.icon}>
          <Icon iconName='Emoji2' />
        </div>
      </a>
      <FeedbackPanel isOpen={isOpen} onDismiss={() => setIsOpen(false)} />
    </div>
  )
}

export * from './FeedbackPanel'
