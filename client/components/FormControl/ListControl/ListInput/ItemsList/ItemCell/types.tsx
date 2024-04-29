import { ListField } from '../../types'

export interface IItemCellProps {
  index: number
  field: ListField
  value?: any
  onChange?: (value: any) => void
}
