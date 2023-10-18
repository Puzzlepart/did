import { ChoiceGroup } from '@fluentui/react'
import { Skeleton, SkeletonItem } from '@fluentui/react-components'
import { Panel } from 'components'
import { UserMessage } from 'components/UserMessage'
import React, { FC } from 'react'
import { BrowserView } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { MenuItem } from '../MenuItem'
import { useUserReports } from './useUserReports'

export const UserReports: FC = () => {
  const { t } = useTranslation()
  const { preset, setPreset, queries, panelState, query, onExport } =
    useUserReports()

  return (
    <BrowserView renderWithFragment={true}>
      <MenuItem text={t('common.userReports')} onClick={panelState.toggle} />
      <Panel
        title={t('common.userReports')}
        open={panelState.value}
        onDismiss={panelState.setFalse}
        size='small'
        contentGap={25}
      >
        <ChoiceGroup
          defaultSelectedKey={preset?.key}
          onChange={(_, option) => {
            setPreset(option)
          }}
          options={queries}
        />
        {query.loading ? (
          <Skeleton>
            <SkeletonItem style={{ height: 66 }} />
          </Skeleton>
        ) : (
          <UserMessage
            hidden={!preset}
            text={t('common.userReportSummary', query)}
            action={{
              iconName: 'ArrowExportUp',
              text: t('common.exportExcel'),
              onClick: onExport
            }}
          />
        )}
      </Panel>
    </BrowserView>
  )
}
