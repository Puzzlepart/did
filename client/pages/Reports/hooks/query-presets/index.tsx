/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tsdoc/syntax */
import { DateObject } from 'DateUtils'
import { TFunction } from 'i18next'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { capitalize } from 'underscore.string'
import { IReportsQueryPresetItem } from '../../types'
import query_preset_current_month from './query-preset-current-month.gql'
import query_preset_current_year from './query-preset-current-year.gql'
import query_preset_forecast from './query-preset-forecast.gql'
import query_preset_last_month from './query-preset-last-month.gql'
import query_preset_last_year from './query-preset-last-year.gql'

/**
 * Last month query preset
 *
 * @param t - Translate function
 * @param query - Query
 */
export const lastMonthQueryPreset = (
  t: TFunction,
  query = query_preset_last_month
) => {
  const object = new DateObject().add('-1month').toObject()
  return {
    key: 'last_month',
    text: t('common.exportTypeLastMonth', object),
    iconName: 'CalendarDay',
    query,
    exportFileName: `TimeEntries-${capitalize(object.monthName)}-{0}.xlsx`
  }
}

/**
 * Current month query preset
 *
 * @param t - Translate function
 * @param query - Query
 */
export const currentMonthQueryPreset = (
  t: TFunction,
  query = query_preset_current_month
) => {
  const object = new DateObject().toObject()
  return {
    key: 'current_month',
    text: t('common.exportTypeCurrentMonth', object),
    iconName: 'Calendar',
    query,
    exportFileName: `TimeEntries-${capitalize(object.monthName)}-{0}.xlsx`
  }
}

/**
 * Last year query preset
 *
 * @param t - Translate function
 * @param query - Query
 */
export const lastYearQueryPreset = (
  t: TFunction,
  query = query_preset_last_year
) => {
  const { year } = new DateObject().toObject('year')
  const object = { year: year - 1 }
  return {
    key: 'last_year',
    text: t('common.exportTypeLastYear', object),
    iconName: 'Previous',
    query,
    exportFileName: `TimeEntries-${object.year}-{0}.xlsx`
  }
}

/**
 * Current year query preset
 *
 * @param t - Translate function
 * @param query - Query
 */
export const currentYearQueryPreset = (
  t: TFunction,
  query = query_preset_current_year
) => {
  const object = new DateObject().toObject('year')
  return {
    key: 'current_year',
    text: t('common.exportTypeCurrentYear', object),
    iconName: 'CalendarReply',
    query,
    exportFileName: `TimeEntries-${object.year}-{0}.xlsx`
  }
}

/**
 * Forecast query preset
 *
 * @param t - Translate function
 * @param query - Query
 */
export const forecastQueryPreset = (
  t: TFunction,
  query = query_preset_forecast
) => {
  return {
    key: 'forecast',
    text: t('reports.forecast'),
    iconName: 'TimeSheet',
    query,
    exportFileName: 'Forecast-{0}.xlsx'
  }
}

/**
 * Use query presets
 *
 * @category Reports
 */
export function useQueryPresets(): IReportsQueryPresetItem[] {
  const { t } = useTranslation()
  return useMemo(
    () =>
      [
        lastMonthQueryPreset,
        currentMonthQueryPreset,
        lastYearQueryPreset,
        currentYearQueryPreset,
        forecastQueryPreset
      ].map((presetFunction) => {
        return presetFunction(t)
      }),
    []
  )
}

export {
  query_preset_current_month,
  query_preset_last_month,
  query_preset_current_year,
  query_preset_last_year,
  query_preset_forecast
}
