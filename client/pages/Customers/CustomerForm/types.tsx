import { IFormControlProps } from 'components/FormControl'
import { ITabProps } from 'components/Tabs/types'
import { Customer } from 'types'

export interface ICustomerFormProps
  extends ITabProps,
    IFormControlProps<Customer> {}
