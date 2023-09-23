import { CheckboxVisibility } from '@fluentui/react'
import { List, UserMessage } from 'components'
import { Progress } from 'components/Progress'
import { TabComponent } from 'components/Tabs'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import _ from 'underscore'
import { ReportsContext } from '../context'
import { SET_FILTER_STATE } from '../reducer/actions'
import { SaveFilterForm } from '../SaveFilterForm'
import { useColumns } from './useColumns'
import { useMenuItems } from './useMenuItems'

/**
 * Reports list
 *
 * @category Reports
 */
export const ReportsList: TabComponent = () => {
  const { t } = useTranslation()
  const context = useContext(ReportsContext)
  const columns = useColumns()
  const menuItems = useMenuItems()
  return (
    <div>
      {context.state.loading && (
        <Progress
          text={t('reports.generatingReportProgressText')}
          padding='10px 0 20px 18px'
        />
      )}
      {_.isEmpty(context.state.data.timeEntries) &&
      !context.state.loading &&
      context.state.queryPreset ? (
        <UserMessage text={t('reports.noEntriesText')} />
      ) : (
        <List
          enableShimmer={context.state.loading}
          checkboxVisibility={CheckboxVisibility.always}
          items={context.state.data.timeEntries}
          columns={columns}
          menuItems={menuItems}
          exportFileName={context.state.queryPreset?.exportFileName}
          filterValues={context.state?.activeFilter?.values}
          onFilter={(state) => context.dispatch(SET_FILTER_STATE(state))}
          filterPanelActions={
            <SaveFilterForm disabled={!context.state.filterState?.isFiltered} />
          }
        />
      )}
    </div>
  )
}