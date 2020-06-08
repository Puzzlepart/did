import { useMutation } from '@apollo/react-hooks'
import { EntityLabel } from 'components/EntityLabel'
import { UserMessage } from 'components/UserMessage'
import { IBaseResult } from 'graphql'
import { IOutlookCategory } from 'interfaces'
import { DefaultButton } from 'office-ui-fabric-react/lib/Button'
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { CREATE_OUTLOOK_CATEGORY } from './CREATE_OUTLOOK_CATEGORY'
import { IProjectDetailsProps } from './IProjectDetailsProps'
import styles from './ProjectDetails.module.scss'
import { TimeEntries } from './TimeEntries'

/**
 * @category Projects
 */
export const ProjectDetails = (props: IProjectDetailsProps) => {
    const { t } = useTranslation(['projects', 'common'])
    const [project, setProject] = React.useState({ ...props.project })
    const [createOutlookCategory] = useMutation<{ result: IBaseResult }, { category: IOutlookCategory }>(CREATE_OUTLOOK_CATEGORY)

    React.useEffect(() => setProject({ ...props.project }), [props.project])

    /**
     * On create category in Outlook
     * 
     * @param {string} color Color for the category (randomized if not specified)
     */
    async function onCreateCategory(color: string = 'preset' + Math.floor(Math.random() * Math.floor(25))) {
        const { data: { result } } = await createOutlookCategory({ variables: { category: { displayName: project.key.toString(), color } } })
        if (result.success) {
            setProject({ ...project, outlookCategory: JSON.parse(result.data) })
        }
    }

    return (
        <div className={styles.root}>
            <div className={styles.info}>
                <div className={styles.left}>
                    <h3 className={styles.name}>{project.name}</h3>
                    <h5 className={styles.customer}>{project.customer.name}</h5>
                    {project.inactive && (
                        <UserMessage
                            text={t('inactiveText')}
                            iconName='Warning'
                            type={MessageBarType.warning} />
                    )}
                    <div className={styles.description}>{project.description}</div>
                    <div className={styles.description}>
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
                </div>
                <div className={`${styles.actions} ${styles.right}`}>
                    <div
                        className={styles.buttonContainer}
                        hidden={!project.webLink}>
                        <DefaultButton
                            text={t('workspaceLabel')}
                            onClick={() => window.location.replace(project.webLink)}
                            iconProps={{ iconName: 'WorkforceManagement' }} />
                    </div>
                    <div
                        className={styles.buttonContainer}
                        hidden={!!project.outlookCategory}>
                        <DefaultButton
                            text={t('createOutlookCategoryLabel')}
                            iconProps={{ iconName: 'OutlookLogoInverse' }}
                            onClick={() => onCreateCategory()} />
                    </div>
                </div>
            </div>
            <TimeEntries project={project} />
        </div>
    )
}