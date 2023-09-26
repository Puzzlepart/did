import {
  Persona,
  Popover,
  PopoverSurface,
  PopoverTrigger
} from '@fluentui/react-components'
import React from 'react'
import { Themed } from 'theme'
import { StyledComponent } from 'types'
import { TeamsReminderButton } from '../../TeamsReminderButton'
import styles from './MissingSubmissionUserPopover.module.scss'
import { UserMissingPeriods } from './UserMissingPeriods'
import { IMissingSubmissionUserPopoverProps } from './types'

export const MissingSubmissionUserPopover: StyledComponent<IMissingSubmissionUserPopoverProps> =
  (props) => (
    <Popover trapFocus>
      <PopoverTrigger disableButtonEnhancement>
        <div>{props.children}</div>
      </PopoverTrigger>
      <PopoverSurface>
        <Themed className={MissingSubmissionUserPopover.className}>
          <Persona
            {...props.user}
            className={styles.persona}
            size='extra-large'
          />
          <UserMissingPeriods {...props} />
          <TeamsReminderButton period={props.period} users={[props.user]} />
        </Themed>
      </PopoverSurface>
    </Popover>
  )

MissingSubmissionUserPopover.displayName = 'MissingSubmissionUserTooltip'
MissingSubmissionUserPopover.className = styles.missingSubmissionUserPopover
