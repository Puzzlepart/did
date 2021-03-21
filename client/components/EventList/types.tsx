/* eslint-disable tsdoc/syntax */
import { ITypedHash } from '@pnp/common'
import { IListProps } from 'components/List/types'
import { IColumn } from 'office-ui-fabric-react'

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
  columnWidths?: ITypedHash<number>

  /**
   * Resizable columns
   */
  resizableColumns?: boolean
}
