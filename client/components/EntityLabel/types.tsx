/* eslint-disable tsdoc/syntax */
import { LabelInput, LabelObject } from 'types'

/**
 * @category EntityLabel
 */
export interface IEntityLabelProps {
  label: LabelObject | LabelInput
  size?: LabelSize
}

export enum LabelSize {
  xsmall,
  small,
  medium,
  large
}
