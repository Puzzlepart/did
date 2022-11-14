import { Spinner, SpinnerSize } from '@fluentui/react'
import { UserMessage } from 'components'
import { SubText } from 'components/SubText'
import { TabComponent } from 'components/TabContainer/types'
import get from 'get-value'
import color from 'randomcolor'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis
} from 'recharts'
import { useTimesheetContext } from '../../context'
import styles from './AllocationView.module.scss'
import { useChartConfig } from './useChartConfig'
import { useChartData } from './useChartData'

/**
 * @category Timesheet
 */
export const AllocationView: TabComponent = () => {
  const { t } = useTranslation()
  const { state } = useTimesheetContext()
  const container = useRef<HTMLDivElement>(null)

  const charts = useChartConfig()
  const data = useChartData(charts, container.current)

  if (state.loading) {
    return (
      <div className={styles.root} ref={container}>
        <Spinner
          label={t('timesheet.allocation.loadingLabel')}
          size={SpinnerSize.large}
        />
      </div>
    )
  }

  if (!state.loading && state.selectedPeriod?.totalDuration === 0) {
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
            <SubText
              font='small'
              style={{
                margin: '0 0 20px 0',
                textAlign: 'center'
              }}
              text={c.subTitle}
            />
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
                <Bar
                  dataKey='value'
                  animationEasing='ease-in-out'
                  animationDuration={1200}
                >
                  {d.map((entry) => (
                    <Cell
                      key={get(entry.data, c.idKey)}
                      fill={color({
                        seed: get(entry.data, c.textKey),
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
