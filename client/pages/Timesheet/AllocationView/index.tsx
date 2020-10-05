
import { value as value } from 'helpers'
import { ITimeEntry } from 'types/ITimeEntry'
import React, { useLayoutEffect, useState, useContext, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from 'recharts'
import _ from 'underscore'
import { TimesheetContext } from '../context'
import styles from './AllocationView.module.scss'

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
        const name = value(entry, exp, null)
        if (name) {
            const item = _.find(_items, i => i.name === name)
            if (item) item.hours += entry.duration
            else _items.push({ name, hours: entry.duration })
        }
        return _items
    }, [])
    return items.map(i => ({ ...i, hours: parseFloat(i.hours.toFixed(1)) }))
}

/**
 * Shows allocation charts for a user
 * 
 * @category Timesheet
 */
export const AllocationView = (): JSX.Element => {
    const { t } = useTranslation()
    const { selectedPeriod } = useContext(TimesheetContext)
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
    const ref = useRef<HTMLDivElement>()

    useLayoutEffect(() => setDimensions({ width: ref.current.clientWidth, height: 400 }), [])

    const charts = {
        'project.name': t('timesheet.projectChartTitle'),
        'customer.name': t('timesheet.customerChartTitle'),
    }

    return (
        <div className={styles.root} ref={ref}>
            {Object.keys(charts).map(exp => {
                const title = charts[exp]
                const data = GetAllocation(selectedPeriod.events, exp)
                return (
                    <div className={styles.chart} key={exp}>
                        <div className={styles.title}>{title}</div>
                        <BarChart
                            width={dimensions.width}
                            height={dimensions.height}
                            data={data}
                            margin={{ left: -25 }}>
                            <XAxis dataKey='name' />
                            <YAxis />
                            <Tooltip wrapperStyle={{ fontSize: 12 }} />
                            <Legend wrapperStyle={{ fontSize: 12 }} />
                            <Bar dataKey='hours' name={t('common.hours') as string} fill='#cf6000' />
                        </BarChart>
                    </div>
                )
            })}
        </div>
    )
}