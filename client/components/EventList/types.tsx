/* eslint-disable tsdoc/syntax */
import { IColumn } from '@fluentui/react'
import { IListProps } from 'components/List/types'

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
}
