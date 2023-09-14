import { TabComponent } from 'components/Tabs'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { MissingSubmissionUser } from '../MissingSubmissionUser'
import { TeamsReminderButton } from '../TeamsReminderButton'
import styles from './List.module.scss'
import { IListProps } from './types'

export const List: TabComponent<IListProps> = ({ users, period }) => {
  const { t } = useTranslation()
  if (users) {
    return (
      <div className={List.className}>
        {users.map((user, index) => (
          <MissingSubmissionUser key={index} user={user} />
        ))}
      </div>
    )
  }
  return (
    <div className={List.className}>
      <TeamsReminderButton
        title={t(
          'admin.missingSubmissions.teamsReminderButtonTooltiop',
          period
        )}
        period={period}
        users={period.users}
        topic={t('admin.missingSubmissions.teamsReminderTopicTemplate', period)}
      />
      {period.users.map((user, index) => (
        <MissingSubmissionUser key={index} user={user} period={period} />
      ))}
    </div>
  )
}

List.displayName = 'MissingSubmissionsList'
List.className = styles.list
