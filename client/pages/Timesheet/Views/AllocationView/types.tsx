export interface IChartConfig<T = any> {
  /**
   * Unique key for the chart
   */
  key: string

  /**
   * Title of the chart
   */
  title: string

  /**
   * Subtitle of the chart
   */
  subTitle: string

  /**
   * Colors to use for pick luminoisty for the random colors
   */
  luminosity: 'bright' | 'light' | 'dark' | 'random'

  /**
   * Key for the id to display in the chart
   */
  idKey: string

  /**
   * Key for the value to display in the chart
   */
  valueKey: string

  /**
   * Key for the prefix to display after the value in the chart
   */
  valuePostfix: string

  /**
   * Key for the text to display in the chart
   */
  textKey: string

  /**
   * Key for the secondary text to display in the tooltip
   */
  secondaryTextKey?: string

  /**
   * Key for the teritary text to display in the tooltip
   */
  teritaryTextKey?: string

  /**
   * Text to display while loading
   */
  loadingText?: string

  /**
   * Get the navigation url for the item
   */
  getUrl(item: T): string
}

export type ChartDataItem = {
  /**
   * Unique id for the item
   */
  id: string

  /**
   * Name to display in the legend and tooltip
   */
  name?: string

  /**
   * Secondary text to display in the tooltip
   */
  secondaryText?: string

  /**
   * Teritary text to display in the tooltip
   */
  teritaryText?: string

  /**
   * Value to display in the chart
   */
  value: number

  /**
   * Chart config reference
   */
  chart: IChartConfig

  /**
   * Additional data to be used in the chart
   */
  data?: Record<string, any>

  /**
   * Fill color for the cell if it's shouldn't be random
   */
  fill?: string

  /**
   * Navigation url for the item
   */
  url?: string
}

export type ChartData<T = ChartDataItem> = { [key: string]: T[] }
