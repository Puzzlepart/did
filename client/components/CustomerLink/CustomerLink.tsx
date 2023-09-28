import { Icon } from '@fluentui/react'
import { ReusableComponent } from 'components/types'
import React from 'react'
import { Link } from 'react-router-dom'
import { createRouterLink } from 'utils'
import styles from './CustomerLink.module.scss'
import { ICustomerLinkProps } from './types'

/**
 * Renders a `<Link />` from `react-router-dom` that
 * navigates to the specified customer.
 *
 * @category Reusable Component
 */
export const CustomerLink: ReusableComponent<ICustomerLinkProps> = (props) => {
  return (
    <div className={CustomerLink.className}>
      {props.showIcon && <Icon className={styles.icon} iconName={props.customer?.icon} />}
      <Link
        className={styles.link}
        to={createRouterLink(props.linkTemplate, props.customer)}
        onClick={() => props.onClick && props.onClick(null)}
      >
        <span>{props.text ?? props.customer?.name}</span>
      </Link>
    </div>
  )
}

CustomerLink.displayName = 'CustomerLink'
CustomerLink.className = styles.customerLink
CustomerLink.defaultProps = {
  linkTemplate: '/customers/{{key}}',
  showIcon: true
}
