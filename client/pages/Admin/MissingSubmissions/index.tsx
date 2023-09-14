import { TabComponent, Tabs } from 'components/Tabs'
import React from 'react'
import styles from './MissingSubmissions.module.scss'
import { useMissingSubmissions } from './useMissingSubmissions'

export const MissingSubmissions: TabComponent = () => {
  const { tabs } = useMissingSubmissions()
  return (
    <div className={MissingSubmissions.className}>
      <Tabs items={tabs} />
    </div>
  )
}

MissingSubmissions.displayName = 'MissingSubmissions'
MissingSubmissions.className = styles.missingSubmissions
