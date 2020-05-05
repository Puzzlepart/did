
import List from 'common/components/List';
import { formatDate, sortAlphabetically } from 'helpers';
import { ICustomer, IProject } from 'interfaces';
import * as moment from 'moment';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import * as React from 'react';
import * as format from 'string-format';
import * as _ from 'underscore';
import * as excelUtils from 'utils/exportExcel';
import { generateColumn as col } from 'utils/generateColumn';
import { TimesheetContext } from '../';
import { TimesheetScope } from '../TimesheetScope';
import { DurationColumn } from './DurationColumn';
import { ISummaryViewProps } from './ISummaryViewProps';
import { LabelColumn } from './LabelColumn';
import { SummaryViewType } from './SummaryViewType';

/**
 * Create columns
 * 
 * @param type 
 * @param scope 
 * @param entries 
 * @param range 
 * 
 * @category Timesheet
 */
function createColumns(type: SummaryViewType, scope: TimesheetScope, entries: any[], range?: number) {
    let columns = [];
    const onRender = (row: any, _index: number, col: IColumn) => <DurationColumn row={row} column={col} />;
    switch (type) {
        case SummaryViewType.UserWeek: {
            columns = Array.from(Array(7).keys()).map(i => {
                const day = scope.getDay(i);
                return col(day.format('L'), day.format('ddd DD'), { maxWidth: 70, minWidth: 70 }, onRender);
            });
        }
            break;
        case SummaryViewType.AdminWeek: {
            const weekNumbers = _.unique(entries.map(e => e.weekNumber), w => w).sort((a, b) => a - b);
            columns = weekNumbers.map(wn => col(wn, `Week ${wn}`, { maxWidth: 70, minWidth: 70 }, onRender));
        }
            break;
        case SummaryViewType.AdminMonth: {
            const monthNumbers = _.unique(entries.map(e => e.monthNumber), m => m).sort((a, b) => a - b);
            columns = monthNumbers.map(mn => col(mn, moment().month(mn - 1).format('MMM'), { maxWidth: 70, minWidth: 70 }, onRender));
        }
            break;
        default: {
            return [];
        }
    }
    if (range) columns = [].concat(columns).splice(columns.length - range);
    return [
        col('label', '', { minWidth: 350, maxWidth: 350, isMultiline: true, isResizable: true }, (row: any) => <LabelColumn row={row} />),
        ...columns,
        col('sum', 'Sum', { minWidth: 50, maxWidth: 50, isResizable: false, data: { style: { fontWeight: 500 } } }, onRender),
    ];
}

/**
 * Generate project rows
 *
 * @param {ISummaryViewProps} props Props
 * @param {any[]} events Events
 * @param {IColumn[]} columns Columns
*/
function generateRows({ type }: ISummaryViewProps, events: any[], columns: IColumn[]) {
    switch (type) {
        case SummaryViewType.UserWeek: {
            const projects = _.unique(events.map(e => e.project), (p: IProject) => p.id);
            return projects.map(project => {
                const projectEvents = events.filter(event => event.project.id === project.id);
                return [...columns].splice(1, columns.length - 2).reduce((obj, col) => {
                    const sum = [...projectEvents]
                        .filter(event => formatDate(event.startTime, 'L') === col.fieldName)
                        .reduce((sum, event) => sum += event.durationHours, 0);
                    obj[col.fieldName] = sum;
                    obj.sum += sum;
                    return obj;
                }, { sum: 0, project, customer: project.customer })
            });
        }
        case SummaryViewType.AdminWeek: {
            const resources = sortAlphabetically(_.unique(events.map(e => e.resourceName), r => r));
            return resources.map(res => {
                const resourceEvents = events.filter(event => event.resourceName === res);
                return [...columns].splice(1, columns.length - 2).reduce((obj, col) => {
                    const sum = [...resourceEvents]
                        .filter(event => event.weekNumber === col.fieldName)
                        .reduce((sum, event) => sum += event.durationHours, 0);
                    obj[col.fieldName] = sum;
                    obj.sum += sum;
                    return obj;
                }, { label: res, sum: 0 })
            });
        }
        case SummaryViewType.AdminMonth: {
            const resources = sortAlphabetically(_.unique(events.map(e => e.resourceName), r => r));
            return resources.map(res => {
                const resourceEvents = events.filter(event => event.resourceName === res);
                return [...columns].splice(1, columns.length - 2).reduce((obj, col) => {
                    const sum = [...resourceEvents]
                        .filter(event => event.monthNumber === col.fieldName)
                        .reduce((sum, event) => sum += event.durationHours, 0);
                    obj[col.fieldName] = sum;
                    obj.sum += sum;
                    return obj;
                }, { label: res, sum: 0 })
            });
        }
        default: {
            return [];
        }
    }
}

/**
* Generate total row
*
 * @param {ISummaryViewProps} props Props
 * @param {any[]} events Events
 * @param {IColumn[]} columns Columns
*/
function generateTotalRow({ type }: ISummaryViewProps, events: any[], columns: IColumn[]) {
    switch (type) {
        case SummaryViewType.UserWeek: {
            return [...columns].splice(1, columns.length - 2).reduce((obj, col) => {
                const sum = [...events]
                    .filter(event => formatDate(event.startTime, 'L') === col.fieldName)
                    .reduce((sum, event) => sum += event.durationHours, 0);
                obj[col.fieldName] = sum;
                obj.sum += sum;
                return obj;
            }, { label: 'Total', sum: 0 });
        }
        case SummaryViewType.AdminWeek: {
            return [...columns].splice(1, columns.length - 2).reduce((obj, col) => {
                const sum = [...events]
                    .filter(event => event.weekNumber === col.fieldName)
                    .reduce((sum, event) => sum += event.durationHours, 0);
                obj[col.fieldName] = sum;
                obj.sum += sum;
                return obj;
            }, { label: 'Total', sum: 0 });
        }
        case SummaryViewType.AdminMonth: {
            return [...columns].splice(1, columns.length - 2).reduce((obj, col) => {
                const sum = [...events]
                    .filter(event => event.monthNumber === col.fieldName)
                    .reduce((sum, event) => sum += event.durationHours, 0);
                obj[col.fieldName] = sum;
                obj.sum += sum;
                return obj;
            }, { label: 'Total', sum: 0 });
        }
        default: {
            return [];
        }
    }
}

/**
* Get customer options
*
* @param {any[]} events Events
* @param {React.Dispatch<React.SetStateAction<IContextualMenuItem>>} setCustomer Set customer
*/
function createCustomerOptions(events: any[], setCustomer: React.Dispatch<React.SetStateAction<IContextualMenuItem>>): IContextualMenuItem[] {
    let customers = _.unique(events.map(e => e.customer), (c: ICustomer) => c.id);
    customers = _.sortBy(customers, 'name');

    return [
        { key: 'All', text: 'All customers' },
        ...customers.map(c => ({ key: c.id, text: c.name })),
    ].map(opt => ({
        ...opt,
        onClick: () => setCustomer(opt),
    }));
}

/**
 * @component SummaryView
 * @description Generates a summary view of events
 * 
 * @param {ISummaryViewProps} props Props
 */
export const SummaryView = (props: ISummaryViewProps) => {
    const context = React.useContext(TimesheetContext);
    let entries = props.entries || context.selectedPeriod.events;
    const [customer, setCustomer] = React.useState<IContextualMenuItem>({ key: 'All', text: 'All customers' });
    const columns = createColumns(props.type, context && context.scope, entries, props.range);
    entries = entries.filter(e => !!e.project);
    const customerOptions = createCustomerOptions(entries, setCustomer);

    if (customer.key !== 'All') entries = entries.filter(e => e.customer.id === customer.key);

    const items = [
        ...generateRows(props, entries, columns),
        generateTotalRow(props, entries, columns),
    ];

    const commands: IContextualMenuItem[] = [
        {
            key: 'CUSTOMER_OPTIONS',
            name: customer.text,
            subMenuProps: { items: customerOptions }
        },
    ]
    if (props.exportFileNameTemplate) {
        commands.push({
            key: 'EXPORT_TO_EXCEL',
            text: 'Export to Excel',
            iconProps: { iconName: 'ExcelDocument' },
            onClick: () => {
                excelUtils.exportExcel(items, { columns, fileName: format(props.exportFileNameTemplate, new Date().getTime()) });
            },
        });
    }

    return (
        <>
            <CommandBar styles={{ root: { padding: 0 } }} items={commands} />
            <List {...{ columns, items }} enableShimmer={context && !!context.loading} />
        </>
    );
}

export { SummaryViewType };

