import { useQuery } from '@apollo/react-hooks'
import { EntityLabel } from 'components/EntityLabel'
import { UserMessage } from 'components/UserMessage'
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import React, { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Actions } from './Actions'
import styles from './ProjectDetails.module.scss'
import PROJECT_TIME_ENTRIES from './PROJECT_TIME_ENTRIES'
import { Summary } from './Summary'
import { IProjectDetailsProps, ProjectDetailsContext } from './types'
import { TimeEntries } from './TimeEntries'

/**
 * @category Projects
 */
export const ProjectDetails = (props: IProjectDetailsProps) => {
    const { t } = useTranslation(['projects', 'common'])
    const [project, setProject] = React.useState({ ...props.project })
    const { loading, error, data } = useQuery<{ timeentries: any[] }>(PROJECT_TIME_ENTRIES, { variables: { projectId: props.project.id } })
    const timeentries = data ? data.timeentries : []

    useEffect(() => setProject({ ...props.project }), [props.project])

    const ctxValue = useMemo(() => ({
        loading,
        error,
        project,
        timeentries,
        setProject,
    }), [project, timeentries])

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
                </div>
                {project.inactive && (
                    <UserMessage
                        text={t('inactiveText')}
                        iconName='Warning'
                        type={MessageBarType.warning} />
                )}
                <div className={styles.description}>{project.description}</div>
                <div className={styles.labels}>
                    {project.labels.map((label, idx) => (
                        <EntityLabel
                            key={idx}
                            label={label}
                            size='small' />
                    ))}
                </div>
                <div hidden={!project.outlookCategory}>
                    <MessageBar messageBarIconProps={{ iconName: 'OutlookLogoInverse' }}>{t('categoryOutlookText')}</MessageBar>
                </div>
                <Summary />
                <Actions />
                <TimeEntries />
            </div>
        </ProjectDetailsContext.Provider>
    )
}