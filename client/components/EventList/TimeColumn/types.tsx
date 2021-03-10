/* eslint-disable tsdoc/syntax */
import { HTMLProps } from 'react'
import { TimeEntry } from 'types'
import { IEventListProps } from '../types'

/**
 * @category EventList
 */
export interface ITimeColumnProps extends HTMLProps<HTMLDivElement> {
  listProps: IEventListProps
  event: TimeEntry
  index: number
}
