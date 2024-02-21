/* eslint-disable tsdoc/syntax */
import { Panel, PanelComponent } from 'components/Panel'
import { UserMessage, UserMessageContainer } from 'components/UserMessage'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import _ from 'underscore'
import { UserNotificationsContext } from '../context'
import { UserNotification } from './UserNotification'

/**
 * @category Function Component
 */
export const NotificationsPanel: PanelComponent = (props) => {
  const { t } = useTranslation()
  const context = useContext(UserNotificationsContext)
  return (
    <Panel {...props} title={t('notifications.headerText')}>
      <div hidden={!_.isEmpty(context.notifications)}>
        <UserMessage
          text={t('notifications.emptyText', context)}
          action={
            context.dismissedCount > 0 && {
              text: t('notifications.clearDismissedText'),
              iconName: 'ArrowUndo',
              onClick: context.clearDismissed
            }
          }
        />
      </div>
      <UserMessageContainer vertical gap={20} margin='20px 0 0 0'>
        {...context.notifications.map((n, index) => (
          <UserNotification key={index} model={n} />
        ))}
      </UserMessageContainer>
    </Panel>
  )
}

NotificationsPanel.displayName = 'NotificationsPanel'
