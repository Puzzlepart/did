import React, { FC } from 'react'
import _ from 'underscore'
import { ReportLinks } from '../ReportLinks'
import { ReportsList } from '../ReportsList'
import { useReportsQueryPreset } from '../hooks'

/**
 * Report tab
 *
 * @category Reports
 */
export const ReportTab: FC = () => {
    const queryPreset = useReportsQueryPreset()
    if (!queryPreset) {
        return null
    }
    return (
        <div>
            {_.isEmpty(queryPreset.reportLinks) ? (
                <ReportsList />
            ) : (
                <ReportLinks />
            )}
        </div>
    )
}
