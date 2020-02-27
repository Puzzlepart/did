
import { SummaryView, SummaryViewType } from 'components/Timesheet/SummaryView';
import * as React from 'react';
import { GET_CONFIRMED_TIME_ENTRIES } from './GET_CONFIRMED_TIME_ENTRIES';
import { useQuery } from '@apollo/react-hooks';
import { getValueTyped as value } from 'helpers';
import { Pivot, PivotItem, IPivotItemProps } from 'office-ui-fabric-react/lib/Pivot';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import * as _ from 'underscore';
import * as moment from 'moment-timezone';
require('moment/locale/en-gb');

/**
 * @component AdminSummaryView
 * @description
 */
export const AdminSummaryView = () => {
    const { data, loading } = useQuery(GET_CONFIRMED_TIME_ENTRIES, { fetchPolicy: 'cache-first' });
    let entries = value<any[]>(data, 'result.entries', []);
    if (loading) return <Spinner label='Loading Summary....' />;

    let sections: IPivotItemProps[] = _.unique(entries.map(e => e.yearNumber), y => y)
        .sort((a, b) => a - b)
        .map(itemKey => ({ itemKey: `${itemKey}`, headerText: `${itemKey}` }));

    return (
        <Pivot defaultSelectedKey={moment().year().toString()}>
            {sections.map(props => (
                <PivotItem {...props}>
                    <SummaryView
                        events={entries.filter(e => e.yearNumber.toString() === props.itemKey)}
                        type={SummaryViewType.Admin} />
                </PivotItem>
            ))}
        </Pivot>
    );
}