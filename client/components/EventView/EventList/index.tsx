
import { List } from 'components/List';
import { getValueTyped as value, formatDate } from 'helpers';
import { ITimeEntry } from 'models';
import * as React from 'react';
import { generateColumn as col } from 'utils/generateColumn';
import { CustomerLink } from './CustomerLink';
import { DurationDisplay } from './DurationDisplay';
import { IEventListProps } from './IEventListProps';
import { ProjectColumn } from './ProjectColumn';
import { eventNames } from 'cluster';

export const EventList = (props: IEventListProps) => {
    const columns = [
        col(
            'title',
            'Title',
            { maxWidth: value(props, 'columnWidths.title', 400), minWidth: value(props, 'columnWidths.title', 320) },
            (event: ITimeEntry) => <a href={event.webLink} target='_blank'>{event.title}</a>,
        ),
        col(
            'time',
            'Time',
            { maxWidth: value(props, 'columnWidths.time', 90), minWidth: value(props, 'columnWidths.time', 90) },
            (event: ITimeEntry) => {
                return (
                    <span>
                        {formatDate(event.startTime, props.dateFormat)} - {formatDate(event.endTime, props.dateFormat)}
                    </span>
                )
            }
        ),
        col(
            'durationMinutes',
            'Duration',
            { maxWidth: value(props, 'columnWidths.durationMinutes', 75), minWidth: value(props, 'columnWidths.durationMinutes', 75) },
            (event: ITimeEntry) => <DurationDisplay minutes={event.durationMinutes} />),
        col(
            'project',
            'Project',
            { maxWidth: value(props, 'columnWidths.project', 300), minWidth: value(props, 'columnWidths.project', 300) },
            (event: ITimeEntry) => (
                <ProjectColumn
                    event={event}
                    isConfirmed={props.isLocked}
                    onProjectSelected={project => props.onProjectSelected(event, project)}
                    onProjectClear={evt => {
                        evt.stopPropagation();
                        evt.preventDefault();
                        props.onProjectClear(event);
                    }}
                    onProjectIgnore={evt => {
                        evt.stopPropagation();
                        evt.preventDefault();
                        props.onProjectIgnore(event);
                    }} />
            )),
        col(
            'customer',
            'Customer',
            { maxWidth: value(props, 'columnWidths.customer', 150), minWidth: value(props, 'columnWidths.customer', 150) },
            (event: ITimeEntry) => <CustomerLink customer={event.customer} />,
        ),
    ].filter(col => (props.hideColumns || []).indexOf(col.key) === -1);

    return (
        <div style={{ marginBottom: 250 }}>
            <List
                enableShimmer={props.enableShimmer}
                columns={columns}
                items={props.events}
                groups={props.groups} />
        </div>
    );
}