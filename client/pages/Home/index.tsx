import * as React from 'react'
import styles from './Home.module.scss'

/**
 * @ignore
 */
export default () => {
    return (
        <div className={styles.root}>
            <img src='/images/did365logobeta.png' className={styles.logo} />
            <p className={styles.motto}>The Calendar is the Timesheet</p>
        </div>
    )
}