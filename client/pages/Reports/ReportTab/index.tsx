/* eslint-disable react-hooks/exhaustive-deps */
import { TabComponent } from 'components'
import React, { useContext } from 'react'
import _ from 'underscore'
import { ReportsContext } from '../context'
import { ReportLinks } from '../ReportLinks'
import { ReportsList } from '../ReportsList'

/**
 * Report tab
 *
 * @category Reports
 */
export const ReportTab: TabComponent = (props) => {
  const context = useContext(ReportsContext)
  return (
    <div>
      {_.isEmpty(context.state.queryPreset.reportLinks) ? (
        <ReportsList
          {..._.omit(props, 'itemIcon')}
          headerButtonProps={{
            disabled: context.state.loading
          }}
        />
      ) : (
        <ReportLinks />
      )}
    </div>
  )
}
