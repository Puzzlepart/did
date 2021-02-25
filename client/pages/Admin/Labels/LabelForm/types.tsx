import { LabelInput, LabelObject } from 'types'
import { IPanelProps } from 'office-ui-fabric'

export interface ILabelFormProps extends IPanelProps {
  title?: string
  label?: LabelObject
  onSave?: (label: LabelInput) => void
}
