import { ChoiceGroup, DefaultButton, Panel } from '@fluentui/react'
import { UserMessage } from 'components/UserMessage'
import { useExcelExport } from 'hooks'
import React, { FC } from 'react'
import { BrowserView } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { MenuItem } from '../MenuItem'
import { useUserReports } from './useUserReports'

export const UserReports: FC = () => {
  const { t } = useTranslation()
  const { preset, setPreset, queries, showPanel, togglePanel, query, columns } =
    useUserReports()

  const { onExport } = useExcelExport({
    items: query?.data,
    fileName: preset?.exportFileName,
    columns
  })

  return (
    <BrowserView renderWithFragment={true}>
      <MenuItem
        iconProps={{ iconName: 'ReportDocument' }}
        text={t('common.userReports')}
        onClick={togglePanel}
      />
      <Panel
        headerText={t('common.userReports')}
        isOpen={showPanel}
        onDismiss={togglePanel}
        isLightDismiss={true}
      >
        <ChoiceGroup
          defaultSelectedKey={preset?.key}
          onChange={(_, option) => {
            setPreset(option)
          }}
          options={queries}
        />
        <UserMessage
          hidden={!preset || query.loading}
          containerStyle={{ marginTop: 15 }}
          iconName='ReminderTime'
          text={t('common.userReportSummary', query)}
        />
        <DefaultButton
          text={t('common.exportExcel')}
          styles={{ root: { marginTop: 20, width: '100%' } }}
          iconProps={{
            iconName: 'ExcelDocument',
            styles: { root: { color: 'green' } }
          }}
          onClick={onExport}
          disabled={!preset || query.loading}
        />
      </Panel>
    </BrowserView>
  )
}
