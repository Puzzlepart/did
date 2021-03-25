import { ICalloutProps } from '@fluentui/react'
import { LabelObject } from 'types'

export interface ISelectCalloutProps extends ICalloutProps {
  labels: LabelObject[]
  placeholder: string
  defaultSelectedKeys?: string[]
  onToggleLabel: (label: LabelObject) => void
}
