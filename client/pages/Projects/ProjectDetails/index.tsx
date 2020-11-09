import { useQuery } from '@apollo/client'
import { EntityLabel } from 'components/EntityLabel'
import { UserMessage } from 'components/UserMessage'
import { MessageBarType, Icon } from 'office-ui-fabric'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TimeEntry } from 'types'
import $timeentries from '../timeentries.gql'
import { Actions } from './actions'
import styles from './ProjectDetails.module.scss'
import { ProjectDetailsContext } from './ProjectDetailsContext'
import { Summary } from './Summary'
import { TimeEntries } from './TimeEntries'
import { IProjectDetailsProps } from './types'

export const ProjectDetails: React.FunctionComponent<IProjectDetailsProps> = (props: IProjectDetailsProps) => {
  const { t } = useTranslation()
  const [project, setProject] = useState({ ...props.project })
  const { loading, error, data } = useQuery<{ timeentries: TimeEntry[] }>($timeentries, {
    variables: {
      query: { projectId: props.project.id }
    }
  })
  const timeentries = data ? data.timeentries : []

  useEffect(() => setProject({ ...props.project }), [props.project])

  const ctxValue = useMemo(
    () => ({
      loading,
      error,
      project,
      timeentries,
      setProject
    }),
    [project, timeentries, loading]
  )

  return (
    <ProjectDetailsContext.Provider value={ctxValue}>
      <div className={styles.root}>
        <div className={styles.header}>
          <div className={styles.icon}>
            <Icon iconName={project.icon} />
          </div>
          <div className={styles.title}>
            <div className={styles.text}>{project.name}</div>
            <div className={styles.subText}>{project.customer.name}</div>
          </div>
          <Actions project={project} />
        </div>
        {project.inactive && (
          <UserMessage
            hidden={!project.inactive}
            text={t('projects.inactiveText')}
            iconName="Warning"
            type={MessageBarType.warning}
          />
        )}
        <div className={styles.description}>{project.description}</div>
        <div className={styles.labels}>
          {project.labels.map((label, idx) => (
            <EntityLabel key={idx} label={label} size="medium" />
          ))}
        </div>
        <UserMessage
          hidden={!project.outlookCategory}
          containerStyle={{ margin: '15px 0 15px 0' }}
          text={t('projects.categoryOutlookText')}
          iconName="OutlookLogoInverse"
        />
        <Summary />
        <TimeEntries />
      </div>
    </ProjectDetailsContext.Provider>
  )
}
