import { Pivot, PivotItem } from '@fluentui/react'
import React, { FC, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { ProjectsContext } from '../context'
import { Header } from './Header'
import { Information } from './Information'
import styles from './ProjectDetails.module.scss'
import { TimeEntries } from './TimeEntries'

/**
 * @category Projects
 */
export const ProjectDetails: FC = () => {
  const { t } = useTranslation()
  const { loading } = useContext(ProjectsContext)

  return (
    <div className={styles.root}>
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

export * from './Header'
export * from './Information'
export * from './TimeEntries'
