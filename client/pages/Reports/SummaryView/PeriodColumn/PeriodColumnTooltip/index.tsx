/* eslint-disable tsdoc/syntax */
import { Persona, PersonaSize } from '@fluentui/react'
import { SubText } from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { CustomerHours } from './CustomerHours'
import { TotalHours } from './TotalHours'
import { IPeriodColumnTooltipProps } from './types'
import {  usePeriodColumnTooltip } from './usePeriodColumnTooltip'
import styles from './PeriodColumnTooltip.module.scss'

/**
 * @category SummaryView
 */
export const PeriodColumnTooltip: React.FC<IPeriodColumnTooltipProps> = (props) => {
  const { t } = useTranslation()
  const { week, month, monthName, year, customerTotals } = usePeriodColumnTooltip(props)
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.title}>
          <div className={styles.text}>
            {t('common.periodColumnTooltipTitle', { week, month })}
          </div>
          <SubText text={`${monthName} ${year}`} />
        </div>
        <Persona
          className={styles.userInfo}
          text={props.user?.displayName}
          secondaryText={props.user?.mail}
          size={PersonaSize.size40}
        />
      </div>
      <div className={styles.customerTotals}>
        {customerTotals.map(({ customer, hours }, index) => {
          if (!customer) return null
          return <CustomerHours key={index} customer={customer} hours={hours} />
        })}
      </div>
      <TotalHours hours={props.hours.total} />
    </div>
  )
}
