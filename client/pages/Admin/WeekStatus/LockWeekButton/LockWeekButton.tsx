import { Button } from '@fluentui/react-components'
import React from 'react'
import { StyledComponent } from 'types'
import styles from './LockWeekButton.module.scss'
import { ILockWeekButtonProps } from './types'
import { useLockWeekButton } from './useLockWeekButton'

export const LockWeekButton: StyledComponent<ILockWeekButtonProps> = (
  props
) => {
  const { text, icon, onClick, confirmationDialog } = useLockWeekButton(props)
  return (
    <div className={LockWeekButton.className}>
      <Button appearance='subtle' icon={icon} onClick={onClick}>
        {text}
      </Button>
      {confirmationDialog}
    </div>
  )
}

LockWeekButton.displayName = 'LockWeekButton'
LockWeekButton.className = styles.lockWeekButton
