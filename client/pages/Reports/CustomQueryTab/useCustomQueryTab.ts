/* eslint-disable unicorn/prevent-abbreviations */
import {
    IFormControlProps,
    useFormControlModel,
    useFormControls
} from 'components'
import { ComponentLogicHook } from 'hooks'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useBoolean } from 'usehooks-ts'
import { ReportsQuery } from '../../../types'
import { useAddManagerUsersAction } from './useAddManagerUsersAction'
import { CustomQueryTab } from './CustomQueryTab'
import { UseCustomQueryTabReturnType } from './types'
import { useCustomQuery } from './useCustomQuery'

/**
 * Custom hook for CustomQueryTab component logic
 *
 * @returns CustomQueryTab component logic
 *
 * @category Reports Hooks
 */
export const useCustomQueryTab: ComponentLogicHook<
  undefined,
  UseCustomQueryTabReturnType
> = () => {
  const { t } = useTranslation()
  const collapsed = useBoolean(false)
  const model = useFormControlModel<keyof ReportsQuery, ReportsQuery>()
  const register = useFormControls<keyof ReportsQuery>(model, CustomQueryTab)
  const { executeReport, loading, items, isQueryCalled } = useCustomQuery(
    model.value(),
    collapsed.setTrue
  )
  const addManagerUsersAction = useAddManagerUsersAction(model.set)

  model.value()
  const formControl: IFormControlProps<ReportsQuery> = {
    id: CustomQueryTab.displayName,
    model,
    register,
    submitProps: { hidden: true }
  }

  const isFilterCriterasValid = useMemo(
    () => Object.values(model.$).some((value) => value !== undefined),
    [model.$]
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
