import { IPanelProps } from '@fluentui/react'
import { LabelInput, LabelObject } from 'types'

export interface ILabelFormProps extends IPanelProps {
  title?: string
  edit?: LabelObject
  onSave?: (label: LabelInput) => void
}
