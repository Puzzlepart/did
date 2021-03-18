/* eslint-disable tsdoc/syntax */
import { EventList, UserMessage } from 'components'
import {
  ActionButton,
  MessageBarType,
  ProgressIndicator
} from 'office-ui-fabric-react'
import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { isEmpty } from 'underscore'
import { Summary } from './Summary'
import styles from './TimeEntries.module.scss'
import { useTimeEntries } from './useTimeEntries'

/**
 * @category Projects
 */
export const TimeEntries: FunctionComponent = () => {
  const { t } = useTranslation()
  const { loading, timeentries, onExport, error } = useTimeEntries()
  return (
    <div className={styles.root}>
      {!isEmpty(timeentries) && !loading && (
        <Summary loading={loading} timeentries={timeentries} />
      )}
      <div hidden={isEmpty(timeentries)}>
        <ActionButton
          text={t('projects.exportTimeEntriesLabel')}
          iconProps={{ iconName: 'ExcelDocument' }}
          onClick={() => onExport()}
        />
      </div>
      {error && (
        <UserMessage
          type={MessageBarType.error}
          text={t('projects.timeEntriesErrorText')}
        />
      )}
      {isEmpty(timeentries) && !loading && (
        <UserMessage text={t('projects.noTimeEntriesText')} />
      )}
      {loading && (
        <ProgressIndicator label={t('projects.timeEntriesLoadingLabel')} />
      )}
      {!isEmpty(timeentries) && (
        <EventList
          items={timeentries}
          additionalColumns={[
            {
              key: 'resource.displayName',
              fieldName: 'resource.displayName',
              name: t('common.employeeLabel'),
              minWidth: 100,
              maxWidth: 150
            }
          ]}
          dateFormat='MMM DD YYYY HH:mm'
          columnWidths={{ time: 250 }}
        />
      )}
    </div>
  )
}
