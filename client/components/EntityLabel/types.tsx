import { LabelInput, LabelObject } from 'types'

export interface IEntityLabelProps {
  label: LabelObject | LabelInput
  size?: 'xsmall' | 'small' | 'medium' | 'large'
}
