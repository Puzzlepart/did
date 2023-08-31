import { useMutation } from '@apollo/client'
import { ActionButton, DefaultButton } from '@fluentui/react'
import copy from 'fast-copy'
import { usePermissions } from 'hooks'
import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PermissionScope } from 'security'
import { useProjectsContext } from '../../../context'
import { ProjectForm } from '../../../ProjectForm'
import { SET_SELECTED_PROJECT } from '../../../reducer/actions'
import styles from './Actions.module.scss'
import $createOutlookCategory from './createOutlookCategory.gql'
import { IActionsProps } from './types'

/**
 * @category Projects
 */
export const Actions: FC<IActionsProps> = (props) => {
  const { refetch, state, dispatch } = useProjectsContext()
  const [, hasPermission] = usePermissions()
  const { t } = useTranslation()
  const [showEditPanel, setShowEditPanel] = useState(false)
  const [createOutlookCategory] = useMutation($createOutlookCategory)

  /**
   * On create category in Outlook
   */
  async function onCreateCategory() {
    const {
      data: { result }
    } = await createOutlookCategory({
      variables: { category: state.selected?.tag }
    })
    if (result.success) {
      const project = copy(state.selected)
      project.outlookCategory = result.data
      dispatch(SET_SELECTED_PROJECT({ project }))
    }
  }

  return (
    <div className={styles.root} hidden={props.hidden}>
      <div className={styles.container}>
        <div className={styles.actionItem} hidden={!state.selected?.webLink}>
          <DefaultButton
            text={t('projects.workspaceLabel')}
            onClick={() => window.location.replace(state.selected?.webLink)}
            iconProps={{ iconName: 'Website' }}
          />
        </div>
        <div
          className={styles.actionItem}
          hidden={!!state.selected?.outlookCategory}
        >
          <ActionButton
            text={t('projects.createOutlookCategoryLabel')}
            iconProps={{ iconName: 'OutlookLogoInverse' }}
            onClick={() => onCreateCategory()}
          />
        </div>
        <div
          className={styles.actionItem}
          hidden={!hasPermission(PermissionScope.MANAGE_PROJECTS)}
        >
          <ActionButton
            text={t('common.editLabel')}
            iconProps={{ iconName: 'Edit' }}
            onClick={() => setShowEditPanel(true)}
          />
          <ProjectForm
            key={state.selected?.tag}
            edit={state.selected}
            panelProps={{
              isOpen: showEditPanel,
              headerText: state.selected?.name,
              isLightDismiss: true,
              onLightDismissClick: () => setShowEditPanel(false),
              onDismiss: () => setShowEditPanel(false),
              onSave: () => {
                setShowEditPanel(false)
                refetch()
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}
