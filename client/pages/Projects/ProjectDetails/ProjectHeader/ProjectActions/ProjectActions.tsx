import { DynamicButton } from 'components'
import { usePermissions } from 'hooks'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { PermissionScope as $ } from 'security'
import { StyledComponent } from 'types'
import { useProjectsContext } from '../../../context'
import { OPEN_EDIT_PANEL } from '../../../reducer/actions'
import styles from './ProjectActions.module.scss'
import { useProjectDeleteAction } from './DeleteAction'

/**
 * @category Projects
 */
export const ProjectActions: StyledComponent = (props) => {
  const { state, dispatch } = useProjectsContext()
  const [, hasPermission] = usePermissions()
  const { t } = useTranslation()
  const onDelete = useProjectDeleteAction()

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
          disabled={!Boolean(state.selected)}
        />
        <DynamicButton
          hidden={!hasPermission($.DELETE_PROJECTS)}
          text={t('projects.deleteButtonLabel')}
          appearance='transparent'
          iconName='Delete'
          {...onDelete}
          disabled={!Boolean(state.selected)}
        />
        <DynamicButton
          hidden={!hasPermission($.MANAGE_PROJECTS)}
          text={t('projects.editButtonLabel')}
          appearance='transparent'
          iconName='Edit'
          onClick={() => dispatch(OPEN_EDIT_PANEL(state.selected))}
          disabled={!Boolean(state.selected)}
        />
      </div>
      {onDelete.dialog}
    </div>
  )
}

ProjectActions.displayName = 'ProjectActions'
ProjectActions.className = styles.projectActions
