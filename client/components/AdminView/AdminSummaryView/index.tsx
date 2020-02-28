
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

export const ADMIN_SUMMARY_VIEW_WEEK: IDropdownOption = { key: 'week', text: 'Week', data: { type: SummaryViewType.Admin, valueFormat: 'Show last {0} weeks' } };
export const ADMIN_SUMMARY_VIEW_MONTH: IDropdownOption = { key: 'month', text: 'Month', data: { type: SummaryViewType.AdminMonth, valueFormat: 'Show last {0} months' } };

/**
 * @component AdminSummaryView
 * @description Shows SummaryView type Admin
 * 
 * @param {IAdminSummaryViewProps} props Props
 */
export const AdminSummaryView = (props: IAdminSummaryViewProps) => {
    const [range, setRange] = React.useState<number>(props.defaultRange);
    const [view, setView] = React.useState<IDropdownOption>(ADMIN_SUMMARY_VIEW_WEEK);
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
                    <section style={{ marginTop: 15 }}>
                        <div>
                            <span style={{ display: 'inline-block', width: '30%', verticalAlign: 'top' }}>
                                <Dropdown
                                    style={{ width: 150 }}
                                    defaultSelectedKey={view.key}
                                    onChange={(_, opt) => setView(opt)}
                                    options={[ADMIN_SUMMARY_VIEW_WEEK, ADMIN_SUMMARY_VIEW_MONTH]} />
                            </span>
                            <span style={{ display: 'inline-block', verticalAlign: 'top', width: '70%', boxSizing: 'border-box', paddingLeft: 15 }}>
                                <Slider
                                    valueFormat={value => format(view.data.valueFormat, value)}
                                    min={1}
                                    max={_.unique(_entries, e => e.weekNumber).length}
                                    defaultValue={5}
                                    onChange={value => setRange(value)} />
                            </span>
                        </div>
                        <SummaryView
                            enableShimmer={loading}
                            events={_entries}
                            type={view.data.type}
                            range={range} />
                    </section>
                </PivotItem>
            ))}
        </Pivot>
    );
}