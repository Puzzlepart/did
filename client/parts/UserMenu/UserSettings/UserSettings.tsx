import { FormControl } from 'components'
import { Tabs } from 'components/Tabs'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import { MenuItem } from '../MenuItem'
import { General, Timesheet, Vacation } from './Tabs'
import { useUserSettings } from './useUserSettings'

/**
 * @category UserMenu
 */
export const UserSettings: StyledComponent = () => {
  const { t } = useTranslation()
  const { openPanel, formControlProps } = useUserSettings()

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
              ]
            }}
          />
        </FormControl>
      </div>
    ),
    [formControlProps.model]
  )
}

UserSettings.displayName = 'UserSettings'
