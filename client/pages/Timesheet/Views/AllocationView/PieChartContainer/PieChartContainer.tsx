import { format } from '@fluentui/react'
import { UserMessage } from 'components'
import React from 'react'
import FadeIn from 'react-fade-in/lib/FadeIn'
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { StyledComponent } from 'types'
import { useTimesheetContext } from '../../../context'
import { ChartTooltip } from './ChartTooltip'
import styles from './PieChartContainer.module.scss'
import { IPieChartContainerProps } from './types'
import { usePieChartContainer } from './usePieChartContainer'

export const PieChartContainer: StyledComponent<IPieChartContainerProps> = (
  props
) => {
  const { state } = useTimesheetContext()
  const { showFullTooltip, cells } =
    usePieChartContainer(props)

  return (
    <div className={PieChartContainer.className}>
      <FadeIn delay={500} transitionDuration={500}>
        <div className={styles.header}>
          <div className={styles.title}>{props.chart.title}</div>
          <UserMessage
            text={format(
              props.chart.subTitle,
              state.selectedPeriod?.totalDuration,
              props.entries?.length
            )}
            renderProgress={[!!state.loading, props.chart.loadingText]}
            style={{ width: '80%' }}
          />
        </div>
        <ResponsiveContainer
          width={props.container?.clientWidth / 2}
          height={500}
        >
          <PieChart>
            <Tooltip
              content={
                <ChartTooltip
                  showFullTooltip={showFullTooltip.value}
                />
              }
            />
            <Legend layout='horizontal' verticalAlign='top' align='center' />
            <Pie
              dataKey='value'
              startAngle={0}
              endAngle={360}
              data={props.entries}
              outerRadius={150}
              fill='#8884d8'
              label
              onClick={showFullTooltip.toggle}
              onMouseMove={showFullTooltip.setFalse}
            >
              {cells}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </FadeIn>
    </div>
  )
}

PieChartContainer.displayName = 'PieChartContainer'
PieChartContainer.className = styles.pieChartContainer