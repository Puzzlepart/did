import { HTMLAttributes } from 'react'
import { Customer } from 'types'

/**
 * @ignore
 */
export interface ICustomerLinkProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The customer to link to.
   */
  customer: Customer

  /**
   * The text to display in the link insetad of the customer name.
   */
  text?: string

  /**
   * Link template to use when generating the link.
   */
  linkTemplate?: string

  /**
   * Whether to show the customer icon.
   */
  showIcon?: boolean
}
