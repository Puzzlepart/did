/* eslint-disable tsdoc/syntax */
import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { first } from 'underscore'
import { CustomerHours } from './CustomerHours'
import { TotalHours } from './TotalHours'
import { IWeekColumnTooltipProps } from './types'
import styles from './WeekColumnTooltip.module.scss'

/**
 * @category SummaryView
 */
export const WeekColumnTooltip: FunctionComponent<IWeekColumnTooltipProps> = (
  props: IWeekColumnTooltipProps
) => {
  const { t } = useTranslation()
  const week = first(props.periods).week
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.title}>
          {t('common.weekColumnTooltipTitle', { week })}
        </div>
        <div className={styles.userInfo}>{props.user}</div>
      </div>
      <div>
        {Object.keys(props.hours.project).map((key) => {
          const { hours, details } = props.hours.project[key]
          if (!details) return null
          return (
            <CustomerHours
              key={key}
              customer={details.customer.name}
              hours={hours}
            />
          )
        })}
      </div>
      <TotalHours hours={props.hours.total} />
    </div>
  )
}
