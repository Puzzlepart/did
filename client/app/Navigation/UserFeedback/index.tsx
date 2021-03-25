/* eslint-disable tsdoc/syntax */
import { Icon } from '@fluentui/react'
import { useToggle } from 'hooks'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { MenuItem } from '../UserMenu/MenuItem'
import { FeedbackPanel } from './FeedbackPanel'
import { IUserFeedbackProps } from './types'
import styles from './UserFeedback.module.scss'

/**
 * User feedback
 * 
 * Can be rendered as a `<MenuItem />` if `renderAsMenuItem`
 * is set to `true`.
 * 
 * An icon name is optional and defaults to **Emoji2**
 * 
 * @category Function Component
 */
export const UserFeedback: React.FC<IUserFeedbackProps> = ({ renderAsMenuItem, iconName = 'Emoji2' }) => {
  const { t } = useTranslation()
  const [isOpen, togglePanel] = useToggle(false)
  return (
    <>
      {renderAsMenuItem ?
        <MenuItem
          onClick={togglePanel}
          iconProps={{ iconName: 'Emoji2' }}
          text={t('feedback.mobileFeedbackText')} />
        : (
          <div className={styles.root} onClick={togglePanel}>
            <div className={styles.icon}>
              <Icon iconName={iconName} />
            </div>
          </div>
        )
      }
      <FeedbackPanel isOpen={isOpen} onDismiss={togglePanel} />
    </>
  )
}

export * from './FeedbackPanel'
