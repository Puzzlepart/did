/* eslint-disable tsdoc/syntax */
import { ActionButton } from '@fluentui/react'
import { EventList, UserColumn, UserMessage } from 'components'
import { Progress } from 'components/Progress'
import React from 'react'
import { useTranslation } from 'react-i18next'
import _ from 'underscore'
import { Summary } from './Summary'
import styles from './TimeEntries.module.scss'
import { useTimeEntries } from './useTimeEntries'

/**
 * @category Projects
 */
export const TimeEntries: React.FC = () => {
  const { t } = useTranslation()
  const { loading, timeentries, onExport, error } = useTimeEntries()
  return (
    <div className={styles.root}>
      {!_.isEmpty(timeentries) && !loading && (
        <Summary loading={loading} timeentries={timeentries} />
      )}
      <div hidden={_.isEmpty(timeentries)}>
        <ActionButton
          text={t('projects.exportTimeEntriesLabel')}
          iconProps={{ iconName: 'ExcelDocument' }}
          onClick={() => onExport()}
        />
      </div>
      {error && (
        <UserMessage type={'error'} text={t('projects.timeEntriesErrorText')} />
      )}
      {_.isEmpty(timeentries) && !loading && (
        <UserMessage text={t('projects.noTimeEntriesText')} />
      )}
      {loading && (
        <Progress
          label={t('projects.timeEntriesLoadingLabel')}
          description={t('projects.timeEntriesLoadingDescription')}
          iconProps={{ iconName: 'TimelineMatrixView' }}
        />
      )}
      {!_.isEmpty(timeentries) && (
        <EventList
          items={timeentries}
          additionalColumns={[
            {
              key: 'resource.displayName',
              fieldName: 'resource.displayName',
              name: t('common.employeeLabel'),
              minWidth: 100,
              maxWidth: 150,
              onRender: ({ resource }) => <UserColumn user={resource} />
            }
          ]}
          dateFormat='MMM DD YYYY HH:mm'
          columnWidths={{ time: 250 }}
        />
      )}
    </div>
  )
}
