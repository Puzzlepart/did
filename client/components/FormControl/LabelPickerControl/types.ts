import { HTMLAttributes } from 'react'
import { LabelObject } from 'types'

export interface ILabelPickerControlProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  label: string
  placeholder: string
  defaultSelectedKeys?: string[]
  noSelectionText?: string
  onChange?: (labels: LabelObject[]) => void
}
