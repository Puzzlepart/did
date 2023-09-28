import {
  mergeClasses,
  TabList
} from '@fluentui/react-components'
import { ReusableComponent } from 'components/types'
import React from 'react'
import styles from './Tabs.module.scss'
import { ITabsProps } from './types'
import { useTabs } from './useTabs'

export const Tabs: ReusableComponent<ITabsProps> = (props) => {
  const { selectedValue, onTabSelect, Component, componentProps, tabItems } =
    useTabs(props)

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
        size={props.level === 3 ? 'medium' : 'large'}
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
