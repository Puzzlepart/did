
import { useQuery } from '@apollo/react-hooks';
import { SummaryView, SummaryViewType } from 'components/Timesheet/SummaryView';
import { getValueTyped as value } from 'helpers';
import * as moment from 'moment-timezone';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { ShimmeredDetailsList } from 'office-ui-fabric-react/lib/ShimmeredDetailsList';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
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

    let periods: IAdminSummaryViewPeriod[] = _.unique([moment().year(), ...entries.map(e => e.yearNumber)], y => y)
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
        <Pivot
            defaultSelectedKey={props.defaultSelectedKey || moment().year().toString()}
            onLinkClick={props.onLinkClick}
            styles={{ itemContainer: { paddingTop: 10 } }}>
            {periods.map(p => (
                <PivotItem {...p.itemProps}>
                    <Pivot defaultSelectedKey='month' styles={{ itemContainer: { paddingTop: 10 } }}>
                        <PivotItem key='month' itemKey='month' headerText='Month' itemIcon='Calendar'>
                            <Slider
                                valueFormat={value => `Show last ${value} months`}
                                min={1}
                                max={_.unique(p.entries, e => e.monthNumber).length}
                                defaultValue={props.defaultRange}
                                onChange={value => setRange(value)} />
                            <SummaryView
                                enableShimmer={loading}
                                events={p.entries}
                                type={SummaryViewType.AdminMonth}
                                range={range}
                                exportFileNameTemplate='Summary-Month-{0}.xlsx' />
                        </PivotItem>
                        <PivotItem key='week' itemKey='week' headerText='Week' itemIcon='CalendarWeek'>
                            <Slider
                                valueFormat={value => `Show last ${value} weeks`}
                                min={1}
                                max={_.unique(p.entries, e => e.weekNumber).length}
                                defaultValue={props.defaultRange}
                                onChange={value => setRange(value)} />
                            <SummaryView
                                enableShimmer={loading}
                                events={p.entries}
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