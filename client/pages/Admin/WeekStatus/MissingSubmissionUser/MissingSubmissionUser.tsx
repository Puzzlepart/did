import { Persona } from '@fluentui/react-components'
import React from 'react'
import { StyledComponent } from 'types'
import styles from './MissingSubmissionUser.module.scss'
import { MissingSubmissionUserPopover } from './MissingSubmissionUserPopover'
import { IMissingSubmissionUserProps } from './types'

export const MissingSubmissionUser: StyledComponent<
  IMissingSubmissionUserProps
> = (props) => (
  <div className={MissingSubmissionUser.className}>
    <MissingSubmissionUserPopover {...props}>
      <Persona {...props.user} className={styles.persona} size='medium' />
    </MissingSubmissionUserPopover>
  </div>
)

MissingSubmissionUser.displayName = 'MissingSubmissionUser'
MissingSubmissionUser.className = styles.missingSubmissionUser
