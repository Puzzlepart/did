import { Tabs } from 'components/Tabs'
import React, { FC } from 'react'
import { ReportsContext } from './context'
import { useReports } from './useReports'

/**
 * @category Function Component
 */
export const Reports: FC = () => {
  const { context, tabs } = useReports()
  return (
    <ReportsContext.Provider value={context}>
      <Tabs items={tabs} />
    </ReportsContext.Provider>
  )
}
