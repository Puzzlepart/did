import { Tab, TabList } from '@fluentui/react-components'
import React, { FC } from 'react'
import { ITabsProps } from './types'
import { useTabs } from './useTabs'

export const Tabs: FC<ITabsProps> = (props) => {
  const { itemKeys, selectedValue, onTabSelect, Component } = useTabs(props)
  return (
    <div>
      <TabList selectedValue={selectedValue} onTabSelect={onTabSelect}>
        {itemKeys.map((key) => {
          const [, title] = props.items[key]
          return (
            <Tab key={key} value={key}>
              {title}
            </Tab>
          )
        })}
      </TabList>
      <Component id={selectedValue} />
    </div>
  )
}

Tabs.defaultProps = {
  items: {},
  level: 2
}
