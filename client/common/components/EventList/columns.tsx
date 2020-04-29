
import * as hlp from 'helpers';
import { ITimeEntry } from 'interfaces';
import * as React from 'react';
import { generateColumn as col } from 'utils/generateColumn';
import { DurationDisplay } from './DurationDisplay';
import ProjectColumn from './ProjectColumn';
import { IEventListProps } from './types';

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
function getSizing(props: IEventListProps, fieldName: string, defMinWidth: number, defMaxWidth: number) {
    return {
        minWidth: hlp.getValueTyped(props, `columnWidths.${fieldName}`, defMinWidth),
        maxWidth: hlp.getValueTyped(props, `columnWidths.${fieldName}`, defMaxWidth),
    };
}

/**
 * Title column
 * 
 * @param {IEventListProps} props Props
 * @param {string} fieldName Field name
 * 
 * @ignore
 */
export const Title = (props: IEventListProps, fieldName: string = 'title') => col(
    fieldName,
    'Title',
    { ...getSizing(props, fieldName, 320, 400) },
    (event: ITimeEntry) => <a href={event.webLink} target='_blank' className='truncate' title={event.title}>{event.title}</a>,
);


/**
 * Time column
 * 
 * @param {IEventListProps} props Props
 * @param {string} fieldName Field name
 * 
 * @ignore
 */
export const Time = (props: IEventListProps, fieldName: string = 'time') => col(
    fieldName,
    'Time',
    { ...getSizing(props, fieldName, 90, 90) },
    (event: ITimeEntry) => {
        return (
            <span>
                {hlp.formatDate(event.startTime, props.dateFormat)} - {hlp.formatDate(event.endTime, props.dateFormat)}
            </span>
        )
    }
);

/**
 * Duration column
 * 
 * @param {IEventListProps} props Props
 * @param {string} fieldName Field name
 * 
 * @ignore
 */
export const Duration = (props: IEventListProps, fieldName: string = 'durationMinutes') => col(
    fieldName,
    'Duration',
    { ...getSizing(props, fieldName, 75, 75) },
    (event: ITimeEntry) => <DurationDisplay minutes={event.durationMinutes} />
);

/**
 * Project column
 * 
 * @param {IEventListProps} props Props
 * @param {string} fieldName Field name
 * 
 * @ignore
 */
export const Project = (props: IEventListProps, fieldName: string = 'project') => col(
    fieldName,
    'Project',
    { ...getSizing(props, fieldName, 350, 350) },
    (event: ITimeEntry) => <ProjectColumn {...props.projectColumn} event={event} />
);

/**
 * All columns
 * 
 * @param {IEventListProps} props Props
 * 
 * @ignore
 */
export const GetAll = (props: IEventListProps) => [Title(props), Time(props), Duration(props), Project(props)];