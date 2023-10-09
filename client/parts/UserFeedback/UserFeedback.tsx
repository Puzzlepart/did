/* eslint-disable tsdoc/syntax */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import { useBoolean } from 'usehooks-ts'
import { getFluentIcon as icon } from 'utils/getFluentIcon'
import { MenuItem } from '../UserMenu/MenuItem'
import { FeedbackPanel } from './FeedbackPanel'
import styles from './UserFeedback.module.scss'
import { IUserFeedbackProps } from './types'

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
  const panelState = useBoolean(false)
  return (
    <>
      {renderAsMenuItem ? (
        <MenuItem
          onClick={panelState.setTrue}
          icon={icon('Emoji')}
          text={t('feedback.mobileFeedbackText')}
        />
      ) : (
        <div className={UserFeedback.className} onClick={panelState.setTrue}>
          <div className={styles.icon}>{icon('Emoji')}</div>
        </div>
      )}
      <FeedbackPanel open={panelState.value} onDismiss={panelState.setFalse} />
    </>
  )
}

UserFeedback.displayName = 'UserFeedback'
UserFeedback.className = styles.userFeedback
