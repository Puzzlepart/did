/* eslint-disable tsdoc/syntax */
import { Persona, PersonaSize } from '@fluentui/react'
import { SubText } from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { CustomerHours } from './CustomerHours'
import { TotalHours } from './TotalHours'
import { IWeekColumnTooltipProps } from './types'
import { useWeekColumnTooltip } from './useWeekColumnTooltip'
import styles from './WeekColumnTooltip.module.scss'

/**
 * @category SummaryView
 */
export const WeekColumnTooltip: React.FC<IWeekColumnTooltipProps> = (props) => {
  const { t } = useTranslation()
  const { week, month, year, customerTotals } = useWeekColumnTooltip(props)
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.title}>
          <div className={styles.text}>
            {t('common.weekColumnTooltipTitle', { week, year })}
          </div>
          <SubText text={`${month} ${year}`} />
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
