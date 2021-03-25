/* eslint-disable tsdoc/syntax */
import { IListProps } from 'components/List/types'
import { IColumn } from '@fluentui/react'
import { HTMLProps } from 'react'

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

export interface IDurationDisplayProps extends HTMLProps<HTMLDivElement> {
  displayFormat?: string
  duration: number
}
