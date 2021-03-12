/* eslint-disable tsdoc/syntax */
import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { first } from 'underscore'
import { IWeekColumnTooltipProps } from './types'
import styles from './WeekColumnTooltip.module.scss'

/**
 * Component that hows the total hours 
 * for a customer in a week.
 * 
 * @category SummaryView
 */
const CustomerHours = (props: any) => {
  const { t } = useTranslation()
  return (
    <div dangerouslySetInnerHTML={{
      __html: t('common.weekColumnTooltipHoursCustomer', props)
    }}></div>
  )
}


/**
 * Component taht shows the total hours 
 * for the week.
 * 
 * @category SummaryView
 */
const TotalHours = (props: any) => {
  const { t } = useTranslation()
  return (
    <div dangerouslySetInnerHTML={{
      __html: t('common.weekColumnTooltipHoursTotal', props)
    }}></div>
  )
}

/**
 * @category SummaryView
 */
export const WeekColumnTooltip: FunctionComponent<IWeekColumnTooltipProps> = (props: IWeekColumnTooltipProps) => {
  const { t } = useTranslation()
  const week = first(props.periods).week
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.title}>{t('common.weekColumnTooltipTitle', { week })}</div>
        <div className={styles.subTitle}>{props.user}</div>
      </div>
      <div>
        {Object.keys(props.hours.project).map(key => {
          const { hours, details } = props.hours.project[key]
          if (!details) return null
          return (
            <CustomerHours
              key={key}
              customer={details.customer.name}
              hours={hours} />
          )
        })}
      </div>
      <TotalHours hours={props.hours.total} />
    </div>
  )
}