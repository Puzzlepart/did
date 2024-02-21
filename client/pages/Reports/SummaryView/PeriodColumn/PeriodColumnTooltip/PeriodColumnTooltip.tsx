import { Avatar, Tooltip } from '@fluentui/react-components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import _ from 'underscore'
import { ColumnHeader } from '../../ColumnHeader'
import { CustomerHours } from './CustomerHours'
import styles from './PeriodColumnTooltip.module.scss'
import { TotalHours } from './TotalHours'
import { IPeriodColumnTooltipProps } from './types'
import { usePeriodColumnTooltip } from './usePeriodColumnTooltip'

/**
 * @category SummaryView
 */
export const PeriodColumnTooltip: StyledComponent<IPeriodColumnTooltipProps> = (
  props
) => {
  const { t } = useTranslation()
  const { week, month, monthName, year, customerTotals } =
    usePeriodColumnTooltip(props)
  if (_.isEmpty(props.periods)) {
    return props.children as any
  }
  return (
    <Tooltip
      withArrow={true}
      relationship='description'
      content={
        <div className={PeriodColumnTooltip.className}>
          <div className={styles.header}>
            <ColumnHeader
              textSize={500}
              text={t('common.periodColumnTooltipTitle', { week, month })}
              subText={`${monthName} ${year}`}
            />
            {props.user && (
              <Avatar
                className={styles.userAvatar}
                name={props.user.displayName}
                image={{
                  src: props.user?.photo?.base64
                }}
                size={40}
              />
            )}
          </div>
          <div className={styles.customerTotals}>
            {customerTotals.map(
              ({ customer, hours }, index) =>
                customer && (
                  <CustomerHours
                    key={index}
                    customer={customer}
                    hours={hours}
                  />
                )
            )}
          </div>
          <TotalHours hours={props.hours.total} />
        </div>
      }
    >
      {props.children as any}
    </Tooltip>
  )
}

PeriodColumnTooltip.displayName = 'PeriodColumnTooltip'
PeriodColumnTooltip.className = styles.periodColumnTooltip
