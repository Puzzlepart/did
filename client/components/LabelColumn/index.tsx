import { Icon } from 'office-ui-fabric-react/lib/Icon'
import * as React from 'react'
import { isEmpty } from 'underscore'
import styles from './LabelColumn.module.scss'
import { EntityLabel } from 'components/EntityLabel'
import { IEntityLabel } from 'interfaces'

/**
 * @category LabelColumn
 */
export const LabelColumn = ({ row }) => {
    if (row.label) return <div style={{ fontWeight: 500 }}>{row.label}</div>

    return (
        <div className={styles.root}>
            <div className={styles.iconContainer}>
                <Icon iconName={row.project.icon || 'Page'} styles={{ root: { fontSize: 18 } }} />
            </div>
            <div className={styles.content}>
                <div className={styles.title}>{row.project.name}</div>
                <div className={styles.description}>for {row.customer.name}</div>
                {!isEmpty(row.project.labels) && (
                    <div className={styles.labels}>
                        {row.project.labels.map((label: IEntityLabel, idx: number) => (
                            <EntityLabel
                                key={idx}
                                label={label}
                                size='small' />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}