import { Pivot, PivotItem } from 'office-ui-fabric'
import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { Header } from './Header'
import { Information } from './Information'
import styles from './ProjectDetails.module.scss'
import { TimeEntries } from './TimeEntries'

export const ProjectDetails: FunctionComponent = () => {
  const { t } = useTranslation()

  return (
    <div className={styles.root}>
      <Header />
      <Pivot>
        <PivotItem headerText={t('projects.informationHeaderText')} itemIcon='Info'>
          <Information />
        </PivotItem>
        <PivotItem headerText={t('projects.timeEntriesHeaderText')} itemIcon='ReminderTime'>
          <TimeEntries />
        </PivotItem>
      </Pivot>
    </div>
  )
}
