import * as React from 'react'
import { withDefaultProps } from 'with-default-props'
import styles from './CustomerColumn.module.scss'
import { ICustomerColumnProps } from './types'

/**
 * @category Timesheet
 */
const CustomerColumn = ({ event }: ICustomerColumnProps): JSX.Element => {
    if(!event.customer) return null
    return (
        <div className={styles.root}>
            <a href={`/customers/search/${event.customer.key}`}>{event.customer.name}</a>
        </div>
    )
}

export default withDefaultProps(CustomerColumn, {})
