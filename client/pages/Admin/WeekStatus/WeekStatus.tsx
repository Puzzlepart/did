import { TabComponent, Tabs } from 'components/Tabs'
import React from 'react'
import styles from './WeekStatus.module.scss'
import { useWeekStatus } from './useWeekStatus'

export const WeekStatus: TabComponent = () => {
  const { tabs, defaultSelectedTab } = useWeekStatus()
  return (
    <div className={WeekStatus.className}>
      <Tabs
        items={tabs}
        vertical
        defaultSelectedValue={defaultSelectedTab}
        level={3}
      />
    </div>
  )
}

WeekStatus.displayName = 'WeekStatus'
WeekStatus.className = styles.weekStatus
