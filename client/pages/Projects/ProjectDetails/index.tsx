import { Pivot, PivotItem } from '@fluentui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import { useProjectsContext } from '../context'
import { Header } from './Header'
import { Information } from './Information'
import styles from './ProjectDetails.module.scss'
import { TimeEntries } from './TimeEntries'

/**
 * @category Projects
 */
export const ProjectDetails: StyledComponent = () => {
  const { t } = useTranslation()
  const { loading } = useProjectsContext()

  return (
    <div className={ProjectDetails.className}>
      <Header />
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
          <Information />
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

export * from './Header'
export * from './Information'
export * from './TimeEntries'
