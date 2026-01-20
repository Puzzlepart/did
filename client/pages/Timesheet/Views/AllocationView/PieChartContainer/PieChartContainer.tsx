import format from 'string-format'
import { UserMessage } from 'components'
import React from 'react'
import FadeIn from 'react-fade-in/lib/FadeIn'
import { Legend, Pie, PieChart, Tooltip } from 'recharts'
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
  const { showFullTooltip, cells } = usePieChartContainer(props)
  const totalDurationText = String(state.selectedPeriod?.totalDuration ?? 0)
  const entryCountText = String(props.entries?.length ?? 0)

  return (
    <div className={PieChartContainer.className}>
      <FadeIn delay={500} transitionDuration={500}>
        <div className={styles.header}>
          <div className={styles.title}>{props.chart.title}</div>
          <UserMessage
            text={format(
              props.chart.subTitle,
              totalDurationText,
              entryCountText
            )}
            renderProgress={[!!state.loading, props.chart.loadingText]}
            style={{ width: '80%' }}
          />
        </div>
        <div
          style={{
            width: props.container?.clientWidth
              ? props.container.clientWidth / 2
              : '100%',
            height: 500
          }}
        >
          <PieChart
            width={
              props.container?.clientWidth
                ? props.container.clientWidth / 2
                : 400
            }
            height={500}
          >
            <Tooltip
              content={<ChartTooltip showFullTooltip={showFullTooltip.value} />}
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
        </div>
      </FadeIn>
    </div>
  )
}

PieChartContainer.displayName = 'PieChartContainer'
PieChartContainer.className = styles.pieChartContainer
