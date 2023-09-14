import { IBasePanelProps } from 'components/BasePanel/types'
import { LabelInput, LabelObject } from 'types'

export interface ILabelFormProps extends IBasePanelProps {
  title?: string
  edit?: LabelObject
  onSave?: (label: LabelInput) => void
}
