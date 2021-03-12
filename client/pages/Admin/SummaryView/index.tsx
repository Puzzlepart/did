/* eslint-disable tsdoc/syntax */
import { List, UserMessage } from 'components'
import { IColumn, Pivot, PivotItem } from 'office-ui-fabric-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { isEmpty } from 'underscore'
import { useSummaryView } from './hooks/useSummaryView'
import styles from './SummaryView.module.scss'
import { ISummaryViewScope } from './types'
import { WeekColumn } from './WeekColumn'

/**
 * @category Function Component
 */
export const SummaryView = (): JSX.Element => {
  const { t } = useTranslation()
  const { dispatch, loading, scopes, rows, columns } = useSummaryView({
    onColumnRender: (item: any, _index: number, column: IColumn) => (
      <WeekColumn user={item.user} periods={item[column.fieldName]} />
    )
  })

  return (
    <div className={styles.root}>
      <Pivot
        onLinkClick={(item) =>
          dispatch({
            type: 'CHANGE_SCOPE',
            payload: item.props as ISummaryViewScope
          })
        }>
        {scopes.map((scope) => (
          <PivotItem key={scope.itemKey} {...scope}>
            <div className={styles.container}>
              <List
                hidden={!loading && isEmpty(rows)}
                enableShimmer={loading}
                columns={columns}
                items={rows}
              />
              <UserMessage
                hidden={!isEmpty(rows) || loading}
                text={t('admin.noTimeEntriesText')}
              />
            </div>
          </PivotItem>
        ))}
      </Pivot>
    </div>
  )
}
