/* eslint-disable tsdoc/syntax */
import { useToggle } from 'hooks'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { getFluentIcon } from 'utils'
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
export const UserFeedback: FC<IUserFeedbackProps> = ({ renderAsMenuItem }) => {
  const { t } = useTranslation()
  const [isOpen, togglePanel] = useToggle(false)
  return (
    <>
      {renderAsMenuItem ? (
        <MenuItem
          onClick={togglePanel}
          icon={getFluentIcon('Emoji')}
          text={t('feedback.mobileFeedbackText')}
        />
      ) : (
        <div className={styles.root} onClick={togglePanel}>
          <div className={styles.icon}>{getFluentIcon('Emoji')}</div>
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

export * from './FeedbackPanel'
