import {
  Persona,
  Popover,
  PopoverSurface,
  PopoverTrigger
} from '@fluentui/react-components'
import React from 'react'
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
        <div className={MissingSubmissionUserPopover.className}>
          <Persona
            {...props.user}
            className={styles.persona}
            size='extra-large'
          />
          <UserMissingPeriods {...props} />
          <TeamsReminderButton period={props.period} users={[props.user]} />
        </div>
      </PopoverSurface>
    </Popover>
  )

MissingSubmissionUserPopover.displayName = 'MissingSubmissionUserTooltip'
MissingSubmissionUserPopover.className = styles.missingSubmissionUserPopover
