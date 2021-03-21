/* eslint-disable tsdoc/syntax */
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { ICustomerLinkProps } from './types'

/**
 * Renders a `<Link />` from `react-router-dom` that
 * navigates to the specified customer
 *
 * @category Function Component
 */
export const CustomerLink: FC<ICustomerLinkProps> = ({
  customer
}: ICustomerLinkProps) => (
  <Link to={`/customers/search/${customer?.key}`.toLowerCase()}>
    {customer?.name}
  </Link>
)

export * from './types'
