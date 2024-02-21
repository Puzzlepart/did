import { EventList, UserColumn, UserMessage } from 'components'
import { ListMenuItem } from 'components/List/ListToolbar'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import _ from 'underscore'
import styles from './ProjectTimeEntries.module.scss'
import { ProjectTimeEntriesSummary } from './ProjectTimeEntriesSummary'
import { useProjectTimeEntries } from './useProjectTimeEntries'

/**
 * @category Projects
 */
export const ProjectTimeEntries: StyledComponent = () => {
  const { t } = useTranslation()
  const { loading, timeEntries, onExport, error } = useProjectTimeEntries()
  return (
    <div className={ProjectTimeEntries.className}>
      {error && (
        <UserMessage intent='error' text={t('projects.timeEntriesErrorText')} />
      )}
      {_.isEmpty(timeEntries) ? (
        <UserMessage
          hidden={loading}
          className={styles.noTimeEntriesMessage}
          text={t('projects.noTimeEntriesText')}
        />
      ) : (
        <ProjectTimeEntriesSummary
          loading={loading}
          timeEntries={timeEntries}
        />
      )}
      <EventList
        styles={{ root: { marginTop: 20 } }}
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
        searchBox={{
          placeholder: t('projects.searchTimeEntriesPlaceholder')
        }}
        menuItems={[
          new ListMenuItem(t('projects.exportTimeEntriesLabel'))
            .withIcon('ExcelDocument')
            .setOnClick(() => onExport())
            .setGroup('actions')
        ]}
      />
    </div>
  )
}

ProjectTimeEntries.displayName = 'ProjectTimeEntries'
ProjectTimeEntries.className = styles.projectTimeEntries
