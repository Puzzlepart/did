
import * as helpers from 'helpers';
import resource from 'i18n';
import { ITimeEntry } from 'interfaces';
import * as React from 'react';
import dateUtils from 'utils/date';
import { generateColumn as col } from 'utils/generateColumn';
import { IColumn } from '../List';
import { DurationDisplay } from './DurationDisplay';
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
function getSizing(props: IEventListProps, fieldName: string, defMinWidth: number, defMaxWidth: number): { minWidth: number; maxWidth: number } {
    return {
        minWidth: helpers.value(props, `columnWidths.${fieldName}`, defMinWidth),
        maxWidth: helpers.value(props, `columnWidths.${fieldName}`, defMaxWidth),
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
export const Title = (props: IEventListProps, fieldName = 'title'): IColumn => col(
    fieldName,
    resource('COMMON.TITLE_LABEL'),
    { ...getSizing(props, fieldName, 320, 400) },
    (event: ITimeEntry) => <a href={event.webLink} target='_blank' rel='noopener noreferrer' className='truncate' title={event.title}>{event.title}</a>,
);


/**
 * Time column
 * 
 * @param {IEventListProps} props Props
 * @param {string} fieldName Field name
 * 
 * @ignore
 */
export const Time = (props: IEventListProps, fieldName = 'time'): IColumn => col(
    fieldName,
    resource('COMMON.TIME_LABEL'),
    { ...getSizing(props, fieldName, 90, 90) },
    (event: ITimeEntry) => {
        return (
            <span>
                {dateUtils.formatDate(event.startTime, props.dateFormat)} - {dateUtils.formatDate(event.endTime, props.dateFormat)}
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
export const Duration = (props: IEventListProps, fieldName = 'durationMinutes'): IColumn => col(
    fieldName,
    resource('COMMON.DURATION_LABEL'),
    { ...getSizing(props, fieldName, 75, 75) },
    (event: ITimeEntry) => <DurationDisplay minutes={event.durationMinutes} />
);