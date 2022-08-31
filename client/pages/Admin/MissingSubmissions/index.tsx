/* eslint-disable tsdoc/syntax */
import { Pivot, PivotItem } from '@fluentui/react'
import { TabComponent } from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './MissingSubmissions.module.scss'
import { MissingSubmissionUser } from './MissingSubmissionUser'
import { TeamsReminderButton } from './TeamsReminderButton'
import { useMissingSubmissions } from './useMissingSubmissions'

export const MissingSubmissions: TabComponent = () => {
  const { t } = useTranslation()
  const { periods, users } = useMissingSubmissions()
  return (
    <div className={styles.root}>
      <Pivot defaultSelectedKey='all'>
        <PivotItem itemKey='all' headerText={t('common.allWeeks')}>
          <div className={styles.itemContainer}>
            {users.map((user, index) => (
              <MissingSubmissionUser key={index} user={user} />
            ))}
          </div>
        </PivotItem>
        {periods.map((period, index) => (
          <PivotItem
            key={index}
            itemKey={period.id}
            headerText={t('common.periodName', { name: period.name })}
          >
            <div className={styles.itemContainer}>
              <TeamsReminderButton
                title={t(
                  'admin.missingSubmissions.teamsReminderButtonTooltiop',
                  period
                )}
                period={period}
                users={period.users}
                topic={t(
                  'admin.missingSubmissions.teamsReminderTopicTemplate',
                  period
                )}
              />
              {period.users.map((user, index) => (
                <MissingSubmissionUser
                  key={index}
                  user={user}
                  period={period}
                />
              ))}
            </div>
          </PivotItem>
        ))}
      </Pivot>
    </div>
  )
}
