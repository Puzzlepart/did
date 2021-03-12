import { Icon } from 'office-ui-fabric-react'
import React from 'react'
import { isEmpty } from 'underscore'
import { IWeekColumnProps } from './types'
import styles from './WeekColumn.module.scss'

export const WeekColumn = ({ periods }: IWeekColumnProps) => {
  if (isEmpty(periods)) {
    return null
  }

  const hours = periods.reduce((sum, period) => sum + period.hours, 0)

  return (
    <div className={styles.root}>
      <Icon iconName='CheckboxComposite' className={styles.checkMark} />
      <span>{hours}h</span>
    </div>
  )
}

export * from './types'
