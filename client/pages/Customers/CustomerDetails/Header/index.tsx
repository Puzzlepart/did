import { Icon } from 'office-ui-fabric'
import { CustomersContext } from 'pages/Customers/context'
import React, { FunctionComponent, useContext } from 'react'
import { Actions } from './Actions'
import styles from './Header.module.scss'

export const Header: FunctionComponent = () => {
    const { state } = useContext(CustomersContext)
    return (
        <div className={styles.root}>
            <div className={styles.iconContainer}>
                <Icon iconName={state.selected.icon || 'Page'} />
            </div>
            <div className={styles.title}>
                <div className={styles.text}>{state.selected.name}</div>
            </div>
            <Actions />
        </div>
    )
}
