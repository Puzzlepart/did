import { TooltipProps } from 'recharts'

export interface IChartTooltipProps extends TooltipProps<string, any> {
  /**
   * Whether to show the full tooltip or not.
   */
  showFullTooltip?: boolean

  /**
   * Navigating to the selected entity is temporarily available.
   */
  navigationAvailable?: boolean
}
