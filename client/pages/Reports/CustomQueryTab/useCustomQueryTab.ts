/* eslint-disable unicorn/prevent-abbreviations */
import { IFormControlProps, useFormControlModel, useFormControls } from 'components'
import { ComponentLogicHook } from 'hooks'
import { useMemo } from 'react'
import { TFunction, useTranslation } from 'react-i18next'
import { useBoolean } from 'usehooks-ts'
import { ReportsQuery } from '../../../types'
import { CustomQueryTab } from './CustomQueryTab'
import { useCustomQuery } from './useCustomQuery'

type UseCustomQueryTabReturnType = {
    /**
     * Translation function
     */
    t: TFunction

    /**
     * Form control properties
     */
    formControl: IFormControlProps<ReportsQuery>

    /**
     * Callback to execute the report query
     */
    executeReport: () => void

    /**
     * Indicates if the query is currently loading
     */
    loading: boolean

    /**
     * True if the filters are collapsed
     */
    collapsed: ReturnType<typeof useBoolean>

    /**
     * True if the query has been called
     */
    isQueryCalled?: boolean

    /**
     * True if the filter criterias are valid
     */
    isFilterCriterasValid?: boolean
}

/**
 * Custom hook for CustomQueryTab component logic
 *
 * @returns CustomQueryTab component logic
 * 
 * @category Reports Hooks
 */
export const useCustomQueryTab: ComponentLogicHook<undefined, UseCustomQueryTabReturnType> = () => {
    const { t } = useTranslation()
    const collapsed = useBoolean(false)
    const model = useFormControlModel<keyof ReportsQuery, ReportsQuery>()
    const register = useFormControls<keyof ReportsQuery>(model, CustomQueryTab)
    const { executeReport, loading, isQueryCalled } = useCustomQuery(model.value(), collapsed.setTrue)

    model.value()
    const formControl: IFormControlProps<ReportsQuery> = {
        id: CustomQueryTab.displayName,
        model,
        register,
        submitProps: { hidden: true }
    }

    const isFilterCriterasValid = useMemo(() => {
        return Object.values(model.$).some((value) => value !== undefined)
    }, [model.$])

    return {
        t,
        formControl,
        executeReport,
        loading,
        collapsed,
        isQueryCalled,
        isFilterCriterasValid
    }
}