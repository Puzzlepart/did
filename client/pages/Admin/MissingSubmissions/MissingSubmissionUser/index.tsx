import { Persona } from '@fluentui/react-components'
import React, { FC } from 'react'
import styles from './MissingSubmissionUser.module.scss'
import { MissingSubmissionUserTooltip } from './MissingSubmissionUserTooltip'
import { IMissingSubmissionUserProps } from './types'

export const MissingSubmissionUser: FC<IMissingSubmissionUserProps> = (
  props
) => (
  <div className={styles.root}>
    <MissingSubmissionUserTooltip {...props}>
      <Persona {...props.user} className={styles.persona} size='medium' />
    </MissingSubmissionUserTooltip>
  </div>
)

export * from './types'
