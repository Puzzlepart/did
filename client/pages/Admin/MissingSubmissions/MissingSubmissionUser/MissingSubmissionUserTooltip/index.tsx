/* eslint-disable tsdoc/syntax */
import { Persona, PersonaSize, TooltipHost } from '@fluentui/react'
import React from 'react'
import { TeamsReminderButton } from '../../TeamsReminderButton'
import styles from './MissingSubmissionUserTooltip.module.scss'
import { IMissingSubmissionUserTooltipProps } from './types'
import { UserMissingPeriods } from './UserMissingPeriods'

export const MissingSubmissionUserTooltip: React.FC<IMissingSubmissionUserTooltipProps> =
  (props) => {
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
              <UserMissingPeriods {...props} />
              <TeamsReminderButton period={props.period} users={[props.user]} />
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
