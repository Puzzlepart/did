import { SelectTabEventHandler } from '@fluentui/react-components'
import { useAppContext } from 'AppContext'
import { ComponentLogicHook } from 'hooks'
import { FunctionComponent, useCallback, useMemo, useState } from 'react'
import { UPDATE_BREADCRUMB } from '../../app/reducer'
import { ITabProps, ITabsProps } from './types'

type UseTabsReturnType = {
  itemKeys: string[]
  selectedValue: string
  onTabSelect: SelectTabEventHandler
  Component: FunctionComponent<ITabProps>
  componentProps: any
}

/**
 * A custom hook for the `Tabs` component that manages the state of a tabbed interface.
 * It returns the currently selected value, a function to handle tab selection, and the
 * component to be rendered based on the selected tab. The default tab selected is either
 * the first tab or the tab with the `key` specified in the `defaultSelectedValue` prop.
 *
 * @param props - The props object containing the items to be rendered as tabs.
 *
 * @returns  An object containing the keys of the items, the currently selected value,
 * a function to handle tab selection, and the component to be rendered based
 * on the selected value.
 */
export const useTabs: ComponentLogicHook<ITabsProps, UseTabsReturnType> = ({
  level,
  items,
  defaultSelectedValue
}) => {
  const { dispatch } = useAppContext()
  const itemKeys = Object.keys(items)
  const [selectedValue, setSelectedValue] = useState<string>(
    (defaultSelectedValue as string) ?? itemKeys[0]
  )
  const [selectedComponent, selectedTab, selectedComponentProps] = useMemo(
    () => items[selectedValue] ?? [null, null, {}],
    [items, selectedValue]
  )

  const onTabSelect = useCallback<SelectTabEventHandler>(
    (_, data) => {
      const key = data?.value as string
      setSelectedValue(key)
      dispatch(
        UPDATE_BREADCRUMB({
          key: key,
          text:
            typeof selectedTab === 'string' ? selectedTab : selectedTab.text,
          level
        })
      )
    },
    [setSelectedValue]
  )

  const [Component, componentProps] = useMemo<
    [FunctionComponent<ITabProps>, any]
  >(
    () => [
      selectedComponent,
      {
        ...selectedComponentProps,
        id: selectedValue
      }
    ],
    [items, selectedValue]
  )

  return {
    itemKeys,
    selectedValue,
    onTabSelect,
    Component,
    componentProps
  }
}
