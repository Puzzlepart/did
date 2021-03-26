/* eslint-disable tsdoc/syntax */
import { ReusableComponent } from 'components/types'
import React from 'react'
import { Link } from 'react-router-dom'
import { ICustomerLinkProps } from './types'

/**
 * Renders a `<Link />` from `react-router-dom` that
 * navigates to the specified customer
 *
 * @category Reusable Component
 */
export const CustomerLink: ReusableComponent<ICustomerLinkProps> = ({
  customer
}) => (
  <Link to={`/customers/search/${customer?.key}`.toLowerCase()}>
    {customer?.name}
  </Link>
)

export * from './types'
