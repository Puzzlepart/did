import { LabelObject as Label } from 'types'

export interface ILabelPickerProps {
  placeholder: string
  labels: Label[]
  selectedLabels: Label[]
  onToggleLabel: (label: Label) => void
}
