import { useQuery } from '@apollo/client'
import { UserMessage } from 'components'
import List from 'components/List'
import { DateObject } from 'DateUtils'
import { Pivot, PivotItem } from 'office-ui-fabric'
import React, { useEffect, useMemo, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import { first, isEmpty } from 'underscore'
import { commandBar } from './commandBar'
import { ISummaryViewContext, SummaryViewContext } from './context'
import { reducer } from './reducer'
import styles from './SummaryView.module.scss'
import $timeentries from './timeentries.gql'
import { getScopes, getViewTypes, ISummaryViewScope } from './types'
import { createColumns, createRows } from './utils'

export const SummaryView = (): JSX.Element => {
  const { t } = useTranslation()
  const types = getViewTypes(t)
  const scopes = getScopes(t)
  const [state, dispatch] = useReducer(reducer, {
    timeentries: [],
    range: {
      from: new DateObject().add('-8week').startOfWeek,
      to: new DateObject().endOfWeek
    },
    type: first(types),
    scope: first(scopes)
  })
  const { data, loading } = useQuery($timeentries, {
    fetchPolicy: 'cache-first',
    variables: {
      query: {
        startDateTime: state.range.from.format(),
        endDateTime: state.range.to.format()
      }
    }
  })

  useEffect(() => {
    dispatch({ type: 'DATA_UPDATED', payload: data })
  }, [data])

  const columns = useMemo(() => createColumns(state, t), [state])
  const ctxValue: ISummaryViewContext = useMemo(
    () => ({
      ...state,
      dispatch,
      types,
      loading,
      t,
      scopes,
      columns,
      rows: createRows(state, columns, t)
    }),
    [state, loading]
  )

  return (
    <div className={styles.root}>
      <SummaryViewContext.Provider value={ctxValue}>
        <Pivot
          onLinkClick={(item) =>
            dispatch({ type: 'CHANGE_SCOPE', payload: item.props as ISummaryViewScope })
          }>
          {ctxValue.scopes.map((scope) => (
            <PivotItem key={scope.itemKey} {...scope}>
              <div className={styles.container}>
                <List
                  hidden={!loading && isEmpty(ctxValue.rows)}
                  enableShimmer={loading}
                  columns={columns}
                  items={ctxValue.rows}
                  commandBar={commandBar(ctxValue)}
                />
                <UserMessage
                  hidden={!isEmpty(ctxValue.rows) || loading}
                  text={t('admin.noTimeEntriesText')}
                />
              </div>
            </PivotItem>
          ))}
        </Pivot>
      </SummaryViewContext.Provider>
    </div>
  )
}
