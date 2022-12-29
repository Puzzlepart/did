import { Icon } from '@fluentui/react'
import React, { FC } from 'react'
import styles from './CustomerColumn.module.scss'
import { ICustomerColumnProps } from './types'

export const CustomerColumn: FC<ICustomerColumnProps> = ({ event }) => {
  if (!event.project?.customer) return null
  return (
    <div className={styles.root}>
      <div className={styles.iconContainer}>
        <Icon iconName={event.project?.customer?.icon || 'Page'} />
      </div>
      <div className={styles.content}>
        <a href={`/customers/search/${event.project?.customer?.key}`}>
          {event.project?.customer?.name}
        </a>
      </div>
    </div>
  )
}
