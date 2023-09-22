import {
  FluentProvider,
  Persona,
  Popover,
  PopoverSurface,
  PopoverTrigger
} from '@fluentui/react-components'
import React from 'react'
import { fluentDefaultTheme } from 'theme'
import { StyledComponent } from 'types'
import { TeamsReminderButton } from '../../TeamsReminderButton'
import styles from './MissingSubmissionUserPopover.module.scss'
import { IMissingSubmissionUserPopoverProps } from './types'
import { UserMissingPeriods } from './UserMissingPeriods'

export const MissingSubmissionUserPopover: StyledComponent<IMissingSubmissionUserPopoverProps> =
  (props) => (
    <Popover trapFocus>
      <PopoverTrigger disableButtonEnhancement>
        <div>{props.children}</div>
      </PopoverTrigger>
      <PopoverSurface>
        <FluentProvider
          theme={fluentDefaultTheme}
          className={MissingSubmissionUserPopover.className}
        >
          <Persona
            {...props.user}
            className={styles.persona}
            size='extra-large'
          />
          <UserMissingPeriods {...props} />
          <TeamsReminderButton period={props.period} users={[props.user]} />
        </FluentProvider>
      </PopoverSurface>
    </Popover>
  )

MissingSubmissionUserPopover.displayName = 'MissingSubmissionUserTooltip'
MissingSubmissionUserPopover.className = styles.missingSubmissionUserPopover
