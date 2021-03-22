/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tsdoc/syntax */
import { FilterPanel, TabContainer, UserMessage } from 'components'
import { PivotItem } from 'office-ui-fabric-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ReportsContext } from './context'
import { useReports } from './hooks'
import {
  CHANGE_QUERY,
  FILTERS_UPDATED,
  TOGGLE_FILTER_PANEL
} from './reducer/actions'
import styles from './Reports.module.scss'
import { ReportsList } from './ReportsList'
import { SaveFilterForm } from './SaveFilterForm'
import { SummaryView } from './SummaryView'

/**
 * @category Function Component
 */
export const Reports: React.FC = () => {
  const { t } = useTranslation()
  const { queries, filters, context } = useReports()
  return (
    <ReportsContext.Provider value={context}>
      <TabContainer
        className={styles.root}
        selectedKey={context.state.preset?.itemKey || 'default'}
        items={queries}
        fixedLinkWidth={true}
        itemProps={{
          headerButtonProps: { disabled: context.state.loading }
        }}
        onLinkClick={({ props }) => context.dispatch(CHANGE_QUERY({ props }))}>
        {queries
          .filter((q) => !q.hidden)
          .map((props, index) => (
            <ReportsList {...props} key={index} />
          ))}
        <SummaryView
          itemKey='summary'
          headerText={t('admin.summary')}
          itemIcon='CalendarWeek'
        />
        <PivotItem itemKey='default'>
          <UserMessage
            iconName='ReportDocument'
            text={t('reports.selectReportText')}
          />
        </PivotItem>
      </TabContainer>
      <FilterPanel
        isOpen={context.state.isFiltersOpen}
        headerText={t('reports.filterPanelHeaderText')}
        filters={filters}
        items={context.state.data.timeEntries}
        onDismiss={() => context.dispatch(TOGGLE_FILTER_PANEL())}
        onFiltersUpdated={(filters) =>
          context.dispatch(FILTERS_UPDATED({ filters }))
        }>
        <SaveFilterForm />
      </FilterPanel>
    </ReportsContext.Provider>
  )
}
