import { HTMLAttributes } from 'react'
import { LabelObject } from 'types'

export interface ILabelPickerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  label: string
  placeholder: string
  defaultSelectedKeys?: string[]
  onChange: (labels: LabelObject[]) => void
}
