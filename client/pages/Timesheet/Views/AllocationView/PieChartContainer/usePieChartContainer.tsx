import { useBoolean } from 'usehooks-ts'
import { IPieChartContainerProps } from './types'
import { useMemoizedCells } from './useMemoizedCells'

export function usePieChartContainer(props: IPieChartContainerProps) {
  const showFullTooltip = useBoolean(false)

  const cells = useMemoizedCells(props)

  return {
    showFullTooltip,
    cells
  }
}
