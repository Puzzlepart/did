/* eslint-disable tsdoc/syntax */
import { List, UserMessage } from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { isEmpty } from 'underscore'
import { useSummaryView } from './hooks/useSummaryView'
import styles from './SummaryView.module.scss'

/**
 * @category Function Component
 */
export const SummaryView = (): JSX.Element => {
  const { t } = useTranslation()
  const { state, rows, columns } = useSummaryView()

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <List
          hidden={!state.loading && isEmpty(rows)}
          enableShimmer={state.loading}
          columns={columns}
          items={rows} />
        <UserMessage
          hidden={!isEmpty(rows) || state.loading}
          text={t('admin.noTimeEntriesText')}
        />
      </div>
    </div>
  )
}
