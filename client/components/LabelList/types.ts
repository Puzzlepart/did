import { LabelObject } from 'types'
import { HTMLAttributes } from 'react'

/**
 * Props for the LabelList component
 */
export interface ILabelListProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Array of labels to display
   */
  labels: LabelObject[]
}
