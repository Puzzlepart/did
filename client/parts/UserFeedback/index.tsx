/* eslint-disable tsdoc/syntax */
import { useToggle } from 'hooks'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import { getFluentIcon as icon } from 'utils/getFluentIcon'
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
export const UserFeedback: StyledComponent<IUserFeedbackProps> = ({
  renderAsMenuItem
}) => {
  const { t } = useTranslation()
  const [isOpen, togglePanel] = useToggle(false)
  return (
    <>
      {renderAsMenuItem ? (
        <MenuItem
          onClick={togglePanel}
          icon={icon('Emoji')}
          text={t('feedback.mobileFeedbackText')}
        />
      ) : (
        <div className={UserFeedback.className} onClick={togglePanel}>
          <div className={styles.icon}>{icon('Emoji')}</div>
        </div>
      )}
      <FeedbackPanel
        isOpen={isOpen}
        onDismiss={() => {
          if (isOpen) togglePanel()
        }}
      />
    </>
  )
}

UserFeedback.displayName = 'UserFeedback'
UserFeedback.className = styles.userFeedback

export * from './FeedbackPanel'
