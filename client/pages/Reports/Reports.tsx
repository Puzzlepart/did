/* eslint-disable react-hooks/exhaustive-deps */
import { ChoiceGroup, PivotItem } from '@fluentui/react'
import { TabContainer, UserMessage } from 'components'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import _ from 'underscore'
import { ReportsContext } from './context'
import { CHANGE_QUERY } from './reducer/actions'
import styles from './Reports.module.scss'
import { ReportsList } from './ReportsList'
import { SummaryView } from './SummaryView'
import { useReports } from './useReports'

/**
 * @category Function Component
 */
export const Reports: FC = () => {
  const { t } = useTranslation()
  const { defaultSelectedKey, queries, options, context } = useReports()
  return (
    <ReportsContext.Provider value={context}>
      <TabContainer
        className={styles.root}
        defaultSelectedKey={defaultSelectedKey}
        items={queries}
        fixedLinkWidth={true}
        itemProps={{
          headerButtonProps: {
            hidden: true,
            disabled: context.state.loading
          }
        }}
        onTabChanged={(itemKey) => context.dispatch(CHANGE_QUERY({ itemKey }))}
      >
        {queries.map((props, index) => (
          <ReportsList
            key={index}
            {..._.omit(props, 'itemIcon')}
            headerButtonProps={{
              disabled: context.state.loading
            }}
          />
        ))}
        <SummaryView
          itemKey='summary'
          headerText={t('reports.summaryHeaderText')}
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
    </ReportsContext.Provider>
  )
}
