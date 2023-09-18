import React, { FC } from 'react'
import _ from 'underscore'
import { useReportsContext } from '../context'
import { ReportLinks } from '../ReportLinks'
import { ReportsList } from '../ReportsList'

/**
 * Report tab
 *
 * @category Reports
 */
export const ReportTab: FC = () => {
  const context = useReportsContext()
  return (
    <div>
      {_.isEmpty(context.state.queryPreset?.reportLinks) ? (
        <ReportsList />
      ) : (
        <ReportLinks />
      )}
    </div>
  )
}
