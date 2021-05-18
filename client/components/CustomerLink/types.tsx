/* eslint-disable tsdoc/syntax */
import { HTMLAttributes } from 'react'
import { Customer } from 'types'

/**
 * @ignore
 */
export interface ICustomerLinkProps extends HTMLAttributes<HTMLDivElement> {
  customer: Customer
}
