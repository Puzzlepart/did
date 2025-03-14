import React, { FC } from 'react'
import _ from 'underscore'
import { ReportLinks } from '../ReportLinks'
import { ReportsList } from '../ReportsList'
import { useReportsContext } from '../context'

/**
 * Report tab
 *
 * @category Reports
 */
export const ReportTab: FC = () => {
  const context = useReportsContext()
  if (!context.queryPreset) {
    return null
  }
  return (
    <div>
      {_.isEmpty(context.queryPreset.reportLinks) ? (
        <ReportsList search filters />
      ) : (
        <ReportLinks />
      )}
    </div>
  )
}
