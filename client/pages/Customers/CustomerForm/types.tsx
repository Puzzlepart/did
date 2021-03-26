import { IPanelProps } from '@fluentui/react'
import { ITabItemProps } from 'components/TabContainer'
import { Customer } from 'types'
import { pick, keys } from 'underscore'

export class CustomerModel {
  constructor(
    public key: string = '',
    public name: string = '',
    public description: string = '',
    public icon: string = ''
  ) {}

  init?(customer: Customer): CustomerModel {
    Object.assign(this, pick(customer, keys(this)))
    return this
  }
}

/**
 * Empty initialization of `CustomerModel`
 */
export const _CustomerModel = new CustomerModel()

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