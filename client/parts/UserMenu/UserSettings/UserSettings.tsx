import { FormControl } from 'components'
import { Tabs } from 'components/Tabs'
import get from 'get-value'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import { useSubscriptionSettings } from 'AppContext'
import { MenuItem } from '../MenuItem'
import { General, Timesheet, Vacation, ApiTokensTab } from './Tabs'
import { useUserSettings } from './useUserSettings'

/**
 * @category UserMenu
 */
export const UserSettings: StyledComponent = () => {
  const { t } = useTranslation()
  const { openPanel, formControlProps } = useUserSettings()
  const settings = useSubscriptionSettings()
  const patEnabled = get(settings, 'security.personalAccessTokensEnabled', {
    default: true
  })

  return useMemo(
    () => (
      <div className={UserSettings.className}>
        <MenuItem text={t('common.settings')} onClick={openPanel} />
        <FormControl {...formControlProps}>
          <Tabs
            level={3}
            vertical
            items={{
              general: [
                General,
                {
                  text: t('common.general'),
                  iconName: 'ContentSettings'
                },
                formControlProps
              ],
              timesheet: [
                Timesheet,
                {
                  text: t('common.timesheet'),
                  iconName: 'Timeline'
                },
                formControlProps
              ],
              vacation: [
                Vacation,
                {
                  text: t('common.vacation'),
                  iconName: 'WeatherSunnyLow'
                },
                formControlProps
              ],
              ...(patEnabled
                ? {
                    apiTokens: [
                      ApiTokensTab,
                      {
                        text: t('userSettings.apiTokens.tabTitle'),
                        iconName: 'Key'
                      },
                      formControlProps
                    ]
                  }
                : {})
            }}
          />
        </FormControl>
      </div>
    ),
    [formControlProps.model, patEnabled]
  )
}

UserSettings.displayName = 'UserSettings'
