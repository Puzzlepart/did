import _ from 'underscore'
import { IChartTooltipProps } from './types'

export function useChartTooltip(props: IChartTooltipProps) {
  const shouldRender = props.active && !_.isEmpty(props.payload)
  if (!shouldRender) return { shouldRender }
  const { payload } = _.first(props.payload)
  const lineClamp = props.showFullTooltip ? false : true
  return {
    ...payload,
    shouldRender,
    lineClamp
  }
}
