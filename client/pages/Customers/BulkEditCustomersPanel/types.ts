import { Customer } from 'types'

export interface IBulkEditCustomersPanelProps {
  open: boolean
  onDismiss: () => void
  customers: Customer[]
  onSave: (updates: Partial<Customer>) => Promise<void>
}
