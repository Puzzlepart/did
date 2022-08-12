/* eslint-disable tsdoc/syntax */
import {
  Label,
  MessageBar,
  Persona,
  PersonaSize,
  TooltipHost
} from '@fluentui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './MissingSubmissionUserTooltip.module.scss'
import { TeamsReminderButton } from './TeamsReminderButton'
import { IMissingSubmissionUserTooltipProps } from './types'

export const MissingSubmissionUserTooltip: React.FC<IMissingSubmissionUserTooltipProps> =
  (props) => {
    const { t } = useTranslation()
    return (
      <TooltipHost
        tooltipProps={{
          onRenderContent: () => (
            <div className={styles.root}>
              <Persona
                {...props.user}
                className={styles.persona}
                showOverflowTooltip={false}
                size={PersonaSize.size56}
              />
              {props.user.lastActive && (
                <MessageBar>
                  {t('common.userLastActiveText', {
                    lastActive: props.user.lastActive.toLocaleDateString()
                  })}
                </MessageBar>
              )}
              {props.user.periods && (
                <div className={styles.periods}>
                  <Label>{t('common.missingWeeksLabel')}</Label>
                  {props.user.periods.map((p) => p.name).join(', ')}
                </div>
              )}
              <TeamsReminderButton {...props} />
            </div>
          )
        }}
        calloutProps={{ gapSpace: 0 }}
      >
        {props.children}
      </TooltipHost>
    )
  }

export * from './types'
