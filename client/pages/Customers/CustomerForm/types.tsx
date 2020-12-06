import { getIcons } from 'common/icons'
import { IPanelProps } from 'office-ui-fabric-react/lib/Panel'
import { Customer, IFormValidation } from 'types'
import { first } from 'underscore'

export class CustomerModel {
  public key: string
  public name: string
  public description: string
  public icon: string

  constructor(customer?: Customer) {
      this.key = customer?.key || ''
      this.name = customer?.name || ''
      this.description = customer?.description || ''
      this.icon = customer?.icon|| first(getIcons(1))
  }
}

export interface IProjectFormProps {
  /**
   * Panel props
   */
  panel?: IPanelProps

  /**
   * Customer to edit
   */
  edit?: Customer

  /**
   * On submitted callback
   */
  onSubmitted?: () => void
}

export interface ICustomerFormState {
  model: CustomerModel
  editMode: boolean
  validation?: IFormValidation
}