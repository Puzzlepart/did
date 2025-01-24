import {
  SelectTabEventHandler,
  Tab,
  TabProps
} from '@fluentui/react-components'
import { useAppContext } from 'AppContext'
import { ComponentLogicHook } from 'hooks'
import React, {
  FunctionComponent,
  ReactElement,
  useCallback,
  useEffect,
  useMemo
} from 'react'
import { getFluentIcon } from 'utils'
import { UPDATE_BREADCRUMB } from '../../app/reducer'
import { TabHeader } from './TabHeader'
import { ITabProps, ITabsProps } from './types'
import { useTabsSelection } from './useTabsSelection'

type UseTabsReturnType = {
  selectedValue: string
  onTabSelect: SelectTabEventHandler
  Component: FunctionComponent<ITabProps>
  componentProps: ITabProps
  tabItems: ReactElement[]
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

  useEffect(() => {
    if (selectedValue && selectedTab) {
      dispatch(
        UPDATE_BREADCRUMB({
          item: {
            key: selectedValue,
            text:
              typeof selectedTab === 'string' ? selectedTab : selectedTab.text,
            level: props.level
          }
        })
      )
    }
  }, [selectedValue])

  const onTabSelect = useCallback<SelectTabEventHandler>(
    (_, data) => {
      const key = data?.value as string
      setSelectedValue(key)
      updateHistory(key)
      if (props.onTabSelect) {
        props.onTabSelect(key)
      }
    },
    [setSelectedValue]
  )

  /**
   * An array of `Tab` components generated from the `items` prop.
   * Each `Tab` component is created with a `value` prop set to the corresponding key in `items`,
   * and a `children` prop set to the `text` property of the corresponding header object, or the header string if it is not an object.
   * If the corresponding header object has an `iconName` property, the `Tab` component is created with an `icon` prop set to the corresponding Fluent icon.
   * If the corresponding header object has a `disabled` property set to `true`, the `Tab` component is created with a `disabled` prop set to `true`.
   */
  const tabItems = useMemo(() => {
    return Object.keys(props.items).map((key) => {
      const [, header] = props.items[key]
      const tabProps: TabProps = {
        value: key,
        children:
          typeof header === 'string' ? (
            <span>{header}</span>
          ) : (
            <TabHeader {...header} />
          )
      }
      if (typeof header === 'object') {
        tabProps.icon = getFluentIcon(header?.iconName, {
          color: header.iconColor
        })
        tabProps.disabled = header?.disabled
      }
      return <Tab key={key} {...tabProps} />
    })
  }, [props.items])

  return {
    selectedValue,
    onTabSelect,
    Component,
    componentProps,
    tabItems
  }
}
