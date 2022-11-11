import { Persona, PersonaSize } from '@fluentui/react'
import React, { FC } from 'react'
import styles from './MissingSubmissionUser.module.scss'
import { MissingSubmissionUserTooltip } from './MissingSubmissionUserTooltip'
import { IMissingSubmissionUserProps } from './types'

export const MissingSubmissionUser: FC<IMissingSubmissionUserProps> = ({
  user,
  period
}) => (
  <div className={styles.root}>
    <MissingSubmissionUserTooltip user={user} period={period}>
      <Persona
        {...user}
        className={styles.persona}
        showOverflowTooltip={false}
        size={PersonaSize.size40}
      />
    </MissingSubmissionUserTooltip>
  </div>
)

export * from './types'
