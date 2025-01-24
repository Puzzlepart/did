import { TabComponent } from 'components/Tabs'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { MissingSubmissionUser } from '../MissingSubmissionUser'
import { TeamsReminderButton } from '../TeamsReminderButton'
import { IListProps } from './types'
import styles from './List.module.scss'
import { LockWeekButton } from '../LockWeekButton'

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
      <div className={styles.actions}>
        <TeamsReminderButton
          title={t('admin.weekStatus.teamsReminderButtonTooltiop', period)}
          period={period}
          users={period.users}
          topic={t('admin.weekStatus.teamsReminderTopicTemplate', period)}
        />
        <LockWeekButton period={period} />
      </div>
      {period.users.map((user, index) => (
        <MissingSubmissionUser key={index} user={user} period={period} />
      ))}
    </div>
  )
}

List.displayName = 'MissingSubmissionsList'
List.className = styles.list
