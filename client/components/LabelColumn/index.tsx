import { Icon } from 'office-ui-fabric-react/lib/Icon';
import * as React from 'react';
import { ILabelColumnProps } from './ILabelColumnProps';
import styles from './LabelColumn.module.scss';

/**
 * @category LabelColumn
 */
export const LabelColumn = ({ row }: ILabelColumnProps) => {
    if (row.label) return <div style={{ fontWeight: 500 }}>{row.label}</div>;

    return (
        <div className={styles.root}>
            <div className={styles.iconContainer}>
                <Icon iconName={row.project.icon || 'Page'} styles={{ root: { fontSize: 18 } }} />
            </div>
            <div className={styles.content}>
                <div className={styles.title}>{row.project.name}</div>
                <div className={styles.description}>for {row.customer.name}</div>
            </div>
        </div>
    );
}