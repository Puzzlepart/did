
import { value as value } from 'helpers';
import resource from 'i18n';
import { ITimeEntry } from 'interfaces/ITimeEntry';
import * as React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import _ from 'underscore';
import { TimesheetContext } from '../TimesheetContext';
import styles from './AllocationView.module.scss';

/**
 * Calculates durations based on exp
 * 
 * @param {ITimeEntry[]} entries Entries
 * @param {string} exp Expression (what to calculate durations based on, e.g. customer.name)
 * 
 * @category Timesheet
 */
export const GetAllocation = (entries: ITimeEntry[], exp: string): Array<{ name: string; hours: number }> => {
    const items = entries.reduce((_items, entry) => {
        const name = value(entry, exp, null);
        if (name) {
            const item = _.find(_items, i => i.name === name);
            if (item) {
                item.hours += entry.durationHours;
            } else {
                _items.push({ name, hours: entry.durationHours });
            }
        }
        return _items;
    }, []);
    return items.map(i => ({ ...i, hours: parseFloat(i.hours.toFixed(1)) }));
}

/**
 * Shows allocation charts for a user
 * 
 * @category Timesheet
 */
export const AllocationView = (): JSX.Element => {
    const { selectedPeriod } = React.useContext(TimesheetContext);
    const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });
    const ref = React.useRef<HTMLDivElement>();

    React.useLayoutEffect(() => setDimensions({ width: ref.current.clientWidth, height: 400 }), []);

    const charts = {
        'project.name': resource('TIMESHEET.ALLOCATION_PROJECT_CHART_TITLE'),
        'customer.name': resource('TIMESHEET.ALLOCATION_CUSTOMER_CHART_TITLE'),
    };

    return (
        <div className={styles.root} ref={ref}>
            {Object.keys(charts).map(exp => {
                const title = charts[exp];
                const data = GetAllocation(selectedPeriod.events, exp);
                return (
                    <div className={styles.chart} key={exp}>
                        <div className={styles.title}>{title}</div>
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
                            <Bar dataKey='hours' name={resource('COMMON.HOURS')} fill='#444' />
                        </BarChart>
                    </div>
                )
            })}
        </div>
    );
}