/* eslint-disable tsdoc/syntax */
import { ITypedHash } from '@pnp/common'
import { IListGroupProps } from 'components/List/types'
import { IColumn } from 'office-ui-fabric-react'
import { EventObject } from 'types'

/**
 * @category EventList
 */
export interface IEventListProps extends React.HTMLProps<HTMLDivElement> {
  /**
   * List of events
   */
  events: EventObject[]

  /**
   * Enable shimmer
   */
  enableShimmer?: boolean

  /**
   * An array of additional columns to add
   */
  additionalColumns?: IColumn[]

  /**
   * Date format
   */
  dateFormat?: string

  /**
   * Groups to render
   */
  groups?: IListGroupProps

  /**
   * Show empty days
   */
  showEmptyDays?: boolean

  /**
   * Column width overrides
   */
  columnWidths?: ITypedHash<number>

  /**
   * Resizable columns
   */
  resizableColumns?: boolean
}
