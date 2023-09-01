import { TabComponent } from 'components/Tabs'
import React from 'react'
import { IListProps } from './types'
import styles from './List.module.scss'
import { TeamsReminderButton } from '../TeamsReminderButton'
import { MissingSubmissionUser } from '../MissingSubmissionUser'
import { useTranslation } from 'react-i18next'

export const List: TabComponent<IListProps> = ({ users, period }) => {
    const { t } = useTranslation()
    if (users) {
        return (
            <div className={styles.root}>
                {users.map((user, index) => (
                    <MissingSubmissionUser key={index} user={user} />
                ))}
            </div>
        )
    }
    return (
        <div className={styles.root}>
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
    )
}