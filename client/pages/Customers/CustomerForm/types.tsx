import { getIcons } from 'common/icons'
import { ITabItemProps } from 'components/TabContainer'
import { IPanelProps } from '@fluentui/react'
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
    this.icon = customer?.icon || first(getIcons(1))
  }
}

interface ICustomerFormPanelProps extends IPanelProps {
  onSave: () => void
}

export interface ICustomerFormProps extends ITabItemProps {
  /**
   * Panel props provided if the form is rendered within a panel
   */
  panel?: ICustomerFormPanelProps

  /**
   * Customer to edit
   */
  edit?: Customer
}

export interface ICustomerFormState {
  model: CustomerModel
  editMode: boolean
  validation?: IFormValidation
}
