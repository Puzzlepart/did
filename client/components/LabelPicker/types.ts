import { LabelObject } from 'types'

export interface ILabelPickerProps {
  className?: string
  label: string
  searchLabelText: string
  defaultSelectedKeys?: string[]
  onChange: (labels: LabelObject[]) => void
}
