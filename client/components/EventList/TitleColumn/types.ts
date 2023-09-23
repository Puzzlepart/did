import { EventObject } from 'types'

export interface ITitleColumnProps {
    /**
    * The event to display in the column.
    */
    event: EventObject

    /**
     * Display the time in the column.
     */
    displayTime?: boolean
}
