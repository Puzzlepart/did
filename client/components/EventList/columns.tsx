
import * as helpers from 'helpers'
import { ITimeEntry } from 'interfaces'
import * as React from 'react'
import dateUtils from 'utils/date'
import { generateColumn as col } from 'utils/generateColumn'
import { IColumn } from '../List'
import { DurationDisplay } from './DurationDisplay'
import { IEventListProps } from './types'
import { MobileView, BrowserView } from 'react-device-detect'

/**
 * Get sizing for column
 * 
 * @param {IEventListProps} props Props
 * @param {string} fieldName Column field name
 * @param {number} defMinWidth Default min width
 * @param {number} defMaxWidth Default max width
 * 
 * @ignore
 */
function getSizing(props: IEventListProps, fieldName: string, defMinWidth: number, defMaxWidth: number): { minWidth: number; maxWidth: number } {
    return {
        minWidth: helpers.value(props, `columnWidths.${fieldName}`, defMinWidth),
        maxWidth: helpers.value(props, `columnWidths.${fieldName}`, defMaxWidth),
    }
}
/**
 * Title column
 * 
 * @param {IEventListProps} props Props
 * @param {string} name Name
 * @param {string} fieldName Field name
 * 
 * @ignore
 */
export const Title = (props: IEventListProps, name: string, fieldName = 'title'): IColumn => col(
    fieldName,
    name,
    { ...getSizing(props, fieldName, 320, 400), isMultiline: true },
    (event: ITimeEntry) => (
        <a href={event.webLink}
            target='_blank'
            rel='noopener noreferrer'
            title={event.title}>
            <span>{event.title}</span>
        </a>
    ),
)


/**
 * Time column
 * 
 * @param {IEventListProps} props Props
 * @param {string} name Name
 * @param {string} fieldName Field name
 * 
 * @ignore
 */
export const Time = (props: IEventListProps, name: string, fieldName = 'time'): IColumn => col(
    fieldName,
    name,
    { ...getSizing(props, fieldName, 90, 90) },
    (event: ITimeEntry) => {
        const startTime = dateUtils.formatDate(event.startDateTime, props.dateFormat)
        const endTime = dateUtils.formatDate(event.endDateTime, props.dateFormat)
        return (
            <>
                <span>
                    {startTime} - {endTime}
                </span>
                <MobileView renderWithFragment={true}>
                    <DurationDisplay
                        displayFormat='({0})'
                        duration={event.duration}
                        style={{ marginLeft: 4 }} />
                </MobileView>
            </>
        )
    }
)

/**
 * Duration column
 * 
 * @param {IEventListProps} props Props
 * @param {string} name Name
 * @param {string} fieldName Field name
 * 
 * @ignore
 */
export const Duration = (props: IEventListProps, name: string, fieldName = 'duration'): IColumn => col(
    fieldName,
    name,
    { ...getSizing(props, fieldName, 75, 75) },
    (event: ITimeEntry) => (
        <BrowserView renderWithFragment={true}>
            <DurationDisplay duration={event.duration} />
        </BrowserView>
    )
)
