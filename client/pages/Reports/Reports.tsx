/* eslint-disable react-hooks/exhaustive-deps */
import { Icon, PivotItem } from '@fluentui/react'
import { Button } from '@fluentui/react-components'
import { TabContainer, UserMessage } from 'components'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import _ from 'underscore'
import { ReportTab } from './ReportTab'
import styles from './Reports.module.scss'
import { SummaryView } from './SummaryView'
import { ReportsContext } from './context'
import { CHANGE_QUERY } from './reducer/actions'
import { useReports } from './useReports'

/**
 * @category Function Component
 */
export const Reports: FC = () => {
  const { t } = useTranslation()
  const { defaultSelectedKey, queries, buttons, context } = useReports()
  return (
    <ReportsContext.Provider value={context}>
      <TabContainer
        className={styles.root}
        selectedKey={defaultSelectedKey}
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
          <ReportTab
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
          <div className={styles.defaultTab}>
            <UserMessage
              containerStyle={{ marginBottom: 20 }}
              iconName='ReportDocument'
              text={t('reports.selectReportText')}
            />
            <div className={styles.reportButtons}>
              {buttons.map((button, index) => (
                <Button
                  key={index}
                  title={button.title}
                  icon={<Icon {...button.iconProps} />}
                  onClick={button.onClick as any}>
                  {button.text}
                </Button>
              ))}
            </div>
          </div>
        </PivotItem>
      </TabContainer>
    </ReportsContext.Provider>
  )
}
