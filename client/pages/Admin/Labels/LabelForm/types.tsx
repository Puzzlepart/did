import { IPanelProps } from 'components/Panel'
import { LabelInput, LabelObject } from 'types'

export interface ILabelFormProps extends IPanelProps {
  edit?: LabelObject
  onSave?: (label: LabelInput) => void
}
