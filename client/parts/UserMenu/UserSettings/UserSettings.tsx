import { useAppContext } from 'AppContext'
import {
  CheckboxControl,
  DropdownControl,
  FormControl,
  InputControl
} from 'components'
import { usePermissions } from 'hooks'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import { MenuItem } from '../MenuItem'
import { CONFIG_KEYS } from './types'
import { useUserSettings } from './useUserSettings'

/**
 * @category UserMenu
 */
export const UserSettings: StyledComponent = () => {
  const { t } = useTranslation()
  const { pages } = useAppContext()
  const [, hasPermission] = usePermissions()
  const { register, model, openPanel, formControlProps } = useUserSettings()

  return useMemo(
    () => (
      <div className={UserSettings.className}>
        <MenuItem text={t('common.settings')} onClick={openPanel} />
        <FormControl {...formControlProps}>
          <DropdownControl
            {...register(CONFIG_KEYS.startPage)}
            label={t('common.startPageLabel')}
            values={[
              {
                value: '/',
                text: t('common.homePage')
              },
              ...pages
                .filter(
                  ({ permission }) => permission && hasPermission(permission)
                )
                .map(({ text, path: value }) => ({
                  value,
                  text
                }))
            ]}
          />
          <DropdownControl
            {...register(CONFIG_KEYS.preferredLanguage)}
            label={t('common.preferredLanguageLabel')}
            values={[
              {
                value: 'en-GB',
                text: 'English (United Kingdom)'
              },
              {
                value: 'nb',
                text: 'Norsk (bokmål)'
              },
              {
                value: 'nn',
                text: 'Norsk (nynorsk)'
              }
            ]}
          />
          <InputControl
            {...register(CONFIG_KEYS.vacationTotalDays)}
            label={t('common.vacationTotalDaysLabel')}
            description={t('common.vacationTotalDaysDescription')}
            type='number'
          />
          <DropdownControl
            {...register(CONFIG_KEYS.vacationCalculationType)}
            label={t('common.vacationCalculationTypeLabel')}
            values={[
              {
                value: 'planned',
                text: t('common.vacationCalculationTypePlanned')
              },
              {
                value: 'confirmed',
                text: t('common.vacationCalculationTypeConfirmed')
              }
            ]}
          />
          <CheckboxControl
            {...register(CONFIG_KEYS.timesheetRoundUpEvents)}
            label={t('common.roundUpEventsLabel')}
            description={t('common.roundUpEventsDescription')}
          />
        </FormControl>
      </div>
    ),
    [model]
  )
}

UserSettings.displayName = 'UserSettings'
