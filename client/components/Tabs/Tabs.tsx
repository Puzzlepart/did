import {
  mergeClasses,
  Tab,
  TabList,
  TabProps
} from '@fluentui/react-components'
import { ReusableComponent } from 'components/types'
import React, { useMemo } from 'react'
import { getFluentIcon } from 'utils'
import { TabHeader } from './TabHeader'
import styles from './Tabs.module.scss'
import { ITabsProps } from './types'
import { useTabs } from './useTabs'

export const Tabs: ReusableComponent<ITabsProps> = (props) => {
  const { selectedValue, onTabSelect, Component, componentProps } =
    useTabs(props)

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
        tabProps.icon = getFluentIcon(header?.iconName)
        tabProps.disabled = header?.disabled
      }
      return <Tab key={key} {...tabProps} />
    })
  }, [props.items])

  return (
    <div
      className={mergeClasses(
        Tabs.className,
        props.vertical && styles.vertical,
        props.level === 3 && styles.compactHeaders,
        props.experimental && styles.experimental
      )}
    >
      <TabList
        className={styles.list}
        vertical={props.vertical}
        selectedValue={selectedValue}
        onTabSelect={onTabSelect}
      >
        {tabItems}
      </TabList>
      <div className={styles.container}>
        {Component && <Component {...componentProps} />}
        {props.children}
      </div>
    </div>
  )
}

Tabs.displayName = 'Tabs'
Tabs.className = styles.tabs
Tabs.defaultProps = {
  items: {},
  level: 2,
  vertical: false
}

export * from './types'
