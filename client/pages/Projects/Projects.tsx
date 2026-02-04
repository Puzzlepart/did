import { Tabs } from 'components/Tabs'
import React, { FC, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { PermissionScope } from 'security'
import { usePermissions } from 'hooks'
import { ProjectsContext } from './context'
import { ProjectDetails } from './ProjectDetails'
import { ProjectForm } from './ProjectForm'
import { ProjectList } from './ProjectList'
import { BulkEditProjectsPanel } from './BulkEditProjectsPanel'
import { CLOSE_EDIT_PANEL, CLOSE_BULK_EDIT_PANEL } from './reducer'
import { useProjects } from './useProjects'
import { IProjectsUrlParameters } from './types'

/**
 * @category Function Component
 */
export const Projects: FC = () => {
  const { t, context, renderDetails, defaultTab, createListProps } =
    useProjects()
  const history = useHistory()
  const urlParameters = useParams<IProjectsUrlParameters>()
  const [, hasPermission] = usePermissions()

  // Block access to /projects/new without permission (before rendering)
  const canCreateProject = hasPermission(PermissionScope.MANAGE_PROJECTS)

  useEffect(() => {
    if (urlParameters.currentTab === 'new' && !canCreateProject) {
      history.replace('/projects')
    }
  }, [urlParameters.currentTab, canCreateProject, history])

  // Don't render unauthorized form to prevent flash of content
  if (urlParameters.currentTab === 'new' && !canCreateProject) {
    return null
  }

  return (
    <ProjectsContext.Provider value={{ ...context }}>
      {renderDetails ? (
        <ProjectDetails />
      ) : (
        <Tabs
          defaultSelectedValue={defaultTab}
          items={{
            s: [ProjectList, t('common.search'), createListProps('s')],
            m: [
              ProjectList,
              t('projects.myProjectsText'),
              createListProps('m')
            ],
            new: [
              ProjectForm,
              t('projects.createNewText'),
              { permission: PermissionScope.MANAGE_PROJECTS }
            ]
          }}
        />
      )}
      <ProjectForm
        edit={{ ...context.state.editProject }}
        panel={{
          open: !!context.state.editProject,
          title: context.state.editProject?.name,
          onDismiss: () => context.dispatch(CLOSE_EDIT_PANEL())
        }}
        refetch={context.refetch}
      />
      <BulkEditProjectsPanel
        open={context.state.bulkEditPanelOpen}
        onDismiss={() => context.dispatch(CLOSE_BULK_EDIT_PANEL())}
        projects={context.state.bulkEditProjects || []}
        onSave={async () => {
          await context.refetch()
        }}
      />
    </ProjectsContext.Provider>
  )
}
