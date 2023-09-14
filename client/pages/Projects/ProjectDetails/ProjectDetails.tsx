import { Pivot, PivotItem } from '@fluentui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import { useProjectsContext } from '../context'
import styles from './ProjectDetails.module.scss'
import { ProjectHeader } from './ProjectHeader'
import { ProjectInformation } from './ProjectInformation'
import { TimeEntries } from './TimeEntries'

/**
 * Displays the details of a project, including a list of time entries.
 *
 * @category Projects
 */
export const ProjectDetails: StyledComponent = () => {
  const { t } = useTranslation()
  const { loading } = useProjectsContext()

  return (
    <div className={ProjectDetails.className}>
      <ProjectHeader />
      <Pivot>
        <PivotItem
          headerText={t('projects.informationHeaderText')}
          itemKey='information'
          itemIcon='Info'
          headerButtonProps={{
            disabled: loading,
            style: { opacity: loading ? 0.2 : 1 }
          }}
        >
          <ProjectInformation />
        </PivotItem>
        <PivotItem
          headerText={t('projects.timeEntriesHeaderText')}
          itemKey='timeentries'
          itemIcon='ReminderTime'
          headerButtonProps={{
            disabled: loading,
            style: { opacity: loading ? 0.2 : 1 }
          }}
        >
          <TimeEntries />
        </PivotItem>
      </Pivot>
    </div>
  )
}

ProjectDetails.displayName = 'ProjectDetails'
ProjectDetails.className = styles.projectDetails

export * from './ProjectHeader'
export * from './ProjectInformation'
export * from './TimeEntries'
