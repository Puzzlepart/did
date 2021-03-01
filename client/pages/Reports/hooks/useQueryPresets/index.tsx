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
 */
const lastMonthQueryPreset = (t: TFunction) => {
  const object = new DateObject().add('-1month').toObject()
  return {
    key: 'last_month',
    text: t('common.exportTypeLastMonth', object),
    iconName: 'CalendarDay',
    query: query_preset_last_month,
    exportFileName: `TimeEntries-${capitalize(object.monthName)}-{0}.xlsx`
  } as IReportsQueryPresetItem
}

/**
 * Current month query preset
 *
 * @param t - Translate function
 */
const currentMonthQueryPreset = (t: TFunction) => {
  const object = new DateObject().toObject()
  return {
    key: 'current_month',
    text: t('common.exportTypeCurrentMonth', object),
    iconName: 'Calendar',
    query: query_preset_current_month,
    exportFileName: `TimeEntries-${capitalize(object.monthName)}-{0}.xlsx`
  } as IReportsQueryPresetItem
}

/**
 * Last year query preset
 *
 * @param t - Translate function
 */
const lastYearQueryPreset = (t: TFunction) => {
  const { year } = new DateObject().toObject('year')
  const object = { year: year - 1 }
  return {
    key: 'last_year',
    text: t('common.exportTypeLastYear', object),
    iconName: 'Previous',
    query: query_preset_last_year,
    exportFileName: `TimeEntries-${object.year}-{0}.xlsx`
  } as IReportsQueryPresetItem
}

/**
 * Current year query preset
 *
 * @param t - Translate function
 */
const currentYearQueryPreset = (t: TFunction) => {
  const object = new DateObject().toObject('year')
  return {
    key: 'current_year',
    text: t('common.exportTypeCurrentYear', object),
    iconName: 'CalendarReply',
    query: query_preset_current_year,
    exportFileName: `TimeEntries-${object.year}-{0}.xlsx`
  } as IReportsQueryPresetItem
}

/**
 * Forecast query preset
 *
 * @param t - Translate function
 */
export const forecastQueryPreset = (t: TFunction) => {
  return {
    key: 'forecast',
    text: t('reports.forecast'),
    iconName: 'TimeSheet',
    query: query_preset_forecast,
    exportFileName: 'Forecast-{0}.xlsx'
  } as IReportsQueryPresetItem
}

/**
 * Use query presets
 *
 * @category Reports
 */
export function useQueryPresets<T = IReportsQueryPresetItem>(): T[] {
  const { t } = useTranslation()
  return useMemo(
    () =>
      [
        lastMonthQueryPreset,
        currentMonthQueryPreset,
        lastYearQueryPreset,
        currentYearQueryPreset
      ].map((q) => (q(t) as unknown) as T),
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
