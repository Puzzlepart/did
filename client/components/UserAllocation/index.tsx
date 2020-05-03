
import { getValueTyped as value } from 'helpers';
import * as React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import _ from 'underscore';
import { ITimeEntry, IUserAllocationProps } from './types';

/**
 * Calculates durations based on exp
 * 
 * @param {ITimeEntry[]} entries Entries
 * @param {string} exp Expression (what to calculate durations based on, e.g. customer.name)
 * 
 * @category UserAllocation
 */
export const GetAllocation = (entries: ITimeEntry[], exp: string): Array<{ name: string; hours: number }> => {
    const items = entries.reduce((_items, entry) => {
        const key = value(entry, exp, null);
        if (key) {
            const item = _.find(_items, i => i.name === key);
            if (item) {
                item.hours += entry.durationHours;
            } else {
                _items.push({ name: key, hours: entry.durationHours });
            }
        }
        return _items;
    }, []);
    return items.map(i => ({ ...i, hours: parseFloat(i.hours.toFixed(1)) }));
}

/**
 * Shows allocation charts for a user
 * 
 * @category UserAllocation
 */
export const UserAllocation = (props: IUserAllocationProps): JSX.Element => {
    const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });
    const ref = React.useRef<HTMLDivElement>();

    React.useLayoutEffect(() => setDimensions({ width: ref.current.clientWidth, height: 400 }), []);

    return (
        <div className='c-UserAllocation' ref={ref}>
            {Object.keys(props.charts).map(exp => {
                const title = props.charts[exp];
                const data = GetAllocation(props.entries, exp);
                return (
                    <div className='c-UserAllocation-row row' key={exp}>
                        <div className='c-UserAllocation-chart col-sm'>
                            <div className='c-UserAllocation-chart-title'>{title}</div>
                            <BarChart
                                width={dimensions.width}
                                height={dimensions.height}
                                data={data}
                                margin={{ left: -25 }}>
                                <CartesianGrid strokeDasharray='3 3' />
                                <XAxis dataKey='name' />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey='hours' name='Hours' fill='#8884d8' />
                            </BarChart>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}