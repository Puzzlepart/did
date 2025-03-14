/* eslint-disable unicorn/prevent-abbreviations */
import { IFormControlProps, useFormControls } from 'components'
import { ComponentLogicHook } from 'hooks'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useBoolean } from 'usehooks-ts'
import { isNullish } from 'utils'
import { ReportsQuery } from '../../../types'
import { CustomQueryTab } from './CustomQueryTab'
import { UseCustomQueryTabReturnType } from './types'
import { useAddManagerUsersAction } from './useAddManagerUsersAction'
import { useCustomQuery } from './useCustomQuery'
import { useCustomQueryFilterCriterias } from './useCustomQueryFilterCriterias'

/**
 * Custom hook for `<CustomQueryTab />` component logic
 *
 * @returns CustomQueryTab component logic
 *
 * @category Reports Hooks
 */
export const useCustomQueryTab: ComponentLogicHook<
  string,
  UseCustomQueryTabReturnType
> = (id) => {
  const { t } = useTranslation()
  const collapsed = useBoolean(false)
  const filterCriterias = useCustomQueryFilterCriterias('fq', id)
  const register = useFormControls<keyof ReportsQuery>(
    filterCriterias,
    CustomQueryTab
  )
  const { onExecuteReport, loading, items, queryBegin, error } = useCustomQuery(
    filterCriterias.value(),
    collapsed.setTrue
  )

  const onReset = () => {
    filterCriterias.reset()
    queryBegin.current = null
  }

  const addManagerUsersAction = useAddManagerUsersAction(filterCriterias.set)

  /**
   * Check if the filter criterias are valid.
   */
  const isFilterCriterasValid = useMemo(
    () =>
      Object.values(filterCriterias.value()).some((value) => !isNullish(value)),
    [filterCriterias.$]
  )

  /**
   * Form control properties for the filter criterias.
   */
  const formControl: IFormControlProps<ReportsQuery> = {
    id: CustomQueryTab.displayName,
    model: filterCriterias,
    register,
    submitProps: {
      text: t('reports.runReport'),
      onClick: onExecuteReport,
      justifyContent: 'flex-end',
      disabled: loading || !isFilterCriterasValid
    },
    additonalActions: [
      {
        text: t('reports.resetFilters'),
        onClick: onReset,
        disabled: loading || !isFilterCriterasValid
      }
    ],
    validateOnBlur: true
  }

  /**
   * Check if the query criteria is disabled, based on the current filter criterias.
   *
   * @param key Key of the query criteria to check
   */
  const isDisabled = (key: keyof ReportsQuery) => {
    const criterias = {
      startDateTime: Boolean(filterCriterias.value('startDateTime')),
      endDateTime: Boolean(filterCriterias.value('endDateTime')),
      week: Boolean(filterCriterias.value('week')),
      month: Boolean(filterCriterias.value('month')),
      year: Boolean(filterCriterias.value('year'))
    }
    switch (key) {
      case 'startDateTime':
      case 'endDateTime': {
        const disabled = criterias.week || criterias.month || criterias.year
        return {
          disabled,
          title: disabled ? t('reports.customQueryDateRangeDisabled') : ''
        }
      }
      case 'week': {
        const disabled =
          criterias.startDateTime || criterias.endDateTime || criterias.month
        return {
          disabled,
          title: disabled ? t('reports.customQueryWeekDisabled') : ''
        }
      }
      case 'month': {
        const disabled =
          criterias.startDateTime || criterias.endDateTime || criterias.week
        return {
          disabled,
          title: disabled ? t('reports.customQueryMonthDisabled') : ''
        }
      }
      case 'year': {
        const disabled = criterias.startDateTime || criterias.endDateTime
        return {
          disabled,
          title: disabled ? t('reports.customQueryYearDisabled') : ''
        }
      }
      default: {
        return {
          disabled: false,
          title: undefined
        }
      }
    }
  }

  return {
    formControl,
    loading,
    items,
    collapsed,
    isQueryCalled: Boolean(queryBegin.current),
    addManagerUsersAction,
    isDisabled,
    error
  }
}
