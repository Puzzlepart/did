
import { ITypedHash } from '@pnp/common';
import { getValueTyped as value } from 'helpers';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as React from 'react';
import { AllocationColumnChart } from './AllocationColumnChart';
import { ITimeEntry, IUserAllocationProps } from './types';

/**
 * Get allocation
 * 
 * @param {ITimeEntry[]} entries Entries
 * @param {string} exp Expression
 */
export const GetAllocation = (entries: ITimeEntry[], exp: string) => entries.reduce((obj: ITypedHash<number>, entry) => {
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
export const UserAllocation = (props: IUserAllocationProps) => (
    <div className="container">
        {Object.keys(props.charts).map(exp => (
            <div className="row" key={exp}>
                <div className="col-sm">
                    <HighchartsReact highcharts={Highcharts} options={AllocationColumnChart(props.charts[exp], GetAllocation(props.entries, exp), props.charts[exp])} />
                </div>
            </div>
        ))}
    </div>
)