/* eslint-disable tsdoc/syntax */
import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { ICustomerLinkProps } from './types'

/**
 * @category Function Component
 */
export const CustomerLink: FunctionComponent<ICustomerLinkProps> = ({
  customer
}: ICustomerLinkProps) => (
  <Link to={`/customers/search/${customer?.key}`.toLowerCase()}>
    {customer?.name}
  </Link>
)

export * from './types'
