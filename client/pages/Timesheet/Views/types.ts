import { FC } from 'react'


/**
 * Represents a functional component that renders a timesheet view.
 */
export interface TimesheetViewComponent extends FC {
    /**
     * The ID of the view.
     */
    id: string
}