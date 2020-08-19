import * as React from 'react'
import { PieChart, Pie, Tooltip, Legend } from 'recharts'
import styles from './Home.module.scss'

const data01 = [
    {
        'name': 'Used',
        'value': 160
    },
    {
        'name': 'Remaining',
        'value': 40
    },
]

const data02 = [
    {
        'name': 'Confirmed',
        'value': 25
    },
    {
        'name': 'Unconfirmed',
        'value': 2
    },
]

const data03 = [
    {
        'name': 'DSS',
        'value': 32
    },
    {
        'name': 'Hexagon Ragasco',
        'value': 8
    },
]

/**
 * @ignore
 */
export default () => {
    return (
        <div className={styles.root}>
            <img src='/images/did365logobeta.png' className={styles.logo} />
            <p className={styles.motto}>The Calendar is the Timesheet</p>
            <div className={styles.charts}>
                <div>
                      <div className={styles.title}>Vacation</div>
                    <PieChart width={300} height={250}>
                        <Pie
                            data={data01}
                            dataKey='value'
                            nameKey='name'
                            cx='50%'
                            cy='50%'
                            outerRadius={50}
                            fill='#8884d8'
                            label />
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </div>
                <div>
                    <div className={styles.title}>Confirmed weeks</div>
                    <PieChart width={300} height={250}>
                        <Pie
                            data={data02}
                            dataKey='value'
                            nameKey='name'
                            cx='50%'
                            cy='50%'
                            outerRadius={50}
                            fill='#8884d8'
                            label />
                    </PieChart>
                </div>
                <div>
                    <div className={styles.title}>Allocation this week</div>
                    <PieChart width={300} height={250}>
                        <Pie
                            data={data03}
                            dataKey='value'
                            nameKey='name'
                            cx='50%'
                            cy='50%'
                            outerRadius={50}
                            fill='#8884d8'
                            label />
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </div>
            </div>
        </div>
    )
}