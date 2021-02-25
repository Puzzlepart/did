import { useQuery } from '@apollo/client'
import { AppContext } from 'AppContext'
import { useContext, useLayoutEffect, useMemo, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'
import initFilters from './filters'
import { getQueries } from './queries'
import createReducer from './reducer'
import { DATA_UPDATED, INIT } from './reducer/actions'

import $timeentries from './timeentries.gql'
import { IReportsParams } from './types'

/**
 * Hook for Reports
 */
export function useReports() {
    const { t } = useTranslation()
    const app = useContext(AppContext)
    const params = useParams<IReportsParams>()
    const history = useHistory()
    const queries = getQueries(t)
    const reducer = useMemo(() => createReducer({ app, params, queries }), [])
    const [state, dispatch] = useReducer(reducer, {
        loading: true,
        timeentries: [],
        savedFilters: {},
        groupBy: {
            fieldName: '.',
            emptyGroupName: t('common.all')
        }
    })
    const query = useQuery($timeentries, {
        skip: !state.query,
        fetchPolicy: 'cache-first',
        variables: state.query?.variables
    })
    useLayoutEffect(() => dispatch(INIT()), [])
    useLayoutEffect(() => dispatch(DATA_UPDATED({ query })), [query])
    useLayoutEffect(() => history.push(`/reports/${state.query?.key || ''}`), [state.query])
    const filters = useMemo(() => initFilters(state.filter, t), [state.filter])
    return {
        state,
        dispatch,
        params,
        queries,
        history,
        filters,
        t
    }
}