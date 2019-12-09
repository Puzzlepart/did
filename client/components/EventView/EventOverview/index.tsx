
import { List, IColumn } from 'components/List';
import * as React from 'react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { IEventOverviewProps } from './IEventOverviewProps';
import { generateColumn as col } from 'utils/generateColumn';
import * as _ from 'underscore';
import { IProject, ICalEvent } from 'models';
import { startOfWeek, formatDate } from 'helpers';

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
        )
    } else {
        return (
            <>
                <div style={{ display: 'inline-block', marginRight: 10 }}>
                    <Icon iconName={row.project.icon || 'Page'} styles={{ root: { fontSize: 18 } }} />
                </div>
                <div style={{ display: 'inline-block' }}>
                    <div>{row.project.name}</div>
                    <div style={{ fontSize: '7pt' }}>for {row.customer.name}</div>
                </div>
            </>
        )
    }
}

/**
 * Create columns
 *
* @param {number} weekNumber Week number
*/
const CreateColumns = (weekNumber: number) => {
    return [
        col('label', '', { minWidth: 270, maxWidth: 270 }, (row: any) => <LabelColumn row={row} />),
        ...Array.from(Array(7).keys()).map(i => {
            const day = startOfWeek(weekNumber).add(i, 'days');
            return col(day.format('L'), day.format('ddd Do'), { maxWidth: 70, minWidth: 70 });
        }),
        col('sum', 'Sum')
    ];
}

/**
 * Generate project rows
 *
* @param {IProject[]} projects Project
* @param {ICalEvent[]} events Events
* @param {IColumn[]} columns Columns
*/
const GenerateProjectRows = (projects: IProject[], events: ICalEvent[], columns: IColumn[]) => {
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
* @param {ICalEvent[]} events Events
* @param {IColumn[]} columns Columns
            */
const GenerateTotalRow = (events: ICalEvent[], columns: IColumn[]) => {
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
    const columns = CreateColumns(props.weekNumber);
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