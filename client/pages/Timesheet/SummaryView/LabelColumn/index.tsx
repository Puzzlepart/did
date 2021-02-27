import { EntityLabel } from 'components/EntityLabel'
import { Icon } from 'office-ui-fabric'
import * as React from 'react'
import { LabelObject as Label } from 'types'
import { isEmpty } from 'underscore'
import styles from './LabelColumn.module.scss'
import { ILabelColumnProps } from './types'

export const LabelColumn = (props: ILabelColumnProps) => {
  if (props.project) {
    return (
      <div className={styles.root}>
        <div className={styles.iconContainer}>
          <Icon
            iconName={props.project.icon}
            styles={{ root: { fontSize: 18 } }}
          />
        </div>
        <div className={styles.content}>
          <div className={styles.title}>{props.project.name}</div>
          <div className={styles.description}>for {props.customer.name}</div>
          {!isEmpty(props.project.labels) && (
            <div className={styles.labels}>
              {(props.project.labels as Label[]).map((label, idx: number) => (
                <EntityLabel key={idx} label={label} size='xsmall' />
              ))}
            </div>
          )}
        </div>
      </div>
    )
  } else if (props.label) {
    return <div style={{ fontWeight: 500 }}>{props.label}</div>
  }
  return null
}

export * from './types'
