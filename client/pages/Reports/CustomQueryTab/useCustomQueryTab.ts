/* eslint-disable unicorn/prevent-abbreviations */
import { IFormControlProps, useFormControls } from 'components'
import { ComponentLogicHook } from 'hooks'
import { createElement, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useBoolean } from 'usehooks-ts'
import { isNullish, removeNullishValues } from 'utils'
import { ReportsQuery } from '../../../types'
import { CustomQueryTab } from './CustomQueryTab'
import { UseCustomQueryTabReturnType } from './types'
import { useAddManagerUsersAction } from './useAddManagerUsersAction'
import { useCustomQuery } from './useCustomQuery'
import { useCustomQueryFilterCriterias } from './useCustomQueryFilterCriterias'
import { useLazyQuery } from '@apollo/client'
import { report_count } from '../queries'
import { Spinner } from '@fluentui/react-components'

const getQueryKey = (nextQuery: ReportsQuery) => {
  const keys = Object.keys(nextQuery).sort()
  return JSON.stringify(
    keys.reduce<Record<string, unknown>>((acc, key) => {
      acc[key] = nextQuery[key]
      return acc
    }, {})
  )
}

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
  const [approxCount, setApproxCount] = useState<number | null>(null)
  const [runPreload, { data: preloadData, loading: preloadLoading }] =
    useLazyQuery(report_count, {
      fetchPolicy: 'no-cache'
    })
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

  const query = useMemo(
    () => removeNullishValues(filterCriterias.value()),
    [filterCriterias.$]
  )
  const queryKey = useMemo(() => getQueryKey(query), [query])

  useEffect(() => {
    setApproxCount(null)
  }, [queryKey])

  useEffect(() => {
    if (typeof preloadData?.approxCount !== 'number') return
    setApproxCount(preloadData.approxCount)
  }, [preloadData?.approxCount])

  /**
   * Form control properties for the filter criterias.
   */
  const submitText =
    typeof approxCount === 'number'
      ? t('reports.loadApproxEntriesShort', {
          count: approxCount
        })
      : t('reports.preloadReport')
  const formControl: IFormControlProps<ReportsQuery> = {
    id: CustomQueryTab.displayName,
    model: filterCriterias,
    register,
    submitProps: {
      text: submitText,
      content: preloadLoading
        ? createElement(
            'span',
            null,
            createElement(Spinner, { size: 'tiny' }),
            ' ',
            t('reports.preloadReport')
          )
        : undefined,
      onClick: () => {
        if (typeof approxCount === 'number') {
          setApproxCount(null)
          return onExecuteReport()
        }
        const nextQuery = removeNullishValues(filterCriterias.value())
        setApproxCount(null)
        return runPreload({
          variables: {
            query: nextQuery
          }
        })
      },
      justifyContent: 'flex-end',
      disabled: loading || !isFilterCriterasValid || preloadLoading
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
