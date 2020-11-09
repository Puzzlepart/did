import * as React from 'react'
import { withDefaultProps } from 'with-default-props'
import styles from './CustomerColumn.module.scss'
import { ICustomerColumnProps } from './types'
import { Icon } from 'office-ui-fabric'


const CustomerColumn = ({ event }: ICustomerColumnProps): JSX.Element => {
    if (!event.customer || !event.project) return null
    return (
        <div className={styles.root}>
            <div className={styles.iconContainer}>
                <Icon iconName={event.customer.icon || 'Page'} />
            </div>
            <div className={styles.content}>
                <a href={`/customers/search/${event.customer.key}`}>{event.customer.name}</a>
            </div>
        </div>
    )
}

export default withDefaultProps(CustomerColumn, {})
