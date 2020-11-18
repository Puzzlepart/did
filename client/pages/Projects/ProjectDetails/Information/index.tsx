import { EntityLabel } from 'components/EntityLabel'
import { UserMessage } from 'components/UserMessage'
import { MessageBarType } from 'office-ui-fabric'
import React, { FunctionComponent, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { ProjectDetailsContext } from '../context'
import styles from './Information.module.scss'

export const Information: FunctionComponent = () => {
    const { t } = useTranslation()
    const { project } = useContext(ProjectDetailsContext)
    return (
        <div className={styles.root}>
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
        </div>
    )
}