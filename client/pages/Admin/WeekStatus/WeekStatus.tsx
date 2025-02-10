import { TabComponent, Tabs } from 'components/Tabs'
import React from 'react'
import styles from './WeekStatus.module.scss'
import { useWeekStatus } from './useWeekStatus'
import { WeekStatusContext } from './context'

export const WeekStatus: TabComponent = () => {
  const { tabs, defaultSelectedTab, context } = useWeekStatus()
  return (
    <div className={WeekStatus.className}>
      <WeekStatusContext.Provider value={context}>
        <Tabs
          items={tabs}
          vertical
          defaultSelectedValue={defaultSelectedTab}
          level={3}
        />
      </WeekStatusContext.Provider>
    </div>
  )
}

WeekStatus.displayName = 'WeekStatus'
WeekStatus.className = styles.weekStatus
