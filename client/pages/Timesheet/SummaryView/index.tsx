
import { DurationColumn } from 'components/DurationColumn';
import { LabelColumn } from 'components/LabelColumn';
import List from 'components/List';
import resource from 'i18n';
import { IProject } from 'interfaces';
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import * as React from 'react';
import { unique } from 'underscore';
import { capitalize } from 'underscore.string';
import dateUtils from 'utils/date';
import { TimesheetContext } from '../';
import { TimesheetScope } from '../TimesheetScope';
import styles from './SummaryView.module.scss';

function createColumns(scope: TimesheetScope) {
    const onRender = (row: any, _index: number, col: IColumn) => (
        <DurationColumn row={row} column={col} />
    );
    const columns = Array.from(Array(7).keys()).map(i => {
        const day = scope.getDay(i);
        return {
            key: day.format('L'),
            fieldName: day.format('L'),
            name: capitalize(day.format('ddd DD')),
            minWidth: 70,
            maxWidth: 70,
            onRender,
        }
    });
    return [
        {
            key: 'label',
            fieldName: 'label',
            name: '',
            minWidth: 350,
            maxWidth: 350,
            isMultiline: true,
            isResizable: true,
            onRender: (row: any) => <LabelColumn row={row} />,
        },
        ...columns,
        {
            key: 'sum',
            fieldName: 'sum',
            name: 'Sum',
            minWidth: 50,
            maxWidth: 50,
            isResizable: false,
            data: { style: { fontWeight: 500 } },
            onRender,
        },
    ]
}

function generateRows(events: any[], columns: IColumn[]) {
    const projects = unique(events.map(e => e.project), (p: IProject) => p.id);
    return projects.map(project => {
        const projectEvents = events.filter(event => event.project.id === project.id);
        return [...columns].splice(1, columns.length - 2).reduce((obj, col) => {
            const sum = [...projectEvents]
                .filter(event => dateUtils.formatDate(event.startTime, 'L') === col.fieldName)
                .reduce((sum, event) => sum += event.durationHours, 0);
            obj[col.fieldName] = sum;
            obj.sum += sum;
            return obj;
        }, { sum: 0, project, customer: project.customer })
    });
}

function generateTotalRow(events: any[], columns: IColumn[]) {
    return [...columns].splice(1, columns.length - 2).reduce((obj, col) => {
        const sum = [...events]
            .filter(event => dateUtils.formatDate(event.startTime, 'L') === col.fieldName)
            .reduce((sum, event) => sum += event.durationHours, 0);
        obj[col.fieldName] = sum;
        obj.sum += sum;
        return obj;
    }, { label: resource('COMMON.SUM_LABEL'), sum: 0 });
}

/**
 * @component SummaryView
 * @description Generates a summary view of events
 */
export const SummaryView = () => {
    const context = React.useContext(TimesheetContext);
    const columns = createColumns(context.scope);

    const events = context.selectedPeriod.events.filter(e => e.project);

    const items = [
        ...generateRows(events, columns),
        generateTotalRow(events, columns),
    ];

    return (
        <div className={styles.root}>
            <List {...{ columns, items }} enableShimmer={context && !!context.loading} />
        </div>
    );
}
