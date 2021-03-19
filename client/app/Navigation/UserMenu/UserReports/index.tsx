import { UserMessage } from 'components/UserMessage'
import { useExcelExport } from 'hooks'
import { ChoiceGroup, DefaultButton, Panel } from 'office-ui-fabric-react'
import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { MenuItem } from '../MenuItem'
import { useUserReports } from './useUserReports'

export const UserReports: FunctionComponent = () => {
  const { t } = useTranslation()
  const {
    queryPreset,
    setQueryPreset,
    queries,
    showPanel,
    togglePanel,
    query,
    columns
  } = useUserReports()

  const { onExport } = useExcelExport({
    items: query?.data,
    fileName: queryPreset?.exportFileName,
    columns
  })

  return (
    <>
      <MenuItem
        iconProps={{ iconName: 'ReportDocument' }}
        text={t('common.userReports')}
        onClick={togglePanel}
      />
      <Panel
        headerText={t('common.userReports')}
        isOpen={showPanel}
        onDismiss={togglePanel}
        isLightDismiss={true}>
        <ChoiceGroup
          defaultSelectedKey={queryPreset?.key}
          onChange={setQueryPreset}
          options={queries}
        />
        <UserMessage
          hidden={!queryPreset || query.loading}
          containerStyle={{ marginTop: 15 }}
          iconName='ReminderTime'
          text={t('common.userReportSummary', query)}
        />
        <DefaultButton
          text={t('common.exportExcel')}
          styles={{ root: { marginTop: 20, width: '100%' } }}
          iconProps={{ iconName: 'ExcelDocument' }}
          onClick={onExport}
          disabled={!queryPreset || query.loading}
        />
      </Panel>
    </>
  )
}
