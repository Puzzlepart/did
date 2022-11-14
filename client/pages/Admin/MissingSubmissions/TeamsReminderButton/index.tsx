import { ActionButton } from '@fluentui/react'
import { useAppContext } from 'AppContext'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { pick } from 'underscore'
import { startTeamsConversation } from './startTeamsConversation'
import { ITeamsReminderButtonProps } from './types'

export const TeamsReminderButton: FC<ITeamsReminderButtonProps> = (props) => {
  const { t } = useTranslation()
  const { subscription } = useAppContext()
  if (!subscription.settings?.teams?.enabled) return null
  return (
    <ActionButton
      text={t('admin.missingSubmissions.teamsReminderButtonText')}
      iconProps={{ iconName: 'TeamsLogo' }}
      onClick={() => startTeamsConversation(props, t)}
      {...pick(props, 'title', 'text')}
    />
  )
}
