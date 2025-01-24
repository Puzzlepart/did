import { Button, Tooltip } from '@fluentui/react-components'
import React from 'react'
import { StyledComponent } from 'types'
import styles from './LockWeekButton.module.scss'
import { ILockWeekButtonProps } from './types'
import { useLockWeekButton } from './useLockWeekButton'
import $date from 'DateUtils'
import { useTranslation } from 'react-i18next'

export const LockWeekButton: StyledComponent<ILockWeekButtonProps> = (
  props
) => {
  const { t } = useTranslation()
  const { text, icon, onClick, lockedPeriod, confirmationDialog } =
    useLockWeekButton(props)
  return (
    <div className={LockWeekButton.className}>
      <Tooltip
        relationship='description'
        content={
          lockedPeriod ? (
            <div>
              <p>
                {t('admin.weekStatus.weekLockedTooltip', {
                  ...props.period,
                  lockedAt: $date.formatDate(
                    lockedPeriod.lockedAt,
                    'DD.MM.YYYY HH:mm'
                  )
                })}
              </p>
              <p hidden={!lockedPeriod?.reason}>
                <b>{t('common.reason')}:</b> {lockedPeriod?.reason}
              </p>
            </div>
          ) : (
            <p>{t('admin.weekStatus.weekOpenTooltip', props.period)}</p>
          )
        }
      >
        <Button appearance='subtle' icon={icon} onClick={onClick}>
          {text}
        </Button>
      </Tooltip>
      {confirmationDialog}
    </div>
  )
}

LockWeekButton.displayName = 'LockWeekButton'
LockWeekButton.className = styles.lockWeekButton
