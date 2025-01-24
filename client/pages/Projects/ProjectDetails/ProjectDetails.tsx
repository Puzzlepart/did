import { Tabs } from 'components/Tabs'
import React from 'react'
import { StyledComponent } from 'types'
import styles from './ProjectDetails.module.scss'
import { ProjectHeader } from './ProjectHeader'
import { useProjectDetails } from './useProjectDetails'
import { ProjectInformation } from './ProjectInformation'

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
      <ProjectInformation />
      <Tabs items={tabs} level={3} />
    </div>
  )
}

ProjectDetails.displayName = 'ProjectDetails'
ProjectDetails.className = styles.projectDetails
