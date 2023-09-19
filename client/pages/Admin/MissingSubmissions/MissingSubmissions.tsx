import { TabComponent, Tabs } from 'components/Tabs'
import React from 'react'
import styles from './MissingSubmissions.module.scss'
import { useMissingSubmissions } from './useMissingSubmissions'

export const MissingSubmissions: TabComponent = () => {
  const { tabs, defaultSelectedTab } = useMissingSubmissions()
  return (
    <div className={MissingSubmissions.className}>
      <Tabs
        items={tabs}
        vertical
        defaultSelectedValue={defaultSelectedTab}
        level={3}
      />
    </div>
  )
}

MissingSubmissions.displayName = 'MissingSubmissions'
MissingSubmissions.className = styles.missingSubmissions
