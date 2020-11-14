import { useMutation } from '@apollo/client'
import { AppContext } from 'AppContext'
import { PERMISSION } from 'config/security/permissions'
import { DefaultButton, Panel } from 'office-ui-fabric'
import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { isEmpty } from 'underscore'
import * as excel from 'utils/exportExcel'
import { ProjectsContext } from '../context'
import $createOutlookCategory from './createOutlookCategory.gql'
import { ProjectForm } from '../ProjectForm'
import columns from './columns'
import styles from './ProjectDetails.module.scss'
import { ProjectDetailsContext } from './ProjectDetailsContext'
import { IProjectDetailsProps } from './types'

export const Actions = (props: IProjectDetailsProps) => {
  const { refetch } = useContext(ProjectsContext)
  const { user } = useContext(AppContext)
  const { t } = useTranslation()
  const [showEditPanel, setShowEditPanel] = useState(false)
  const context = useContext(ProjectDetailsContext)
  const [createOutlookCategory] = useMutation($createOutlookCategory)

  /**
   * On export to Excel
   */
  async function onExportExcel() {
    const key = context.project.id.replace(/\s+/g, '-').toUpperCase()
    await excel.exportExcel(context.timeentries, {
      columns: columns(t),
      fileName: `TimeEntries-${key}-${new Date().toDateString().split(' ').join('-')}.xlsx`
    })
  }

  /**
   * On create category in Outlook
   */
  async function onCreateCategory() {
    const {
      data: { result }
    } = await createOutlookCategory({
      variables: { category: context.project.id }
    })
    if (result.success) {
      context.setProject({
        ...context.project,
        outlookCategory: JSON.parse(result.data)
      })
    }
  }

  return (
    <div className={styles.actions}>
      <div className={styles.actionItem} hidden={!user.hasPermission(PERMISSION.MANAGE_PROJECTS)}>
        <DefaultButton
          text={t('common.editLabel')}
          iconProps={{ iconName: 'Edit' }}
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
          iconProps={{ iconName: 'Website' }} />
      </div>
      <div className={styles.actionItem} hidden={!!context.project.outlookCategory}>
        <DefaultButton
          text={t('projects.createOutlookCategoryLabel')}
          iconProps={{ iconName: 'OutlookLogoInverse' }}
          onClick={() => onCreateCategory()}
        />
      </div>
      <Panel isOpen={showEditPanel} headerText={props.project.name} onDismiss={() => setShowEditPanel(false)}>
        <ProjectForm
          key={props.project.id}
          edit={props.project}
          onSubmitted={() => {
            setShowEditPanel(false)
            refetch()
          }}
        />
      </Panel>
    </div>
  )
}
