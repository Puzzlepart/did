import { HTMLAttributes } from 'react'
import { LabelObject } from 'types'

export interface ILabelPickerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  label: string
  placeholder: string
  headerText?: string
  defaultSelectedKeys?: string[]
  noSelectionText?: string
  onChange: (labels: LabelObject[]) => void
}
