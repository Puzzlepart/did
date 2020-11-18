import { EntityLabel } from 'components/EntityLabel'
import { UserMessage } from 'components/UserMessage'
import { MessageBarType, Pivot, PivotItem } from 'office-ui-fabric'
import React, { FunctionComponent, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ProjectDetailsContext } from './context'
import { Header } from './Header'
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
          <PivotItem headerText='Information' itemIcon='Info'>
            {project.inactive && (
              <UserMessage
                hidden={!project.inactive}
                text={t('projects.inactiveText')}
                iconName='Warning'
                type={MessageBarType.warning}
              />
            )}
            <div className={styles.description}>{project.description}</div>
            <div className={styles.labels}>
              {project.labels.map((label, idx) => (
                <EntityLabel key={idx} label={label} size='medium' />
              ))}
            </div>
            <UserMessage
              hidden={!project.outlookCategory}
              containerStyle={{ margin: '15px 0 15px 0' }}
              text={t('projects.categoryOutlookText')}
              iconName='OutlookLogoInverse'
            />
          </PivotItem>
          <PivotItem headerText='Time Entries' itemIcon='ReminderTime'>
            <TimeEntries />
          </PivotItem>
        </Pivot>
      </div>
    </ProjectDetailsContext.Provider>
  )
}
