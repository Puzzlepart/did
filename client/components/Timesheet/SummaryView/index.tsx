
import { IColumn, List } from 'components/List';
import { formatDate, startOfWeek } from 'helpers';
import { IProject, ICustomer } from 'models';
import * as moment from 'moment-timezone';
import * as React from 'react';
import * as _ from 'underscore';
import { generateColumn as col } from 'utils/generateColumn';
import { ITimesheetPeriod } from '../ITimesheetPeriod';
import { ISummaryViewProps } from './ISummaryViewProps';
import { SummaryViewType } from "./SummaryViewType";
import { LabelColumn } from './LabelColumn';
import { DurationColumn } from './DurationColumn';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

/**
 * Create columns
 *
 * @param {ISummaryViewProps} props Props
*/
function createColumns({ events, type, period, maxColumns }: ISummaryViewProps) {
    let columns = [];
    switch (type) {
        case SummaryViewType.UserWeek: {
            columns = Array.from(Array(7).keys()).map(i => {
                const day = startOfWeek(period.startDateTime).add(i as moment.DurationInputArg1, 'days' as moment.DurationInputArg2);
                return col(day.format('L'), day.format('ddd DD'), { maxWidth: 70, minWidth: 70 }, (row: any, _index: number, col: IColumn) => <DurationColumn row={row} column={col} />);
            });
        }
        case SummaryViewType.Admin: {
            const weekNumbers = _.unique(events.map(e => e.weekNumber), w => w).sort((a, b) => a - b);
            columns = weekNumbers.map(wn => {
                return col(wn, `Week ${wn}`, { maxWidth: 70, minWidth: 70 }, (row: any, _index: number, col: IColumn) => <DurationColumn row={row} column={col} />);
            });
        }
    }
    console.log(columns);
    if (maxColumns) columns = [].concat(columns).splice(columns.length - maxColumns);
    console.log(columns, maxColumns);
    return [
        col('label', '', { minWidth: 350, maxWidth: 350, isMultiline: true, isResizable: true }, (row: any) => <LabelColumn row={row} />),
        ...columns,
        col('sum', 'Sum', { minWidth: 50, maxWidth: 50, isResizable: false, data: { style: { fontWeight: 500 } } }, (row: any) => <div style={{ fontWeight: 500 }}>{row.sum}</div>),
    ];
}

/**
 * Generate project rows
 *
 * @param {ISummaryViewProps} props Props
 * @param {IColumn[]} columns Columns
*/
function generateRows({ events, type }: ISummaryViewProps, columns: IColumn[]) {
    switch (type) {
        case SummaryViewType.UserWeek: {
            let projects = _.unique(events.map(e => e.project), (p: IProject) => p.id);
            return projects.map(project => {
                let projectEvents = events.filter(event => event.project.id === project.id);
                return [...columns].splice(1, columns.length - 2).reduce((obj, col) => {
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
        case SummaryViewType.Admin: {
            let resources = _.unique(events.map(e => e.resourceName), r => r);
            return resources.map(res => {
                let resourceEvents = events.filter(event => event.resourceName === res);
                return [...columns].splice(1, columns.length - 2).reduce((obj, col) => {
                    obj[col.fieldName] = [...resourceEvents]
                        .filter(event => event.weekNumber === col.fieldName)
                        .reduce((sum, event) => sum += event.durationHours, 0);
                    return obj;
                },
                    {
                        sum: resourceEvents.reduce((sum, event) => sum += event.durationHours, 0),
                        label: res,
                    })
            });
        }
    }
}

/**
* Generate total row
*
 * @param {ISummaryViewProps} props Props
 * @param {IColumn[]} columns Columns
*/
function generateTotalRow({ events, type }: ISummaryViewProps, columns: IColumn[]) {
    switch (type) {
        case SummaryViewType.UserWeek: {
            return [...columns].splice(1, columns.length - 2).reduce((obj, col) => {
                obj[col.fieldName] = [...events]
                    .filter(event => formatDate(event.startTime, 'L') === col.fieldName)
                    .reduce((sum, event) => sum += event.durationHours, 0);
                return obj;
            }, {
                label: 'Total',
                sum: events.reduce((sum, event) => sum += event.durationHours, 0),
            });
        }
        case SummaryViewType.Admin: {
            return [...columns].splice(1, columns.length - 2).reduce((obj, col) => {
                obj[col.fieldName] = [...events]
                    .filter(event => event.weekNumber === col.fieldName)
                    .reduce((sum, event) => sum += event.durationHours, 0);
                return obj;
            }, {
                label: 'Total',
                sum: events.reduce((sum, event) => sum += event.durationHours, 0),
            });
        }
    }
}

/**
* Get customer options
*
* @param {any[]} events Events
*/
function getCustomerOptions(events: any[]): IDropdownOption[] {
    let customers = _.unique(events.map(e => e.customer), (c: ICustomer) => c.id);

    return [
        { key: 'All', text: 'All customers' },
        ...customers.map(c => ({ key: c.id, text: c.name })),
    ];
}

/**
 * @component SummaryView
 * @description Generates a summary view of events
 * 
 * @param {ISummaryViewProps} props Props
 */
export const SummaryView = (props: ISummaryViewProps) => {
    const [customerId, setCustomerId] = React.useState<string>('All');
    const columns = createColumns(props);
    let events = props.events.filter(e => !!e.project);
    let customerOptions = getCustomerOptions(events);

    if (customerId !== 'All') events = events.filter(e => e.customer.id === customerId);

    let items = [
        ...generateRows(props, columns),
        generateTotalRow(props, columns),
    ];

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
                items={items} />
        </div>
    );
}

export { SummaryViewType };