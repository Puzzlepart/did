import { SelectTabEventHandler } from '@fluentui/react-components'
import { useAppContext } from 'AppContext'
import { ComponentLogicHook } from 'hooks'
import { FunctionComponent, useCallback, useMemo, useState } from 'react'
import { UPDATE_BREADCRUMB } from '../../app/reducer'
import { ITabProps, ITabsProps } from './types'

/**
 * A custom hook that manages the state of a tabbed interface.
 *
 * @param props - The props object containing the items to be rendered as tabs.
 *
 * @returns  An object containing the keys of the items, the currently selected value,
 * a function to handle tab selection, and the component to be rendered based
 * on the selected value.
 */
export const useTabs: ComponentLogicHook<
  ITabsProps,
  {
    itemKeys: string[]
    selectedValue: string
    onTabSelect: SelectTabEventHandler
    Component: FunctionComponent<ITabProps>
  }
> = ({ level, items }) => {
  const { dispatch } = useAppContext()
  const itemKeys = Object.keys(items)
  const [selectedValue, setSelectedValue] = useState(itemKeys[0])

  const onTabSelect = useCallback<SelectTabEventHandler>(
    (_, data) => {
      const key = data?.value as string
      setSelectedValue(key)
      dispatch(
        UPDATE_BREADCRUMB({
          key: key,
          text: items[key][1],
          level
        })
      )
    },
    [setSelectedValue]
  )

  const Component = useMemo<FunctionComponent<ITabProps>>(
    () => items[selectedValue][0],
    [items, selectedValue]
  )

  return {
    itemKeys,
    selectedValue,
    onTabSelect,
    Component
  }
}
