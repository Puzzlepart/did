import { useMutation } from '@apollo/client'
import { AppContext } from 'AppContext'
import { PERMISSION } from 'config/security/permissions'
import { DefaultButton, Panel } from 'office-ui-fabric'
import React, { FunctionComponent, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ProjectsContext } from '../../context'
import { ProjectForm } from '../../ProjectForm'
import $createOutlookCategory from './createOutlookCategory.gql'
import styles from './Header.module.scss'

export const Actions: FunctionComponent = () => {
  const { refetch, state, dispatch } = useContext(ProjectsContext)
  const { user } = useContext(AppContext)
  const { t } = useTranslation()
  const [showEditPanel, setShowEditPanel] = useState(false)
  const [createOutlookCategory] = useMutation($createOutlookCategory)

  /**
   * On create category in Outlook
   */
  async function onCreateCategory() {
    const {
      data: { result }
    } = await createOutlookCategory({ variables: { category: state.selected.id } })
    if (result.success) {
      dispatch({
        type: 'SET_SELECTED_PROJECT',
        project: {
          ...state.selected,
          outlookCategory: JSON.parse(result.data)
        }
      })
    }
  }

  return (
    <div className={styles.actions}>
      <div className={styles.actionItem} hidden={!user.hasPermission(PERMISSION.MANAGE_PROJECTS)}>
        <DefaultButton
          text={t('common.editLabel')}
          iconProps={{ iconName: 'Edit' }}
          onClick={() => setShowEditPanel(true)}
        />
      </div>
      <div className={styles.actionItem} hidden={!state.selected.webLink}>
        <DefaultButton
          text={t('projects.workspaceLabel')}
          onClick={() => window.location.replace(state.selected.webLink)}
          iconProps={{ iconName: 'Website' }}
        />
      </div>
      <div className={styles.actionItem} hidden={!!state.selected.outlookCategory}>
        <DefaultButton
          text={t('projects.createOutlookCategoryLabel')}
          iconProps={{ iconName: 'OutlookLogoInverse' }}
          onClick={() => onCreateCategory()}
        />
      </div>
      <Panel isOpen={showEditPanel} headerText={state.selected.name} onDismiss={() => setShowEditPanel(false)}>
        <ProjectForm
          key={state.selected.id}
          edit={state.selected}
          onSubmitted={() => {
            setShowEditPanel(false)
            refetch()
          }}
        />
      </Panel>
    </div>
  )
}
