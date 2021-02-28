/* eslint-disable tsdoc/syntax */
import { useQuery } from '@apollo/client'
import { List, UserMessage } from 'components'
import { DateObject } from 'DateUtils'
import { Pivot, PivotItem } from 'office-ui-fabric-react'
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

/**
 * @category Function Component
 */
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

  const columns = useMemo(() => createColumns(state, t), [state, t])
  const contextValue: ISummaryViewContext = useMemo(
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
    [state, loading, columns, scopes, types, t]
  )

  return (
    <div className={styles.root}>
      <SummaryViewContext.Provider value={contextValue}>
        <Pivot
          onLinkClick={(item) =>
            dispatch({
              type: 'CHANGE_SCOPE',
              payload: item.props as ISummaryViewScope
            })
          }>
          {contextValue.scopes.map((scope) => (
            <PivotItem key={scope.itemKey} {...scope}>
              <div className={styles.container}>
                <List
                  hidden={!loading && isEmpty(contextValue.rows)}
                  enableShimmer={loading}
                  columns={columns}
                  items={contextValue.rows}
                  commandBar={commandBar(contextValue)}
                />
                <UserMessage
                  hidden={!isEmpty(contextValue.rows) || loading}
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
