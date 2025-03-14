/* eslint-disable unicorn/prevent-abbreviations */
import { IFormControlProps, useFormControls } from 'components'
import { ComponentLogicHook } from 'hooks'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useBoolean } from 'usehooks-ts'
import { ReportsQuery } from '../../../types'
import { useAddManagerUsersAction } from './useAddManagerUsersAction'
import { CustomQueryTab } from './CustomQueryTab'
import { UseCustomQueryTabReturnType } from './types'
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
  const { onExecuteReport, loading, items, queryBegin } = useCustomQuery(
    filterCriterias.value(),
    collapsed.setTrue
  )

  const onReset = () => {
    filterCriterias.reset()
    queryBegin.current = null
  }

  const addManagerUsersAction = useAddManagerUsersAction(filterCriterias.set)

  const formControl: IFormControlProps<ReportsQuery> = {
    id: CustomQueryTab.displayName,
    model: filterCriterias,
    register,
    submitProps: { hidden: true }
  }

  const isFilterCriterasValid = useMemo(
    () => Object.values(filterCriterias.$).some((value) => value !== undefined),
    [filterCriterias.$]
  )

  const isDisabled = (key: keyof ReportsQuery) => {
    switch (key) {
        case 'startDateTime':
        case 'endDateTime': {
            const disabled = Boolean(filterCriterias.value('week')) || Boolean(filterCriterias.value('month')) || Boolean(filterCriterias.value('year'))
            return {
                disabled,
                title: disabled ? t('reports.customQueryDateRangeDisabled') : ''
            }
        }
        case 'week':
        case 'month':
        case 'year': {
            const disabled = Boolean(filterCriterias.value('startDateTime')) || Boolean(filterCriterias.value('endDateTime'))
            return {
                disabled,
                title: disabled ? t('reports.customQueryWeekMonthYearDisabled') : ''
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
    t,
    formControl,
    onExecuteReport,
    onReset,
    loading,
    items,
    collapsed,
    isQueryCalled: Boolean(queryBegin.current),
    isFilterCriterasValid,
    addManagerUsersAction,
    isDisabled  
  }
}
