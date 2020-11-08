import { Icon } from 'office-ui-fabric-react/lib/Icon'
import * as React from 'react'
import { isEmpty } from 'underscore'
import styles from './LabelColumn.module.scss'
import { EntityLabel } from 'components/EntityLabel'
import { LabelObject } from 'types'
import { ILabelColumnProps } from './types'

export const LabelColumn = (props: ILabelColumnProps) => {
    if (props.project) {
        return (
            <div className={styles.root}>
                <div className={styles.iconContainer}>
                    <Icon iconName={props.project.icon || 'Page'} styles={{ root: { fontSize: 18 } }} />
                </div>
                <div className={styles.content}>
                    <div className={styles.title}>{props.project.name}</div>
                    <div className={styles.description}>for {props.customer.name}</div>
                    {!isEmpty(props.project.labels) && (
                        <div className={styles.labels}>
                            {props.project.labels.map((label: LabelObject, idx: number) => (
                                <EntityLabel
                                    key={idx}
                                    label={label}
                                    size='xsmall' />
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