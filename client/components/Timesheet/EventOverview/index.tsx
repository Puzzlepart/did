
import { IColumn, List } from 'components/List';
import { formatDate, startOfWeek } from 'helpers';
import { IProject, ITimeEntry } from 'models';
import * as moment from 'moment-timezone';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import * as React from 'react';
import * as _ from 'underscore';
import { generateColumn as col } from 'utils/generateColumn';
import { ITimesheetPeriod } from '../ITimesheetPeriod';
import { IEventOverviewProps } from './IEventOverviewProps';

/**
 * @component LabelColumn
 * @description 
 */
const LabelColumn = ({ row }) => {
    if (row.label) {
        return (
            <div>
                {row.label}
            </div>
        );
    } else {
        return (
            <>
                <div style={{ display: 'inline-block', verticalAlign: 'top', width: 30 }}>
                    <Icon iconName={row.project.icon || 'Page'} styles={{ root: { fontSize: 18 } }} />
                </div>
                <div style={{ display: 'inline-block', verticalAlign: 'top', width: 'calc(100% - 30px)' }}>
                    <div>{row.project.name}</div>
                    <div style={{ fontSize: '7pt' }}>for {row.customer.name}</div>
                </div>
            </>
        );
    }
}

/**
 * Create columns
 *
* @param {ITimesheetPeriod} period Period
*/
const CreateColumns = (period: ITimesheetPeriod) => {
    return [
        col('label', '', { minWidth: 50, maxWidth: 270, isMultiline: true }, (row: any) => <LabelColumn row={row} />),
        ...Array.from(Array(7).keys()).map(i => {
            const day = startOfWeek(undefined, undefined, period.startDateTime).add(i as moment.DurationInputArg1, 'days' as moment.DurationInputArg2);
            return col(day.format('L'), day.format('ddd Do'), { maxWidth: 70, minWidth: 70 });
        }),
        col('sum', 'Sum')
    ];
}

/**
 * Generate project rows
 *
* @param {IProject[]} projects Project
* @param {ITimeEntry[]} events Events
* @param {IColumn[]} columns Columns
*/
const GenerateProjectRows = (projects: IProject[], events: ITimeEntry[], columns: IColumn[]) => {
    return projects.map(project => {
        let projectEvents = events.filter(event => event.project.id === project.id);
        return [...columns].splice(1, 7).reduce((obj, col) => {
            obj[col.fieldName] = [...projectEvents]
                .filter(event => formatDate(event.startTime, 'L') === col.fieldName)
                .reduce((sum, event) => sum += event.durationHours, 0);
            return obj;
        }, {
            sum: projectEvents.reduce((sum, event) => sum += event.durationHours, 0),
            project,
            customer: project.customer,
        })
    });
}

/**
 * Generate total row
 *
* @param {ITimeEntry[]} events Events
* @param {IColumn[]} columns Columns
            */
const GenerateTotalRow = (events: ITimeEntry[], columns: IColumn[]) => {
    return [...columns].splice(1, 7).reduce((obj, col) => {
        obj[col.fieldName] = [...events]
            .filter(event => formatDate(event.startTime, 'L') === col.fieldName)
            .reduce((sum, event) => sum += event.durationHours, 0);
        return obj;
    }, {
        label: 'Total',
        sum: events.reduce((sum, event) => sum += event.durationHours, 0),
    });
}

/**
 * @component EventOverview
 * @description
 */
export const EventOverview = (props: IEventOverviewProps) => {
    const columns = CreateColumns(props.period);
    const events = props.events.filter(e => !!e.project);
    const projects = _.unique(events.map(e => e.project), p => p.id);
    const projectRows = GenerateProjectRows(projects, events, columns);
    const totalRow = GenerateTotalRow(events, columns);

    return (
        <div>
            <List
                enableShimmer={props.enableShimmer}
                columns={columns}
                items={[...projectRows, totalRow]} />
        </div>
    );
}