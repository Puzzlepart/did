import { useEffect, useState } from 'react'
import { ITabsProps } from './types'
import { useTabsHistory } from './useTabsHistory'

/**
 * Hook that manages the selected tab state.
 *
 * @param props - The props object containing the tab items and level etc.
 */
export function useTabsSelection(props: ITabsProps) {
  const itemKeys = Object.keys(props.items)
  const [selectedValue, setSelectedValue] = useState<string>(null)
  useEffect(() => {
    setSelectedValue(
      props.items[tab]
        ? tab
        : (props.defaultSelectedValue as string) ?? itemKeys[0]
    )
  }, [])
  const [updateHistory, tab] = useTabsHistory(props.level, selectedValue)
  return { selectedValue, setSelectedValue, updateHistory }
}
