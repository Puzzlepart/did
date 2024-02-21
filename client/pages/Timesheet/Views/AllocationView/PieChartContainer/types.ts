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
}
