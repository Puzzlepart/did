/* eslint-disable unicorn/prevent-abbreviations */
import { useLazyQuery } from '@apollo/client'
import { useContext, useMemo, useState } from 'react'
import { report_custom } from '../queries'
import { DATA_UPDATED } from '../reducer/actions'
import { ReportsContext } from '../context'
import { ReportsQuery } from '../../../types'

/**
 * Custom hook for CustomQueryTab component logic
 *
 * @returns CustomQueryTab component logic
 * 
 * @category Reports Hooks
 */
export function useCustomQueryTab() {
    const context = useContext(ReportsContext)
    const [formState, setFormState] = useState<ReportsQuery>({})
    const [sortAsc, setSortAsc] = useState<boolean>(true)

    // Query for fetching data
    const [executeQuery, { data, loading }] = useLazyQuery(report_custom, {
        fetchPolicy: 'no-cache',
    })

    // Execute the query with the current form state
    const executeReport = () => {
        executeQuery({
            variables: {
                query: formState,
                sortAsc
            }
        })
    }

    // Update the context data when query completes
    useMemo(() => {
        if (data) {
            context.dispatch(DATA_UPDATED({
                ...data,
                loading
            }))
        }
    }, [data, loading, context.dispatch])

    // Update a specific form field
    const updateField = (field: keyof ReportsQuery, value: any) => {
        setFormState((prev) => ({
            ...prev,
            [field]: value
        }))
    }

    // Check if the form is valid to execute the query
    const isFormValid = useMemo(() => {
        // Require at least one field to be set
        return Object.values(formState).some(value =>
            value !== undefined && value !== '' &&
            (Array.isArray(value) ? value.length > 0 : true)
        )
    }, [formState])


    // eslint-disable-next-line no-console
    console.log('context', context.state)

    return {
        formState,
        sortAsc,
        setSortAsc,
        updateField,
        executeReport,
        isFormValid,
        loading
    }
}