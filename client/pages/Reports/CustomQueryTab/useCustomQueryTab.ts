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
  const { executeReport, loading, items, isQueryCalled } = useCustomQuery(
    filterCriterias.value(),
    collapsed.setTrue
  )
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

  return {
    t,
    formControl,
    executeReport,
    loading,
    items,
    collapsed,
    isQueryCalled,
    isFilterCriterasValid,
    addManagerUsersAction
  }
}
