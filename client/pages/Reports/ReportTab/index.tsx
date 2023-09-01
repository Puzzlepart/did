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
  return (
    <div>
      {_.isEmpty(context.state.queryPreset.reportLinks) ? (
        <ReportsList />
      ) : (
        <ReportLinks />
      )}
    </div>
  )
}