import { useTranslation } from 'react-i18next'
import { first } from 'underscore'
import { createTeamsConversationLink } from 'utils/createTeamsConversationLink'
import { ITeamsReminderButtonProps } from './types'

/**
 * Hook that returns a function to start a Teams conversation with the given users, period, and topic.
 *
 * @param props - The props containing the users, period, and topic.
 *
 * @returns An object containing the function to start the Teams conversation.
 */
export function useStartTeamsConversation(props: ITeamsReminderButtonProps) {
  const { t } = useTranslation()
  const startTeamsConversation = () => {
    const { users, period, topic } = props
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
  return { startTeamsConversation }
}
