import { useMutation } from '@apollo/client'
import { DynamicButton } from 'components'
import copy from 'fast-copy'
import { usePermissions } from 'hooks'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { PermissionScope as $ } from 'security'
import { StyledComponent } from 'types'
import { useProjectsContext } from '../../../context'
import { OPEN_EDIT_PANEL, SET_SELECTED_PROJECT } from '../../../reducer/actions'
import $createOutlookCategory from './createOutlookCategory.gql'
import styles from './ProjectActions.module.scss'

/**
 * @category Projects
 */
export const ProjectActions: StyledComponent = (props) => {
  const { state, dispatch } = useProjectsContext()
  const [, hasPermission] = usePermissions()
  const { t } = useTranslation()
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
      dispatch(SET_SELECTED_PROJECT(project))
    }
  }

  return (
    <div className={ProjectActions.className} hidden={props.hidden}>
      <div className={styles.container}>
        <DynamicButton
          hidden={!state.selected?.webLink}
          text={t('projects.workspaceLabel')}
          appearance='transparent'
          iconName='WebAsset'
          onClick={() =>
            window.open(state.selected?.externalSystemURL, '_blank')
          }
        />
        <DynamicButton
          hidden={!!state.selected?.outlookCategory}
          text={t('projects.createOutlookCategoryLabel')}
          appearance='transparent'
          iconName='CalendarAdd'
          onClick={() => onCreateCategory()}
        />
        <DynamicButton
          hidden={!hasPermission($.MANAGE_PROJECTS)}
          text={t('projects.editButtonLabel')}
          appearance='transparent'
          iconName='TableEdit'
          onClick={() => dispatch(OPEN_EDIT_PANEL(state.selected))}
        />
      </div>
    </div>
  )
}

ProjectActions.displayName = 'ProjectActions'
ProjectActions.className = styles.projectActions
