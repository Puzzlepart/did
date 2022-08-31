import { TFunction } from 'react-i18next'
import { first } from 'underscore'
import { createTeamsConversationLink } from 'utils/createTeamsConversationLink'
import { ITeamsReminderButtonProps } from './types'

export const startTeamsConversation = (
  { users, period, topic }: ITeamsReminderButtonProps,
  t: TFunction
) => {
  let message = t(
    'admin.missingSubmissions.teamsReminderMessageSinglePeriodTemplate',
    { period: period?.name }
  )
  if (first(users).periods) {
    message = t('admin.missingSubmissions.teamsReminderMessageTemplate', {
      periods: first(users)
        .periods.map((p) => p.name)
        .join(', ')
    })
  }
  const url = createTeamsConversationLink(
    users.map((u) => u.email).filter(Boolean),
    message,
    topic
  )
  window.open(url, '_blank')
}
