
import { useQuery } from '@apollo/react-hooks';
import { TypedHash } from '@pnp/common';
import { getValueTyped as value } from 'helpers';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as React from 'react';
import { AllocationColumnChart } from './AllocationColumnChart';
import GET_USER_DATA, { ITimeEntry } from './GET_USER_DATA';
import { IUserAllocationProps } from './IUserAllocationProps';

/**
 * Get allocation
 * 
 * @param {ITimeEntry[]} entries Entries
 * @param {string} exp Expression
 */
export const GetAllocation = (entries: ITimeEntry[], exp: string) => entries.reduce((obj: TypedHash<number>, entry) => {
    let key = value(entry, exp, null);
    if (key) {
        obj[key] = obj[key] || 0;
        obj[key] += entry.durationHours;
    }
    return obj;
}, {});

/**
 * @component UserAllocation
 * @description Shows allocation charts for a user
 */
export const UserAllocation = (props: IUserAllocationProps) => {
    const { data, loading } = useQuery(GET_USER_DATA, { skip: !!props.entries, variables: props, fetchPolicy: 'cache-and-network' });
    if (loading) return null;
    let entries = props.entries || value<ITimeEntry[]>(data, 'result.entries', []);
    return (
        <div className="container">
            {Object.keys(props.charts).map(exp => (
                <div className="row" key={exp}>
                    <div className="col-sm">
                        <HighchartsReact highcharts={Highcharts} options={AllocationColumnChart(props.charts[exp], GetAllocation(entries, exp), props.charts[exp])} />
                    </div>
                </div>
            ))}
        </div >
    );
}