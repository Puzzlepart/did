import * as React from 'react'
import { Link } from 'react-router-dom'
import { ICustomerLinkProps } from './types'

export const CustomerLink = ({ customer }: ICustomerLinkProps) => (
    <Link to={`/customers/search/${customer?.key}`}>{customer?.name}</Link>
)

