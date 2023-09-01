import { Button } from '@fluentui/react-components'
import { useAppContext } from 'AppContext'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { pick } from 'underscore'
import { getFluentIcon } from 'utils'
import styles from './TeamsReminderButton.module.scss'
import { ITeamsReminderButtonProps } from './types'
import { useStartTeamsConversation } from './useStartTeamsConversation'

export const TeamsReminderButton: FC<ITeamsReminderButtonProps> = (props) => {
  const { t } = useTranslation()
  const { subscription } = useAppContext()
  const { startTeamsConversation } = useStartTeamsConversation(props)
  if (!subscription.settings?.teams?.enabled) return null
  return (
    <div className={styles.root}>
      <Button
        appearance='primary'
        icon={getFluentIcon('PeopleTeam')}
        onClick={() => startTeamsConversation()}
        {...pick(props, 'title', 'text')}
      >
        {t('admin.missingSubmissions.teamsReminderButtonText')}
      </Button>
    </div>
  )
}
