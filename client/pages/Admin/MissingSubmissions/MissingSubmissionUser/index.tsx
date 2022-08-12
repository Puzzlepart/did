import { Persona, PersonaSize } from '@fluentui/react'
import React from 'react'
import styles from './MissingSubmissionUser.module.scss'
import { MissingSubmissionUserTooltip } from './MissingSubmissionUserTooltip'
import { IMissingSubmissionUserProps } from './types'

export const MissingSubmissionUser: React.FC<IMissingSubmissionUserProps> = ({
  user,
  period
}) => {
  return (
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
}

export * from './types'
