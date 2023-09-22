import { EventObject } from 'types'
import { IEventListProps } from '../types'

export interface ITimeColumnProps extends Pick<IEventListProps, 'dateFormat' | 'className'> {
    /**
     * The event to display in the column.
     */
    event: EventObject
}
