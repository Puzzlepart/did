import { ICustomer } from 'types/ICustomer'


export interface IGetCustomersData {
  customers: ICustomer[]
}

export interface ICustomersParams {
  key: string
  view: string
}
