import { LegendProps, PieProps } from 'recharts'
import { ChartDataItem, IChartConfig } from '../types'

export interface IPieChartContainerProps {
  /**
   * Containr for calculating chart dimensions
   */
  container: HTMLDivElement

  /**
   * Chart configuration
   */
  chart: IChartConfig

  /**
   * Chart data entries
   */
  entries: ChartDataItem[]

  /**
   * Props for the `<Pie />` component from `recharts`.
   */
  pie?: Pick<
    PieProps,
    | 'dataKey'
    | 'label'
    | 'data'
    | 'cx'
    | 'cy'
    | 'innerRadius'
    | 'outerRadius'
    | 'fill'
    | 'startAngle'
    | 'endAngle'
  >

  /**
   * Props for the `<Legend />` component from `recharts`.
   */
  legend?: Pick<LegendProps, 'layout' | 'verticalAlign' | 'align'>
}
