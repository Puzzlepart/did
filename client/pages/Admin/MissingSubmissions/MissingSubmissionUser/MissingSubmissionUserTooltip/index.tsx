import { TooltipHost } from '@fluentui/react'
import {
  FluentProvider,
  Persona
} from '@fluentui/react-components'
import React from 'react'
import { fluentLightTheme } from 'theme'
import { StyledComponent } from 'types'
import { TeamsReminderButton } from '../../TeamsReminderButton'
import styles from './MissingSubmissionUserTooltip.module.scss'
import { UserMissingPeriods } from './UserMissingPeriods'
import { IMissingSubmissionUserTooltipProps } from './types'

export const MissingSubmissionUserTooltip: StyledComponent<IMissingSubmissionUserTooltipProps> =
  (props) => (
    <TooltipHost
      tooltipProps={{
        onRenderContent: () => (
          <FluentProvider
            theme={fluentLightTheme}
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
