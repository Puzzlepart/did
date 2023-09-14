import { ActionButton } from '@fluentui/react'
import { EventList, UserColumn, UserMessage } from 'components'
import { Progress } from 'components/Progress'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import _ from 'underscore'
import { Summary } from './Summary'
import styles from './TimeEntries.module.scss'
import { useTimeEntries } from './useTimeEntries'

/**
 * @category Projects
 */
export const TimeEntries: StyledComponent = () => {
  const { t } = useTranslation()
  const { loading, timeEntries, onExport, error } = useTimeEntries()
  return (
    <div className={TimeEntries.className}>
      {error ? (
        <UserMessage intent='error' text={t('projects.timeEntriesErrorText')} />
      ) : (
        <>
          <Summary loading={loading} timeEntries={timeEntries} />
          <div hidden={_.isEmpty(timeEntries)}>
            <ActionButton
              text={t('projects.exportTimeEntriesLabel')}
              iconProps={{
                iconName: 'ExcelDocument',
                styles: { root: { color: 'green' } }
              }}
              onClick={() => onExport()}
            />
          </div>
          {_.isEmpty(timeEntries) && !loading && (
            <UserMessage text={t('projects.noTimeEntriesText')} />
          )}
          {loading && <Progress text={t('projects.timeEntriesLoadingLabel')} />}
          <EventList
            items={timeEntries}
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

TimeEntries.displayName = 'TimeEntries'
TimeEntries.className = styles.timeEntries