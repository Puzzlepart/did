/* eslint-disable tsdoc/syntax */
import { HTMLAttributes } from 'react'
import { LabelInput, LabelObject } from 'types'

/**
 * @category EntityLabel
 */
export interface IEntityLabelProps extends HTMLAttributes<HTMLDivElement> {
  label: LabelObject | LabelInput
}
