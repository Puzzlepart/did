import { Icon } from '@fluentui/react'
import { ReusableComponent } from 'components/types'
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './CustomerLink.module.scss'
import { ICustomerLinkProps } from './types'

/**
 * Renders a `<Link />` from `react-router-dom` that
 * navigates to the specified customer.
 *
 * @category Reusable Component
 */
export const CustomerLink: ReusableComponent<ICustomerLinkProps> = (props) => {
  const to = `/customers/search/${props.customer?.key}`.toLowerCase()
  return (
    <div className={CustomerLink.className}>
      <Icon className={styles.icon} iconName={props.customer?.icon} />
      <Link
        className={styles.link}
        to={to}
        onClick={() => props.onClick && props.onClick(null)}
      >
        <span>{props.text ?? props.customer?.name}</span>
      </Link>
    </div>
  )
}

CustomerLink.className = styles.customerLink

export * from './types'
