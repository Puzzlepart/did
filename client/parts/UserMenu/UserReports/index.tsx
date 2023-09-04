import { ChoiceGroup } from '@fluentui/react'
import { BasePanel } from 'components'
import { UserMessage } from 'components/UserMessage'
import { useExcelExport } from 'hooks'
import React, { FC } from 'react'
import { BrowserView } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { getFluentIcon as icon } from 'utils/getFluentIcon'
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
        icon={icon('DocumentDatabase')}
        text={t('common.userReports')}
        onClick={togglePanel}
      />
      <BasePanel
        headerText={t('common.userReports')}
        isOpen={showPanel}
        onDismiss={togglePanel}
        footerActions={[
          {
            text: t('common.exportExcel'),
            icon: icon('ArrowExportUp'),
            appearance: 'primary',
            onClick: () => {
              onExport()
            },
            disabled: !preset || query.loading
          }
        ]}
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
      </BasePanel>
    </BrowserView>
  )
}
