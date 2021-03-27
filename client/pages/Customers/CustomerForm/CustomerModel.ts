import { Customer } from 'types'
import { keys, pick } from 'underscore'

export class CustomerModel {
  constructor(
    public key: string = '',
    public name: string = '',
    public description: string = '',
    public icon: string = ''
  ) {}

  /**
   * Initializes a `CustomerModel` from a
   * `Customer`
   *
   * This is the _prettiest_ way we have right
   * now.
   *
   * @param project - Project object
   *
   * @returns this
   */
  init?(customer: Customer): CustomerModel {
    Object.assign(this, pick(customer, keys(this)))
    return this
  }
}
