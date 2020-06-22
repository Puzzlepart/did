import { useMutation } from '@apollo/react-hooks'
import { IBaseResult } from 'graphql'
import { IOutlookCategory } from 'interfaces'
import { DefaultButton } from 'office-ui-fabric-react/lib/Button'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import * as excel from 'utils/exportExcel'
import columns from './columns'
import { CREATE_OUTLOOK_CATEGORY } from './CREATE_OUTLOOK_CATEGORY'
import styles from './ProjectDetails.module.scss'
import { ProjectDetailsContext } from './types'

export const Actions = () => {
    const { t } = useTranslation(['projects', 'common'])
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
     * 
     * @param {string} color Color for the category (randomized if not specified)
     */
    async function onCreateCategory(color: string = 'preset' + Math.floor(Math.random() * Math.floor(25))) {
        const colorIdx = [].slice.call(context.project.id).map(c => c.charCodeAt()).reduce((a, b) => a + b) % 24
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
            <div
                className={styles.buttonContainer}
                hidden={context.timeentries.length === 0}>
                <DefaultButton
                    text={t('exportTimeEntriesLabel')}
                    iconProps={{ iconName: 'ExcelDocument' }}
                    onClick={onExportExcel} />
            </div>
            <div
                className={styles.buttonContainer}
                hidden={!context.project.webLink}>
                <DefaultButton
                    text={t('workspaceLabel')}
                    onClick={() => window.location.replace(context.project.webLink)}
                    iconProps={{ iconName: 'WorkforceManagement' }} />
            </div>
            <div
                className={styles.buttonContainer}
                hidden={!!context.project.outlookCategory}>
                <DefaultButton
                    text={t('createOutlookCategoryLabel')}
                    iconProps={{ iconName: 'OutlookLogoInverse' }}
                    onClick={() => onCreateCategory()} />
            </div>
        </div>
    )
}
