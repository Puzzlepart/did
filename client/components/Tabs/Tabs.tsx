import {
  mergeClasses,
  Tab,
  TabList,
  TabProps
} from '@fluentui/react-components'
import { ReusableComponent } from 'components/types'
import React, { useMemo } from 'react'
import { getFluentIcon } from 'utils'
import styles from './Tabs.module.scss'
import { ITabsProps } from './types'
import { useTabs } from './useTabs'

export const Tabs: ReusableComponent<ITabsProps> = (props) => {
  const { itemKeys, selectedValue, onTabSelect, Component, componentProps } =
    useTabs(props)

  const tabItems = useMemo(() => {
    return itemKeys.map((key) => {
      const [, header] = props.items[key]
      const title = typeof header === 'string' ? header : header.text
      const tabProps: TabProps = { value: key, children: title }
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
        props.vertical && styles.vertical
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
