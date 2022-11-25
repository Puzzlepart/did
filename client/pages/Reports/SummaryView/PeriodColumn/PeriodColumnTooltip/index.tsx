import { Persona, PersonaSize } from '@fluentui/react'
import { SubText } from 'components'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import _ from 'underscore'
import { CustomerHours } from './CustomerHours'
import styles from './PeriodColumnTooltip.module.scss'
import { TotalHours } from './TotalHours'
import { IPeriodColumnTooltipProps } from './types'
import { usePeriodColumnTooltip } from './usePeriodColumnTooltip'

/**
 * @category SummaryView
 */
export const PeriodColumnTooltip: FC<IPeriodColumnTooltipProps> = ({
  periods,
  hours,
  user
}) => {
  const { t } = useTranslation()
  const { week, month, monthName, year, customerTotals } =
    usePeriodColumnTooltip({ periods, hours })
  if (_.isEmpty(periods)) return null
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.title}>
          <div className={styles.text}>
            {t('common.periodColumnTooltipTitle', { week, month })}
          </div>
          <SubText text={`${monthName} ${year}`} />
        </div>
        {user && (
          <Persona
            className={styles.userInfo}
            text={user?.displayName}
            secondaryText={user?.mail}
            imageUrl={user?.photo?.base64}
            size={PersonaSize.size40}
          />
        )}
      </div>
      <div className={styles.customerTotals}>
        {customerTotals.map(({ customer, hours }, index) => {
          if (!customer) return null
          return <CustomerHours key={index} customer={customer} hours={hours} />
        })}
      </div>
      <TotalHours hours={hours.total} />
    </div>
  )
}
