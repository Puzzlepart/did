/* eslint-disable tsdoc/syntax */
import { Icon } from 'office-ui-fabric-react'
import React, { useState } from 'react'
import { FeedbackPanel } from './FeedbackPanel'
import styles from './UserFeedback.module.scss'

/**
 * @category Function Component
 */
export const UserFeedback: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className={styles.root} >
      <a onClick={() => setIsOpen(true)}>
        <div className={styles.icon}>
          <Icon iconName='Emoji2' />
        </div>
      </a>
      <FeedbackPanel
        isOpen={isOpen}
        onDismiss={() => setIsOpen(false)} />
    </div>
  )
}

export * from './FeedbackPanel'
