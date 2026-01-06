import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import styles from './HolidaysField.module.scss'
import { IHolidaysFieldProps } from './types'

/**
 * HolidaysField component for managing holidays in subscription settings.
 * This is a placeholder component that will be fully implemented in a future update.
 *
 * @category SubscriptionSettings
 */
export const HolidaysField: StyledComponent<IHolidaysFieldProps> = (props) => {
  const { t } = useTranslation()

  return (
    <div className={HolidaysField.className}>
      <p>{t('admin.holidaysDescription')}</p>
      <p>
        <em>
          {t('common.comingSoon')}: Holiday management UI will be added in a
          future update. Holidays can currently be configured via the GraphQL
          API.
        </em>
      </p>
    </div>
  )
}

HolidaysField.displayName = 'HolidaysField'
HolidaysField.className = styles.holidaysField
