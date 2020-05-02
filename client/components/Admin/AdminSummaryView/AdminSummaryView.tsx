
import { useQuery } from '@apollo/react-hooks';
import { SummaryView, SummaryViewType } from 'components/Timesheet/SummaryView';
import { TimesheetContext } from 'components/Timesheet';
import { getValueTyped as value } from 'helpers';
import * as moment from 'moment';
import { IPivotItemProps, Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import * as React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import * as _ from 'underscore';
import TIME_ENTRIES from './TIME_ENTRIES';
import { IAdminSummaryViewProps } from './IAdminSummaryViewProps';
require('moment/locale/en-gb');

/**
 * Create periods
 * 
 * @param {number} range Range
 */
function createPeriods(range: number): IPivotItemProps[] {
    let periods = [];
    for (let i = range; i >= 0; i--) {
        const key = (moment().year() - i).toString();
        periods.push({ key, itemKey: key, headerText: key });
    }
    return periods;
}

export interface IAdminSummaryViewParams {
    year?: string;
}

/**
 * @category AdminView
 */
export const AdminSummaryView = (props: IAdminSummaryViewProps) => {
    const history = useHistory();
    const params = useParams<IAdminSummaryViewParams>();
    const year = params.year || moment().year().toString();
    const [range, setRange] = React.useState<number>(3);
    const { data, loading } = useQuery<{ timeentries: any[] }>(TIME_ENTRIES, {
        fetchPolicy: 'cache-first',
        variables: { yearNumber: parseInt(year) },
    });
    const timeentries = (data ? data.timeentries : [])

    let periods = createPeriods(2);

    const onNavigate = (year: string) => history.push(`/admin/summary/${year}`);

    return (
        <TimesheetContext.Provider value={{ loading }}>
            <Pivot
                defaultSelectedKey={year}
                onLinkClick={({ props }) => onNavigate(year)}
                styles={{ itemContainer: { paddingTop: 10 } }}>
                {periods.map(itemProps => (
                    <PivotItem {...itemProps}>
                        <Pivot styles={{ itemContainer: { paddingTop: 10 } }}>
                            <PivotItem key='month' itemKey='month' headerText='Month' itemIcon='Calendar'>
                                {!loading && (
                                    <Slider
                                        valueFormat={value => `Show last ${value} months`}
                                        min={1}
                                        max={_.unique(timeentries, e => e.monthNumber).length}
                                        defaultValue={range}
                                        onChange={value => setRange(value)} />
                                )}
                                {loading && <ProgressIndicator />}
                                <SummaryView
                                    entries={timeentries}
                                    type={SummaryViewType.AdminMonth}
                                    range={range}
                                    exportFileNameTemplate='Summary-Month-{0}.xlsx' />
                            </PivotItem>
                            <PivotItem key='week' itemKey='week' headerText='Week' itemIcon='CalendarWeek'>
                                {!loading && (
                                    <Slider
                                        valueFormat={value => `Show last ${value} weeks`}
                                        min={1}
                                        max={_.unique(timeentries, e => e.weekNumber).length}
                                        defaultValue={range}
                                        onChange={value => setRange(value)} />
                                )}
                                {loading && <ProgressIndicator />}
                                <SummaryView
                                    entries={timeentries}
                                    type={SummaryViewType.AdminWeek}
                                    range={range}
                                    exportFileNameTemplate='Summary-Week-{0}.xlsx' />
                            </PivotItem>
                        </Pivot>
                    </PivotItem>
                ))}
            </Pivot>
        </TimesheetContext.Provider >
    );
}