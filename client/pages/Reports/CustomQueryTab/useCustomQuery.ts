/* eslint-disable unicorn/prevent-abbreviations */
import { useLazyQuery } from '@apollo/client'
import { useContext, useMemo } from 'react'
import { useBoolean } from 'usehooks-ts'
import { ReportsQuery } from '../../../types'
import { ReportsContext } from '../context'
import { report_custom } from '../queries'
import { DATA_UPDATED } from '../reducer/actions'

/**
 * Custom query hook for `CustomQueryTab` that handles the query execution.
 * 
 * @param query Query object
 * @param onCollapse On collapse callback
 */
export function useCustomQuery(query:ReportsQuery, onCollapse: () => void) {
    const isQueryCalled = useBoolean(false)
    const context = useContext(ReportsContext)
    const [executeQuery, { data, loading }] = useLazyQuery(report_custom, {
        fetchPolicy: 'no-cache',
    })

    const executeReport = () => {
        isQueryCalled.setTrue()
        onCollapse()
        executeQuery({
            variables: {
                query
            }
        })
    }

    useMemo(() => {
        if (!isQueryCalled.value) return
        context.dispatch(DATA_UPDATED({
            ...data,
            loading
        }))
    }, [data, loading, context.dispatch])

    return { executeReport, loading, isQueryCalled: isQueryCalled.value }
}