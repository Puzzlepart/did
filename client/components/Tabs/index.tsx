import { Tab, TabList } from '@fluentui/react-components'
import React, { FC } from 'react'
import { ITabsProps } from './types'
import { useTabs } from './useTabs'

export const Tabs: FC<ITabsProps> = (props) => {
  const { itemKeys, selectedValue, onTabSelect, Component, componentProps } =
    useTabs(props)
  return (
    <div>
      <TabList
        vertical={props.vertical}
        selectedValue={selectedValue}
        onTabSelect={onTabSelect}
      >
        {itemKeys.map((key) => {
          const [, title] = props.items[key]
          return (
            <Tab key={key} value={key}>
              {title}
            </Tab>
          )
        })}
      </TabList>
      {Component && <Component {...componentProps} />}
      {props.children}
    </div>
  )
}

Tabs.defaultProps = {
  items: {},
  level: 2,
  vertical: false
}

export * from './types'
