/* eslint-disable tsdoc/syntax */
import { ITypedHash } from '@pnp/common'
import { IListGroupProps, IListProps } from 'components/List/types'
import { IColumn } from 'office-ui-fabric-react'

/**
 * @category EventList
 */
export interface IEventListProps extends IListProps {
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
  listGroupProps?: IListGroupProps

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
