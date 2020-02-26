
import { IColumn, List } from 'components/List';
import { formatDate, startOfWeek } from 'helpers';
import { IProject, ITimeEntry, ICustomer } from 'models';
import * as moment from 'moment-timezone';
import * as React from 'react';
import * as _ from 'underscore';
import { generateColumn as col } from 'utils/generateColumn';
import { ITimesheetPeriod } from '../ITimesheetPeriod';
import { ISummaryViewProps } from './ISummaryViewProps';
import { LabelColumn } from './LabelColumn';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

/**
 * Create columns
 *
* @param {ITimesheetPeriod} period Period
*/
function createColumns(period: ITimesheetPeriod) {
    return [
        col('label', '', { minWidth: 270, maxWidth: 270, isMultiline: true, isResizable: false }, (row: any) => <LabelColumn row={row} />),
        ...Array.from(Array(7).keys()).map(i => {
            const day = startOfWeek(period.startDateTime).add(i as moment.DurationInputArg1, 'days' as moment.DurationInputArg2);
            return col(day.format('L'), day.format('ddd DD'), { maxWidth: 70, minWidth: 70 });
        }),
        col('sum', 'Sum', { minWidth: 50, maxWidth: 50, isResizable: false })
    ];
}

/**
 * Generate project rows
 *
* @param {IProject[]} projects Project
* @param {ITimeEntry[]} events Events
* @param {IColumn[]} columns Columns
*/
function generateProjectRows(projects: IProject[], events: ITimeEntry[], columns: IColumn[]) {
    return projects.map(project => {
        let projectEvents = events.filter(event => event.project.id === project.id);
        return [...columns].splice(1, 7).reduce((obj, col) => {
            obj[col.fieldName] = [...projectEvents]
                .filter(event => formatDate(event.startTime, 'L') === col.fieldName)
                .reduce((sum, event) => sum += event.durationHours, 0);
            return obj;
        },
            {
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
function generateTotalRow(events: ITimeEntry[], columns: IColumn[]) {
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
 * @component SummaryView
 * @description Generates a summary view of the events for the selected period/week
 */
export const SummaryView = (props: ISummaryViewProps) => {
    const [customerId, setCustomerId] = React.useState<string>('All');

    const columns = createColumns(props.period);
    console.log(columns);
    let events = props.events.filter(e => !!e.project);
    let customers = _.unique(events.map(e => e.customer), (c: ICustomer) => c.id);

    const customerOptions: IDropdownOption[] = [
        { key: 'All', text: 'All customers' },
        ...customers.map(c => ({ key: c.id, text: c.name })),
    ];

    if (customerId !== 'All') events = events.filter(e => e.customer.id === customerId);


    let projects = _.unique(events.map(e => e.project), (p: IProject) => p.id);

    return (
        <div className='c-Timesheet-summary'>
            <Dropdown
                className='c-Timesheet-summary-customerDropdown'
                options={customerOptions}
                onChange={(_event, opt) => setCustomerId(opt.key as string)}
                selectedKey={customerId} />
            <List
                enableShimmer={props.enableShimmer}
                columns={columns}
                items={[
                    ...generateProjectRows(projects, events, columns),
                    generateTotalRow(events, columns)
                ]} />
        </div>
    );
}