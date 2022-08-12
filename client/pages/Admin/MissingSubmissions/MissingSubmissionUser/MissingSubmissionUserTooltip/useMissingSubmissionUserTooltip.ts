import { useTranslation } from 'react-i18next'
import { createTeamsConversationLink } from 'utils/createTeamsConversationLink'
import { IMissingSubmissionUserTooltipProps } from './types'

export function useMissingSubmissionUserTooltip({
  user,
  period
}: IMissingSubmissionUserTooltipProps) {
  const { t } = useTranslation()

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const onNotifyTeams = () => {
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

  return { onNotifyTeams } as const
}
