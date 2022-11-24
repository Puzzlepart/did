import { ActionButton } from '@fluentui/react'
import { EventList, UserColumn, UserMessage } from 'components'
import { Progress } from 'components/Progress'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import _ from 'underscore'
import { Summary } from './Summary'
import styles from './TimeEntries.module.scss'
import { useTimeEntries } from './useTimeEntries'

/**
 * @category Projects
 */
export const TimeEntries: FC = () => {
  const { t } = useTranslation()
  const { loading, timeentries, onExport, error } = useTimeEntries()
  return (
    <div className={styles.root}>
      {error ? (
        <UserMessage type={'error'} text={t('projects.timeEntriesErrorText')} />
      ) : (
        <>
          <Summary loading={loading} timeentries={timeentries} />
          <div hidden={_.isEmpty(timeentries)}>
            <ActionButton
              text={t('projects.exportTimeEntriesLabel')}
              iconProps={{ iconName: 'ExcelDocument' }}
              onClick={() => onExport()}
            />
          </div>
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
          <EventList
            items={timeentries}
            enableShimmer={loading}
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
        </>
      )}
    </div>
  )
}
