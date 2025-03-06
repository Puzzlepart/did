import { EventList, UserColumn, UserMessage } from 'components'
import { ListMenuItem } from 'components/List'
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
  const { loading, selected, timeEntries, onExport, error, skip } =
    useProjectTimeEntries()
  return (
    <div className={ProjectTimeEntries.className}>
      <div hidden={skip.value && !loading}>
        {error && (
          <UserMessage
            intent='error'
            text={t('projects.timeEntriesErrorText')}
          />
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
      </div>

      <EventList
        items={timeEntries}
        enableShimmer={loading || !Boolean(selected)}
        additionalColumns={[
          {
            key: 'resource.displayName',
            fieldName: 'resource.displayName',
            name: t('common.employeeLabel'),
            minWidth: 100,
            maxWidth: 150,
            onRender: ({ resource, role }) => (
              <UserColumn user={resource} role={role} />
            )
          }
        ]}
        dateFormat='MMM DD YYYY HH:mm'
        columnWidths={{ time: 250 }}
        searchBox={{
          disabled: skip.value,
          placeholder: t('projects.searchTimeEntriesPlaceholder')
        }}
        menuItems={[
          new ListMenuItem(t('projects.loadTimeEntriesLabel'))
            .withIcon('Timer')
            .setOnClick(() => {
              skip.setValue(!skip.value)
            })
            .setHidden(!skip.value)
            .setGroup('actions'),
          new ListMenuItem(t('projects.exportTimeEntriesLabel'))
            .withIcon('ExcelDocument')
            .setOnClick(() => onExport())
            .setGroup('actions')
            .setDisabled(_.isEmpty(timeEntries))
        ]}
        hidden={!loading && _.isEmpty(timeEntries)}
      />
    </div>
  )
}

ProjectTimeEntries.displayName = 'ProjectTimeEntries'
ProjectTimeEntries.className = styles.projectTimeEntries
