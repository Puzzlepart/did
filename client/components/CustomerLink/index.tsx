/* eslint-disable tsdoc/syntax */
import React from 'react'
import { Link } from 'react-router-dom'
import { ICustomerLinkProps } from './types'

/**
 * Renders a `<Link />` from `react-router-dom` that
 * navigates to the specified customer
 *
 * @category Function Component
 */
export const CustomerLink: React.FC<ICustomerLinkProps> = ({
  customer
}: ICustomerLinkProps) => (
  <Link to={`/customers/search/${customer?.key}`.toLowerCase()}>
    {customer?.name}
  </Link>
)

export * from './types'
