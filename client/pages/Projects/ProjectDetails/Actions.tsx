import { useMutation } from '@apollo/react-hooks'
import { AppContext } from 'AppContext'
import { manageProjects } from 'config/security/permissions'
import { IBaseResult } from 'graphql'
import { IOutlookCategory } from 'interfaces'
import { Panel } from 'office-ui-fabric-react'
import { DefaultButton } from 'office-ui-fabric-react/lib/Button'
import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { isEmpty } from 'underscore'
import * as excel from 'utils/exportExcel'
import { ProjectForm } from '../ProjectForm'
import { ProjectsContext } from '../ProjectsContext'
import columns from './columns'
import { CREATE_OUTLOOK_CATEGORY } from './CREATE_OUTLOOK_CATEGORY'
import styles from './ProjectDetails.module.scss'
import { ProjectDetailsContext } from './ProjectDetailsContext'
import { IProjectDetailsProps } from './types'

export const Actions = (props: IProjectDetailsProps) => {
    const { refetch } = useContext(ProjectsContext)
    const { hasPermission } = useContext(AppContext)
    const { t } = useTranslation()
    const [showEditPanel, setShowEditPanel] = useState(false)
    const context = useContext(ProjectDetailsContext)
    const [createOutlookCategory] = useMutation<{ result: IBaseResult }, { category: IOutlookCategory }>(CREATE_OUTLOOK_CATEGORY)

    /**
     * On export to Excel
     */
    async function onExportExcel() {
        const key = context.project.id.replace(/\s+/g, '-').toUpperCase()
        await excel.exportExcel(
            context.timeentries,
            {

                columns: columns(t),
                fileName: `TimeEntries-${key}-${new Date().toDateString().split(' ').join('-')}.xlsx`,
            })
    }

    /**
     * On create category in Outlook
     */
    async function onCreateCategory() {
        const colorIdx = context.project.id.split('').map(c => c.charCodeAt(0)).reduce((a, b) => a + b) % 24
        const { data: { result } } = await createOutlookCategory({
            variables: { category: { displayName: context.project.id.toString(), color: `preset${colorIdx}` } }
        })
        if (result.success) {
            context.setProject({
                ...context.project,
                outlookCategory: JSON.parse(result.data),
            })
        }
    }

    return (
        <div className={styles.actions}>
            <div className={styles.actionItem} hidden={!hasPermission(manageProjects)}>
                <DefaultButton
                    text={t('common.editLabel')}
                    iconProps={{ iconName: 'PageEdit' }}
                    onClick={() => setShowEditPanel(true)} />
            </div>
            <div className={styles.actionItem} hidden={isEmpty(context.timeentries)}>
                <DefaultButton
                    text={t('projects.exportTimeEntriesLabel')}
                    iconProps={{ iconName: 'ExcelDocument' }}
                    onClick={onExportExcel} />
            </div>
            <div className={styles.actionItem} hidden={!context.project.webLink}>
                <DefaultButton
                    text={t('projects.workspaceLabel')}
                    onClick={() => window.location.replace(context.project.webLink)}
                    iconProps={{ iconName: 'WorkforceManagement' }} />
            </div>
            <div className={styles.actionItem} hidden={!!context.project.outlookCategory}>
                <DefaultButton
                    text={t('projects.createOutlookCategoryLabel')}
                    iconProps={{ iconName: 'OutlookLogoInverse' }}
                    onClick={() => onCreateCategory()} />
            </div>
            <Panel
                isOpen={showEditPanel}
                headerText={props.project.name}
                onDismiss={() => setShowEditPanel(false)}>
                <ProjectForm
                    key={props.project.id}
                    edit={props.project}
                    onSubmitted={() => {
                        setShowEditPanel(false)
                        refetch()
                    }} />
            </Panel>
        </div>
    )
}
