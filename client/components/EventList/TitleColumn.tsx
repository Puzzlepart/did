import { Link } from '@fluentui/react-components'
import { EntityLabel } from 'components/EntityLabel'
import React, { FC } from 'react'
import { EventObject } from 'types'
import styles from './EventList.module.scss'

export const TitleColumn: FC<{ event: EventObject }> = ({ event }) => {
  return (
    <div className={styles.titleColumn}>
      <Link href={event.webLink} target='_blank' title={event.title}>
        <span>{event.title}</span>
      </Link>
      {event.labels && (
        <div className={styles.labels}>
          {event.labels.map((label, index) => (
            <EntityLabel key={index} label={label} />
          ))}
        </div>
      )}
    </div>
  )
}

TitleColumn.displayName = 'TitleColumn'
