import { UserMessage } from 'components'
import { getValue } from 'helpers'
import color from 'randomcolor'
import React, { FunctionComponent, useContext, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import { TimesheetContext } from '../context'
import styles from './AllocationView.module.scss'
import { CustomTooltip } from './CustomTooltip'
import { useChartConfig } from './useChartConfig'
import { useChartData } from './useChartData'

export const AllocationView: FunctionComponent = () => {
  const { t } = useTranslation()
  const { loading, selectedPeriod } = useContext(TimesheetContext)
  const container = useRef<HTMLDivElement>(null)

  const charts = useChartConfig()
  const data = useChartData(charts, container.current)

  if (!loading && selectedPeriod?.totalDuration === 0) {
    return (
      <div className={styles.root} ref={container}>
        <UserMessage text={t('timesheet.allocation.noDataText')} />
      </div>
    )
  }

  return (
    <div className={styles.root} ref={container}>
      {charts.map((c) => {
        const [k, d] = data[c.key]
        return (
          <div key={k} className={styles.chartContainer}>
            <div className={styles.title}>{c.title}</div>
            <div className={styles.subTitle}>{c.subTitle}</div>
            <ResponsiveContainer width='100%' height={450}>
              <BarChart className={styles.chart} data={d}>
                <XAxis interval={0} dataKey='label' />
                <YAxis
                  label={{
                    value: t('common.hours').toString(),
                    angle: -90,
                    position: 'insideLeft'
                  }}
                />
                <Tooltip
                  content={({ payload }) => (
                    <CustomTooltip item={payload} chart={c} />
                  )}
                />
                <Bar
                  dataKey='value'
                  animationEasing='ease-in-out'
                  animationDuration={1200}>
                  {d.map((entry) => (
                    <Cell
                      key={getValue(entry.data, c.idKey)}
                      fill={color({
                        seed: getValue(entry.data, c.textKey),
                        luminosity: c.colors
                      })}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )
      })}
    </div>
  )
}
