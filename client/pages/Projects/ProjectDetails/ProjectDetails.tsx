import { Tabs } from 'components/Tabs'
import React from 'react'
import { StyledComponent } from 'types'
import styles from './ProjectDetails.module.scss'
import { ProjectHeader } from './ProjectHeader'
import { useProjectDetails } from './useProjectDetails'

/**
 * Displays the details of a project, including a list of time entries.
 *
 * @category Projects
 */
export const ProjectDetails: StyledComponent = () => {
  const { tabs } = useProjectDetails()

  return (
    <div className={ProjectDetails.className}>
      <ProjectHeader />
      <Tabs items={tabs} />
    </div>
  )
}

ProjectDetails.displayName = 'ProjectDetails'
ProjectDetails.className = styles.projectDetails

export * from './ProjectHeader'
export * from './ProjectInformation'
export * from './ProjectTimeEntries'
