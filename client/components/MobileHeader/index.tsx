import { Icon } from 'office-ui-fabric-react/lib/Icon'
import * as React from 'react'
import { isMobile } from 'react-device-detect'
import styles from './MobileHeader.module.scss'
import { IMobileHeaderProps } from './types'

export const MobileHeader = (props: IMobileHeaderProps) => {
    let className = styles.root
    if (isMobile) className += ` ${styles.mobile}`
    return (
        <li className={className}>
            <Icon iconName={props.iconName} className={styles.headerIcon} />
            <span className={styles.headerText}>
                {props.text}
            </span>
        </li>
    )
}