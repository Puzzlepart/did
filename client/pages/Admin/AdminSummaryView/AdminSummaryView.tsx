
import { useQuery } from '@apollo/react-hooks';
import { SummaryView, SummaryViewType } from 'pages/Timesheet/SummaryView';
import * as moment from 'moment';
import { IPivotItemProps, Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import * as React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import * as _ from 'underscore';
import TIME_ENTRIES from './TIME_ENTRIES';
require('moment/locale/en-gb');

/**
 * Create periods
 * 
 * @param {number} range Range
 */
function createPeriods(range: number): IPivotItemProps[] {
    const periods = [];
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
 * @category Admin
 */
export const AdminSummaryView = (): JSX.Element => {
    const history = useHistory();
    const params = useParams<IAdminSummaryViewParams>();
    const year = params.year || moment().year().toString();
    const [range, setRange] = React.useState<number>(3);
    const { data, loading } = useQuery<{ timeentries: any[] }>(TIME_ENTRIES, {
        fetchPolicy: 'cache-first',
        variables: { yearNumber: parseInt(year) },
    });
    const timeentries = (data ? data.timeentries : []).filter(e => e.monthNumber > 0);

    const periods = createPeriods(2);

    const onNavigate = (year: string) => history.push(`/admin/summary/${year}`);

    return (
            <Pivot
                defaultSelectedKey={year}
                onLinkClick={({ props }) => onNavigate(props.itemKey)}
                styles={{ itemContainer: { paddingTop: 10 } }}>
                {periods.map(itemProps => (
                    <PivotItem key={itemProps.itemKey} {...itemProps}>
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
    );
}