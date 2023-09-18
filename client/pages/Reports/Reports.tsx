import { Tabs } from 'components/Tabs'
import React, { FC } from 'react'
import { ReportsContext } from './context'
import { useReports } from './useReports'

/**
 * @category Function Component
 */
export const Reports: FC = () => {
  const { context, tabs, onTabSelect } = useReports()
  return (
    <ReportsContext.Provider value={context}>
      <Tabs vertical items={tabs} onTabSelect={onTabSelect} />
    </ReportsContext.Provider>
  )
}
