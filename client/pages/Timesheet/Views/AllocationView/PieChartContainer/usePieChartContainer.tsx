import { useEffect, useState } from 'react'
import { useBoolean } from 'usehooks-ts'
import { IPieChartContainerProps } from './types'
import { useMemoizedCells } from './useMemoizedCells'

let clearNavigationTimeout: NodeJS.Timeout

export function usePieChartContainer(props: IPieChartContainerProps) {
  const showFullTooltip = useBoolean(false)
  const [navigationAvailable, setNavigationAvailable] = useState(false)

  useEffect(() => {
    clearTimeout(clearNavigationTimeout)
    if (showFullTooltip.value) {
      setNavigationAvailable(true)
      clearNavigationTimeout = setTimeout(() => {
        setNavigationAvailable(false)
      }, 5000)
    } else {
      setNavigationAvailable(false)
    }
  }, [showFullTooltip.value])

  const cells = useMemoizedCells(props)

  /**
   * Handles the click event on the pie chart. If the `navigationAvailable` is
   * true and the payload has a `url` property, the user will be redirected to
   * the url. Also toggles the `showFullTooltip` boolean.
   */
  const onPieClick = ({ payload }) => {
    showFullTooltip.toggle()
    if (navigationAvailable && payload?.payload?.url) {
      window.location.replace(payload?.payload?.url)
    }
  }

  return {
    showFullTooltip,
    cells,
    navigationAvailable,
    onPieClick
  }
}
