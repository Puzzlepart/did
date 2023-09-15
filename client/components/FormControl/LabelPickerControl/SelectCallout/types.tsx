import { ICalloutProps } from '@fluentui/react'
import { LabelObject as Label } from 'types'
import { ILabelPickerControlProps } from '../types'

export interface ISelectCalloutProps
  extends ICalloutProps,
    Pick<ILabelPickerControlProps, 'headerText'> {
  placeholder: string
  labels: Label[]
  selectedLabels: Label[]
  onToggleLabel: (label: Label) => void
}
