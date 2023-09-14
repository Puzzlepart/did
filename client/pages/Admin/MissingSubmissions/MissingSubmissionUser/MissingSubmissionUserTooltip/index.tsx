import { TooltipHost } from '@fluentui/react'
import {
  FluentProvider,
  Persona,
  webLightTheme
} from '@fluentui/react-components'
import React from 'react'
import { StyledComponent } from 'types'
import { TeamsReminderButton } from '../../TeamsReminderButton'
import styles from './MissingSubmissionUserTooltip.module.scss'
import { IMissingSubmissionUserTooltipProps } from './types'
import { UserMissingPeriods } from './UserMissingPeriods'

export const MissingSubmissionUserTooltip: StyledComponent<IMissingSubmissionUserTooltipProps> =
  (props) => (
    <TooltipHost
      tooltipProps={{
        onRenderContent: () => (
          <FluentProvider
            theme={webLightTheme}
            className={MissingSubmissionUserTooltip.className}
          >
            <Persona
              {...props.user}
              className={styles.persona}
              size='extra-large'
            />
            <UserMissingPeriods {...props} />
            <TeamsReminderButton period={props.period} users={[props.user]} />
          </FluentProvider>
        )
      }}
      calloutProps={{ gapSpace: 0 }}
    >
      {props.children}
    </TooltipHost>
  )

MissingSubmissionUserTooltip.displayName = 'MissingSubmissionUserTooltip'
MissingSubmissionUserTooltip.className = styles.missingSubmissionUserTooltip

export * from './types'
