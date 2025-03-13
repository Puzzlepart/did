import { Customer } from 'types'

export type DialogState =
  | 'hidden'
  | 'initial'
  | 'checking'
  | 'error'
  | 'success'

export interface ICustomerDeleteDialogProps {
  /**
   * The customer to delete.
   */
  customer: Customer

  /**
   * The current state of the dialog.
   */
  state: DialogState

  /**
   * Set the state of the dialog.
   */
  setState: (state: DialogState) => void

  /**
   * The message to display in the dialog.
   */
  message: string

  /**
   * Is the dialog loading data.
   */
  loading: boolean

  /**
   * Handler for when the customer is deleted.
   */
  onDelete: (customer: Customer) => void
}
