/* eslint-disable tsdoc/syntax */
import {
  ActionButton,
  Label,
  MessageBar,
  Persona,
  PersonaSize,
  TooltipHost
} from '@fluentui/react'
import { useAppContext } from 'AppContext'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './MissingSubmissionUserTooltip.module.scss'
import { IMissingSubmissionUserTooltipProps } from './types'
import { useMissingSubmissionUserTooltip } from './useMissingSubmissionUserTooltip'

export const MissingSubmissionUserTooltip: React.FC<IMissingSubmissionUserTooltipProps> =
  ({ user, period, children }) => {
    const { t } = useTranslation()
    const { onNotifyTeams } = useMissingSubmissionUserTooltip({ user, period })
    const { subscription } = useAppContext()
    return (
      <TooltipHost
        tooltipProps={{
          onRenderContent: () => (
            <div className={styles.root}>
              <Persona
                {...user}
                className={styles.persona}
                showOverflowTooltip={false}
                size={PersonaSize.size56}
              />
              {user.lastActive && (
                <MessageBar>
                  {t('common.userLastActiveText', {
                    lastActive: user.lastActive.toLocaleDateString()
                  })}
                </MessageBar>
              )}
              {user.periods && (
                <div className={styles.periods}>
                  <Label>{t('common.missingWeeksLabel')}</Label>
                  {user.periods.map((p) => p.name).join(', ')}
                </div>
              )}
              {subscription.settings?.teams?.enabled && (
                <ActionButton
                  text={t('admin.missingSubmissions.teamsReminderButtonText')}
                  iconProps={{ iconName: 'TeamsLogo' }}
                  onClick={onNotifyTeams}
                />
              )}
            </div>
          )
        }}
        calloutProps={{ gapSpace: 0 }}
      >
        {children}
      </TooltipHost>
    )
  }

export * from './types'
