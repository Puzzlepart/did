import { SelectTabEventHandler } from '@fluentui/react-components'
import { useAppContext } from 'AppContext'
import { ComponentLogicHook } from 'hooks'
import { FunctionComponent, useCallback, useMemo } from 'react'
import { UPDATE_BREADCRUMB } from '../../app/reducer'
import { ITabProps, ITabsProps } from './types'
import { useTabsSelection } from './useTabsSelection'

type UseTabsReturnType = {
  selectedValue: string
  onTabSelect: SelectTabEventHandler
  Component: FunctionComponent<ITabProps>
  componentProps: ITabProps
}

/**
 * A custom hook for the `Tabs` component that manages the state of a tabbed interface.
 * It returns the currently selected value, a function to handle tab selection, and the
 * component to be rendered based on the selected tab. The default tab selected is either
 * the first tab or the tab with the `key` specified in the `defaultSelectedValue` prop.
 *
 * @param props - The props object containing the items to be rendered as tabs.
 *
 * @returns An object containing the keys of the items, the currently selected value,
 * a function to handle tab selection, and the component to be rendered based
 * on the selected value.
 */
export const useTabs: ComponentLogicHook<ITabsProps, UseTabsReturnType> = (
  props
) => {
  const { dispatch } = useAppContext()
  const { selectedValue, setSelectedValue, updateHistory } =
    useTabsSelection(props)

  const [selectedComponent, selectedTab, selectedComponentProps] = useMemo(
    () => props.items[selectedValue] ?? [null, null, {}],
    [props.items, selectedValue]
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
    [props.items, selectedValue]
  )

  const onTabSelect = useCallback<SelectTabEventHandler>(
    (_, data) => {
      const key = data?.value as string
      setSelectedValue(key)
      updateHistory(key)
      dispatch(
        UPDATE_BREADCRUMB({
          key: key,
          text:
            typeof selectedTab === 'string' ? selectedTab : selectedTab.text,
          level: props.level
        })
      )
      if (props.onTabSelect) {
        props.onTabSelect(key)
      }
    },
    [setSelectedValue]
  )

  return {
    selectedValue,
    onTabSelect,
    Component,
    componentProps
  }
}
