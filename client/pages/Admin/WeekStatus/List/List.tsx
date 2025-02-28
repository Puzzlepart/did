import { TabComponent } from 'components/Tabs'
import React from 'react'
import { LockWeekButton } from '../LockWeekButton'
import { LockWeekMessage } from '../LockWeekMessage'
import { MissingSubmissionUser } from '../MissingSubmissionUser'
import { TeamsReminderButton } from '../TeamsReminderButton'
import styles from './List.module.scss'
import { IListProps } from './types'
import { useTranslation } from 'react-i18next'

export const List: TabComponent<IListProps> = (props) => {
  const { t } = useTranslation()
  if (props.users) {
    return (
      <div className={List.className}>
        {props.users.map((user, index) => (
          <MissingSubmissionUser key={index} user={user} />
        ))}
      </div>
    )
  }
  return (
    <div className={List.className}>
      <div className={styles.actions}>
        <TeamsReminderButton
          title={t(
            'admin.weekStatus.teamsReminderButtonTooltiop',
            props.period
          )}
          period={props.period}
          users={props.period.users}
          topic={t('admin.weekStatus.teamsReminderTopicTemplate', props.period)}
        />
        <LockWeekButton period={props.period} />
      </div>
      <LockWeekMessage period={props.period} />
      {props.period.users.map((user, index) => (
        <MissingSubmissionUser key={index} user={user} period={props.period} />
      ))}
    </div>
  )
}

List.displayName = 'MissingSubmissionsList'
List.className = styles.list
