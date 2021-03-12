import { Icon } from 'office-ui-fabric-react'
import React from 'react'
import { isEmpty } from 'underscore'
import styles from './WeekColumn.module.scss'
import { IWeekColumnProps } from './types'

export const WeekColumn = ({ columnValue }: IWeekColumnProps) => {
  const periods = columnValue

  if (isEmpty(periods)) {
    return null
  }
  return (
    <div className={styles.root}>
      <Icon iconName='CheckboxComposite' style={{ color: 'green' }} />
      40h
    </div>
  )
}

export * from './types'
