import * as React from 'react'
import styles from './Home.module.scss'

/**
 * @ignore
 */
export default () => {
    return (
        <div className={styles.root}>
            <div className={styles.logo}>
            Did
            </div>
            <p className={styles.motto}>The Calendar is the Timesheet</p>
        </div>
    )
}