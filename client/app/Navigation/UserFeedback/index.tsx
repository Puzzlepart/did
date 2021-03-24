/* eslint-disable tsdoc/syntax */
import { Icon } from 'office-ui-fabric-react'
import React from 'react'
import { FeedbackPanel } from './FeedbackPanel'
import styles from './UserFeedback.module.scss'

/**
 * @category Function Component
 */
export const UserFeedback: React.FC = () => {
  return (
    <div className={styles.root} >
      <a>
        <div className={styles.icon}>
          <Icon iconName='Ringer' />
        </div>
      </a>
      <FeedbackPanel />
    </div>
  )
}

export * from './FeedbackPanel'
