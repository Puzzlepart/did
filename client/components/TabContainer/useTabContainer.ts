/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable unicorn/prevent-abbreviations */
import { PivotItem } from '@fluentui/react'
import { useAppContext } from 'AppContext'
import { useState } from 'react'
import { UPDATE_BREADCRUMB } from '../../app/reducer'
import { ITabContainerProps } from './types'
import { useTabContainerStyles } from './useTabContainerStyles'

/**
 * Component logic hook for `<TabContainer />`
 *
 * * Uses hook `useTabContainerStyles` to get styles
 * based on device
 *
 * @returns The `onLinkClick` and `styles` to be used by the <TabContainer />`
 * component
 *
 * @category TabContainer
 */
export function useTabContainer(props: ITabContainerProps) {
  const { dispatch } = useAppContext()
  const styles = useTabContainerStyles(props)
  const [selectedKey, setSelectedKey] = useState(props.defaultSelectedKey)

  // eslint-disable-next-line unicorn/consistent-function-scoping
  function onLinkClick({ props: item }: PivotItem) {
    dispatch(
      UPDATE_BREADCRUMB({
        key: item.itemKey,
        text: item.headerText,
        level: props.level
      })
    )
    setSelectedKey(item.itemKey)

    if (props.onTabChanged) {
      props.onTabChanged(item.itemKey)
    }
  }
  
  const fontSize = {
    [2]: 18,
    [3]: 14
  }[props.level]

  return {
    styles,
    selectedKey: props.selectedKey ?? selectedKey,
    onLinkClick,
    fontSize
  }
}
