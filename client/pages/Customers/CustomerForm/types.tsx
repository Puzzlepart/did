import { getIcons } from 'common/icons'
import { first } from 'underscore'

export interface ICustomerFormProps {
  /**
   * Name length [min, max]
   */
  nameLength?: number[]
}

export class CustomerModel {
  public key = ''
  public name = ''
  public description = ''
  public icon = first(getIcons(1))
}
