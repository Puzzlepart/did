import { StyledComponent } from 'types'
import { useWeekStatusContext } from '../context'
import { ILockWeekMessageProps } from './types'
import React from 'react'
import $date from 'DateUtils'
import { useTranslation } from 'react-i18next'
import { UserMessage } from 'components'

export const LockWeekMessage: StyledComponent<ILockWeekMessageProps> = (
  props
) => {
  const { t } = useTranslation()
  const context = useWeekStatusContext()
  const lockedPeriod = context.lockedPeriods.find(
    (lockedPeriod) => lockedPeriod.periodId === props.period.id
  )

  if (!Boolean(lockedPeriod)) return null

  const lockedAt = $date.formatDate(
    lockedPeriod.lockedAt,
    props.dateFormat
  )

  return (
    <UserMessage
      intent='warning'
      iconName='LockClosed'
      text={t('admin.weekStatus.weekLockedMessage', {
        ...props.period,
        lockedAt,
        reason: lockedPeriod?.reason && `\n\n **${t('common.reason')}:** _${lockedPeriod.reason}_`
      })}
      style={{ marginBottom: 25 }} />
  )
}

LockWeekMessage.displayName = 'LockWeekMessage'
LockWeekMessage.defaultProps = {
  dateFormat: 'DD.MM.YYYY HH:mm'
}
