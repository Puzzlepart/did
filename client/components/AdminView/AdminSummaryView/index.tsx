
import { useQuery } from '@apollo/react-hooks';
import { SummaryView, SummaryViewType } from 'components/Timesheet/SummaryView';
import { getValueTyped as value } from 'helpers';
import * as moment from 'moment-timezone';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { ShimmeredDetailsList } from 'office-ui-fabric-react/lib/ShimmeredDetailsList';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import * as React from 'react';
import * as format from 'string-format';
import * as _ from 'underscore';
import { GET_CONFIRMED_TIME_ENTRIES } from './GET_CONFIRMED_TIME_ENTRIES';
import { IAdminSummaryViewPeriod } from './IAdminSummaryViewPeriod';
import { IAdminSummaryViewProps } from './IAdminSummaryViewProps';
require('moment/locale/en-gb');

/**
 * @component AdminSummaryView
 * @description Shows SummaryView type Admin
 * 
 * @param {IAdminSummaryViewProps} props Props
 */
export const AdminSummaryView = (props: IAdminSummaryViewProps) => {
    const [range, setRange] = React.useState<number>(props.defaultRange);
    const { data, loading } = useQuery(GET_CONFIRMED_TIME_ENTRIES, { fetchPolicy: 'cache-first' });
    let entries = value<any[]>(data, 'result.entries', []);

    if (loading) return <ShimmeredDetailsList items={[]} isPlaceholderData={true} shimmerLines={10} enableShimmer={true} />;

    let periods: IAdminSummaryViewPeriod[] = _.unique(entries.map(e => e.yearNumber), y => y)
        .sort((a, b) => a - b)
        .map(year => ({
            itemProps: {
                key: `${year}`,
                itemID: `summary/${year}`,
                itemKey: `${year}`,
                headerText: `${year}`,
            },
            entries: value<any[]>(data, 'result.entries', []).filter(e => e.yearNumber === year),
        }));



    return (
        <Pivot defaultSelectedKey={props.defaultSelectedKey || moment().year().toString()} onLinkClick={props.onLinkClick}>
            {periods.map(({ itemProps, entries: _entries }) => (
                <PivotItem {...itemProps}>
                    <div style={{ marginTop: 15 }}>
                        <Pivot>
                            <PivotItem itemKey='week' headerText='Week' itemIcon='CalendarWeek'>
                                <div style={{ marginTop: 15 }}>
                                    <Slider
                                        valueFormat={value => format(props.valueFormat, value)}
                                        min={1}
                                        max={_.unique(_entries, e => e.weekNumber).length}
                                        defaultValue={5}
                                        onChange={value => setRange(value)} />
                                    <SummaryView
                                        enableShimmer={loading}
                                        events={_entries}
                                        type={SummaryViewType.Admin}
                                        range={range} />
                                </div>
                            </PivotItem>
                            <PivotItem itemKey='month' headerText='Month' itemIcon='Calendar'>
                                <div style={{ marginTop: 15 }}>
                                    <SummaryView
                                        enableShimmer={loading}
                                        events={_entries}
                                        type={SummaryViewType.AdminMonth} />
                                </div>
                            </PivotItem>
                        </Pivot>
                    </div>
                </PivotItem>
            ))}
        </Pivot>
    );
}