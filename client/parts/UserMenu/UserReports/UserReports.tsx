import { ChoiceGroup } from '@fluentui/react'
import {
  Skeleton,
  SkeletonItem,
  Field,
  ProgressBar
} from '@fluentui/react-components'
import { Markdown, Panel } from 'components'
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
          <div>
            <UserMessage
              style={{ maxHeight: 180 }}
              hidden={!preset}
              text={t('common.userReportSummary', query)}
              action={{
                iconName: 'ExcelDocument',
                iconColor: '#217346',
                text: t('common.exportExcel'),
                onClick: onExport
              }}
            />
            {preset && (
              <Field
                label={t('common.autoMatchScoreLabel')}
                hint={
                  <Markdown
                    text={t('common.autoMatchScoreHint', {
                      autoMatch: query.autoMatchScore.value * 100,
                      manualMatch: 100 - query.autoMatchScore.value * 100
                    })}
                  />
                }
                validationMessage={query.autoMatchScore.validationMessage}
                validationState={query.autoMatchScore.validationState}
                hidden={!preset}
              >
                <ProgressBar value={query.autoMatchScore.value} />
              </Field>
            )}
          </div>
        )}
      </Panel>
    </BrowserView>
  )
}
