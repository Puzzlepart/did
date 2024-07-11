import {
  FormControl
} from 'components'
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
  const {
    register,
    model,
    openPanel,
    formControlProps
  } = useUserSettings()

  return useMemo(
    () => (
      <div className={UserSettings.className}>
        <MenuItem text={t('common.settings')} onClick={openPanel} />
        <FormControl {...formControlProps}>
          <Tabs
            level={3}
            vertical
            items={{
              'general': [
                General,
                {
                  text: t('common.general'),
                  iconName: 'ContentSettings'
                },
                { register }
              ],
              'timesheet': [
                Timesheet,
                {
                  text:t('common.timesheet'),
                  iconName: 'Timeline'
                },
                { register }
              ],
              'vacation': [
                Vacation,
                {
                  text:t('common.vacation'),
                  iconName: 'WeatherSunnyLow'
                },
                { register }
              ],
            }} />
        </FormControl>
      </div>
    ),
    [model]
  )
}

UserSettings.displayName = 'UserSettings'
