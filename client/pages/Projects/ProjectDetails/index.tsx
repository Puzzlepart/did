import { Pivot, PivotItem } from 'office-ui-fabric'
import React, { FunctionComponent, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ProjectDetailsContext } from './context'
import { Header } from './Header'
import { Information } from './Information'
import styles from './ProjectDetails.module.scss'
import { TimeEntries } from './TimeEntries'
import { IProjectDetailsProps } from './types'

export const ProjectDetails: FunctionComponent<IProjectDetailsProps> = (props: IProjectDetailsProps) => {
  const { t } = useTranslation()
  const [project, setProject] = useState({ ...props.project })

  useEffect(() => setProject({ ...props.project }), [props.project])

  const ctxValue = useMemo(
    () => ({
      project,
      setProject
    }),
    [project]
  )

  return (
    <ProjectDetailsContext.Provider value={ctxValue}>
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
    </ProjectDetailsContext.Provider>
  )
}
