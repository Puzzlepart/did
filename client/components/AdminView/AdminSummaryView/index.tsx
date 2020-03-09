
import { useQuery } from '@apollo/react-hooks';
import { SummaryView, SummaryViewType } from 'components/Timesheet/SummaryView';
import { getValueTyped as value } from 'helpers';
import * as moment from 'moment';
import { IPivotItemProps, Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import * as React from 'react';
import * as _ from 'underscore';
import { GET_CONFIRMED_TIME_ENTRIES } from './GET_CONFIRMED_TIME_ENTRIES';
import { IAdminSummaryViewProps } from './IAdminSummaryViewProps';
require('moment/locale/en-gb');

/**
 * @component AdminSummaryView
 * @description Shows SummaryView type Admin
 * 
 * @param {IAdminSummaryViewProps} props Props
 */
export const AdminSummaryView = (props: IAdminSummaryViewProps) => {
    const [year, setYear] = React.useState<number>(moment().year());
    const [range, setRange] = React.useState<number>(props.defaultRange);
    const { data, loading } = useQuery(GET_CONFIRMED_TIME_ENTRIES, {
        fetchPolicy: 'cache-first',
        variables: { yearNumber: year },
    });
    let entries = value<any[]>(data, 'result.entries', []).filter(e => e.monthNumber > 0);

    let periods: IPivotItemProps[] = [moment().year() - 2, moment().year() - 1, moment().year()].map(year => ({
        key: `${year}`,
        itemKey: `${year}`,
        headerText: `${year}`,
    }));

    return (
        <Pivot
            defaultSelectedKey={moment().year().toString()}
            onLinkClick={item => setYear(parseInt(item.props.itemKey))}
            styles={{ itemContainer: { paddingTop: 10 } }}>
            {periods.map(itemProps => (
                <PivotItem {...itemProps}>
                    <Pivot defaultSelectedKey='month' styles={{ itemContainer: { paddingTop: 10 } }}>
                        <PivotItem key='month' itemKey='month' headerText='Month' itemIcon='Calendar'>
                            {!loading && (
                                <Slider
                                    valueFormat={value => `Show last ${value} months`}
                                    min={1}
                                    max={_.unique(entries, e => e.monthNumber).length}
                                    defaultValue={range}
                                    onChange={value => setRange(value)} />
                            )}
                            {loading && <ProgressIndicator />}
                            <SummaryView
                                enableShimmer={loading}
                                events={entries}
                                type={SummaryViewType.AdminMonth}
                                range={range}
                                exportFileNameTemplate='Summary-Month-{0}.xlsx' />
                        </PivotItem>
                        <PivotItem key='week' itemKey='week' headerText='Week' itemIcon='CalendarWeek'>
                            {!loading && (
                                <Slider
                                    valueFormat={value => `Show last ${value} weeks`}
                                    min={1}
                                    max={_.unique(entries, e => e.weekNumber).length}
                                    defaultValue={range}
                                    onChange={value => setRange(value)} />
                            )}
                            {loading && <ProgressIndicator />}
                            <SummaryView
                                enableShimmer={loading}
                                events={entries}
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