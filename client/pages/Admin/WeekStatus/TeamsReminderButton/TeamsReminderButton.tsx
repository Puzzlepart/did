import { Button } from '@fluentui/react-components'
import { useAppContext } from 'AppContext'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import { pick } from 'underscore'
import { getFluentIcon as icon } from 'utils/getFluentIcon'
import styles from './TeamsReminderButton.module.scss'
import { ITeamsReminderButtonProps } from './types'
import { useStartTeamsConversation } from './useStartTeamsConversation'

export const TeamsReminderButton: StyledComponent<ITeamsReminderButtonProps> = (
  props
) => {
  const { t } = useTranslation()
  const { subscription } = useAppContext()
  const { startTeamsConversation } = useStartTeamsConversation(props)
  if (!subscription.settings?.teams?.missingSubmissionsEnabled) return null
  return (
    <div className={TeamsReminderButton.className}>
      <Button
        appearance='subtle'
        icon={icon('PeopleTeam')}
        onClick={() => startTeamsConversation()}
        {...pick(props, 'title', 'text')}
      >
        {t('admin.weekStatus.teamsReminderButtonText')}
      </Button>
    </div>
  )
}

TeamsReminderButton.displayName = 'TeamsReminderButton'
TeamsReminderButton.className = styles.teamsReminderButton
