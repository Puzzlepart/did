import { IListProps, IListColumn } from 'components/List/types'
import { ITitleColumnProps } from './TitleColumn/types'
import { IDurationDisplayProps } from './DurationDisplay'

/**
 * @category EventList
 */
export interface IEventListProps extends IListProps {
  /**
   * An array of additional columns to add
   */
  additionalColumns?: IListColumn[]

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
   * Duration column props
   */
  durationColumn?: Partial<IDurationDisplayProps>

  /**
   * Whether to use the time column
   *
   * @default true
   */
  useTimeColumn?: boolean
}
