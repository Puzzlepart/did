/* eslint-disable tsdoc/syntax */
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { ICustomerLinkProps } from './types'

/**
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
