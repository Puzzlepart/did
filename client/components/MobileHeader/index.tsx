import { Icon } from 'office-ui-fabric'
import * as React from 'react'
import styles from './MobileHeader.module.scss'
import { IMobileHeaderProps } from './types'

export const MobileHeader = (props: IMobileHeaderProps) => {
    return (
        <div className={styles.root}>
            <Icon iconName={props.iconName} className={styles.headerIcon} />
            <span className={styles.headerText}>
                {props.text}
            </span>
        </div>
    )
}