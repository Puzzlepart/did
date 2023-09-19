import { useMutation } from '@apollo/client'
import { Button } from '@fluentui/react-components'
import copy from 'fast-copy'
import { usePermissions } from 'hooks'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { PermissionScope as $ } from 'security'
import { StyledComponent } from 'types'
import { getFluentIcon as icon } from 'utils/getFluentIcon'
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
        {state.selected?.webLink && (
          <Button
            appearance='transparent'
            icon={icon('WebAsset')}
            onClick={() =>
              window.open(state.selected?.externalSystemURL, '_blank')
            }
          >
            {t('projects.workspaceLabel')}
          </Button>
        )}
        {!state.selected?.outlookCategory && (
          <Button
            appearance='transparent'
            icon={icon('CalendarAdd')}
            onClick={() => onCreateCategory()}
          >
            {t('projects.createOutlookCategoryLabel')}
          </Button>
        )}
        {hasPermission($.MANAGE_PROJECTS) && (
          <Button
            appearance='transparent'
            icon={icon('TableEdit')}
            onClick={() => dispatch(OPEN_EDIT_PANEL(state.selected))}
          >
            {t('projects.editButtonLabel')}
          </Button>
        )}
      </div>
    </div>
  )
}

ProjectActions.displayName = 'ProjectActions'
ProjectActions.className = styles.projectActions
