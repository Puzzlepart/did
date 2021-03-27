import { ICalloutProps } from '@fluentui/react'
import { LabelObject as Label } from 'types'
import { ILabelPickerProps } from '../types'

export interface ISelectCalloutProps
  extends ICalloutProps,
    Pick<ILabelPickerProps, 'headerText'> {
  placeholder: string
  labels: Label[]
  selectedLabels: Label[]
  onToggleLabel: (label: Label) => void
}
