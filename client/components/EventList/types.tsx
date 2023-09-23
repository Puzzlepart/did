import { IColumn } from '@fluentui/react'
import { IListProps } from 'components/List/types'
import { ITitleColumnProps } from './TitleColumn/types'

/**
 * @category EventList
 */
export interface IEventListProps extends IListProps {
  /**
   * An array of additional columns to add
   */
  additionalColumns?: IColumn[]

  /**
   * Date format
   */
  dateFormat?: string

  /**
   * Column width overrides
   */
  columnWidths?: Record<string, number>

  /**
   * Resizable columns
   */
  resizableColumns?: boolean

  /**
   * Title column props
   */
  titleColumn?: {
    mobile?: Partial<ITitleColumnProps>
    browser?: Partial<ITitleColumnProps>
  }

  /**
   * Whether to use the time column
   * 
   * @default true
   */
  useTimeColumn?: boolean
}
