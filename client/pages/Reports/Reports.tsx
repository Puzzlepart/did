/* eslint-disable react-hooks/exhaustive-deps */
import { ChoiceGroup, PivotItem } from '@fluentui/react'
import { FilterPanel, TabContainer, UserMessage } from 'components'
import React, { FC } from 'react'
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
export const Reports: FC = () => {
  const { t } = useTranslation()
  const { defaultSelectedKey, queries, options, filters, context } =
    useReports()
  return (
    <ReportsContext.Provider value={context}>
      <TabContainer
        className={styles.root}
        defaultSelectedKey={defaultSelectedKey}
        items={queries}
        fixedLinkWidth={true}
        styles={{
          link: {
            display: defaultSelectedKey === 'default' ? 'none' : 'initial'
          }
        }}
        itemProps={{
          headerButtonProps: {
            hidden: true,
            disabled: context.state.loading
          }
        }}
        onTabChanged={(itemKey) => context.dispatch(CHANGE_QUERY({ itemKey }))}
      >
        {queries.map((props, index) => (
          <ReportsList {...props} key={index} />
        ))}
        <SummaryView
          itemKey='summary'
          headerText={t('reports.summaryHeaderText')}
          itemIcon='CalendarWeek'
        />
        <PivotItem itemKey='default'>
          <UserMessage
            containerStyle={{ marginBottom: 20 }}
            iconName='ReportDocument'
            text={t('reports.selectReportText')}
          />
          <ChoiceGroup options={options} />
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
        }
      >
        <SaveFilterForm />
      </FilterPanel>
    </ReportsContext.Provider>
  )
}
