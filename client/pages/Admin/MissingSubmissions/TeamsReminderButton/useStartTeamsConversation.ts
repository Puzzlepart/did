import { format } from '@fluentui/react'
import { useSubscriptionSettings } from 'AppContext'
import { useTranslation } from 'react-i18next'
import { SubscriptionTeamsSettings } from 'types'
import { first } from 'underscore'
import { createTeamsConversationLink } from 'utils/createTeamsConversationLink'
import { ITeamsReminderButtonProps } from './types'

/**
 * Hook that returns a function to start a Teams conversation with the given users, period, and topic.
 * 
 * If the message templates is set in the subscription settings, it will be used instead of the default messages
 * specified in the translation files.
 *
 * @param props - The props containing the users, period, and topic.
 *
 * @returns An object containing the function to start the Teams conversation.
 */
export function useStartTeamsConversation({ users, period, topic }: ITeamsReminderButtonProps) {
  const { t } = useTranslation()
  const teamsSettings = useSubscriptionSettings<SubscriptionTeamsSettings>('teams')
  const startTeamsConversation = () => {
    let message = t(
      'admin.missingSubmissions.teamsReminderMessageSinglePeriodTemplate',
      { period: period?.name }
    )
    if(teamsSettings?.missingSubmissionsSinglePeriodText) {
      message = format(teamsSettings.missingSubmissionsSinglePeriodText, period?.name)
    }
    if (first(users).periods) {
      const periods = first(users).periods.map((p) => p.name).join(', ')
      message = t('admin.missingSubmissions.teamsReminderMessageTemplate', {
        periods
      })
      if(teamsSettings?.missingSubmissionsMultiplePeriodsText) {
        message = format(teamsSettings.missingSubmissionsMultiplePeriodsText, periods)
      }
    }
    const url = createTeamsConversationLink(
      users.map((u) => u.email).filter(Boolean),
      message,
      topic
    )
    window.open(url, '_blank')
  }
  return { startTeamsConversation }
}
