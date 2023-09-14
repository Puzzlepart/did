import { Persona } from '@fluentui/react-components'
import React from 'react'
import { StyledComponent } from 'types'
import styles from './MissingSubmissionUser.module.scss'
import { MissingSubmissionUserTooltip } from './MissingSubmissionUserTooltip'
import { IMissingSubmissionUserProps } from './types'

export const MissingSubmissionUser: StyledComponent<IMissingSubmissionUserProps> = (
  props
) => (
  <div className={MissingSubmissionUser.className}>
    <MissingSubmissionUserTooltip {...props}>
      <Persona {...props.user} className={styles.persona} size='medium' />
    </MissingSubmissionUserTooltip>
  </div>
)

MissingSubmissionUser.displayName = 'MissingSubmissionUser'
MissingSubmissionUser.className = styles.missingSubmissionUser

export * from './types'
