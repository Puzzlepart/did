import { TabComponent, Tabs } from 'components/Tabs'
import React from 'react'
import styles from './MissingSubmissions.module.scss'
import { useMissingSubmissions } from './useMissingSubmissions'

export const MissingSubmissions: TabComponent = () => {
  const { tabs } = useMissingSubmissions()
  return (
    <div className={styles.root}>
      <Tabs items={tabs} />
    </div>
  )
}
