import { IPanelProps } from '@fluentui/react-react'
import { LabelInput, LabelObject } from 'types'

export interface ILabelFormProps extends IPanelProps {
  title?: string
  label?: LabelObject
  onSave?: (label: LabelInput) => void
}
