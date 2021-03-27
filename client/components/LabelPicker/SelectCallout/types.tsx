import { ICalloutProps } from '@fluentui/react'
import { LabelObject as Label } from 'types'
import { ILabelPickerProps } from '../types'

export interface ISelectCalloutProps extends ICalloutProps, Pick<ILabelPickerProps, 'defaultSelectedKeys'> {
  placeholder: string
  labels: Label[]
  onToggleLabel: (label: Label) => void
}
