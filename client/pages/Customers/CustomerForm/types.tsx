import { IFormControlProps } from 'components/FormControl'
import { ITabProps } from 'components/Tabs/types'

export interface ICustomerFormProps extends ITabProps, IFormControlProps {}

export const CUSTOMER_KEY_REGEX = new RegExp('(^[A-ZÆØÅ0-9]{2,12}$)', 'gm')
