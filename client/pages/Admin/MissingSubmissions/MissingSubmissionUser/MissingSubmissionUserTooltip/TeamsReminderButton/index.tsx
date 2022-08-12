/* eslint-disable tsdoc/syntax */
import { ActionButton } from '@fluentui/react'
import { useAppContext } from 'AppContext'
import React from 'react'
import { TFunction, useTranslation } from 'react-i18next'
import { createTeamsConversationLink } from 'utils/createTeamsConversationLink'
import { ITeamsReminderButtonProps } from './types'

const onNotifyTeams = (
  { user, period }: ITeamsReminderButtonProps,
  t: TFunction
) => {
  let message = t(
    'admin.missingSubmissions.teamsReminderMessageSinglePeriodTemplate',
    { period: period?.name }
  )
  if (user.periods) {
    message = t('admin.missingSubmissions.teamsReminderMessageTemplate', {
      periods: user.periods.map((p) => p.name).join(', ')
    })
  }
  const url = createTeamsConversationLink([user.email], message)
  window.open(url, '_blank')
}

export const TeamsReminderButton: React.FC<ITeamsReminderButtonProps> = (
  props
) => {
  const { t } = useTranslation()
  const { subscription } = useAppContext()
  if (!subscription.settings?.teams?.enabled) return null
  return (
    <ActionButton
      text={t('admin.missingSubmissions.teamsReminderButtonText')}
      iconProps={{ iconName: 'TeamsLogo' }}
      onClick={() => onNotifyTeams(props, t)}
    />
  )
}
