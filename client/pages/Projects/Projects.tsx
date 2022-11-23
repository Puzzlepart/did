import { TabContainer } from 'components/TabContainer'
import React, { FC } from 'react'
import { PermissionScope } from 'security'
import { ProjectsContext } from './context'
import { useProjects } from './hooks/useProjects'
import { ProjectDetails } from './ProjectDetails'
import { ProjectForm } from './ProjectForm'
import { ProjectList } from './ProjectList'
import { CHANGE_VIEW } from './reducer/actions'
import { ProjectsView } from './types'

/**
 * @category Function Component
 */
export const Projects: FC = () => {
  const { state, dispatch, listProps, t, context } = useProjects()

  return (
    <ProjectsContext.Provider value={context}>
      <TabContainer
        hidden={!!state.selected}
        defaultSelectedKey={state.view}
        onTabChanged={(itemKey) =>
          dispatch(CHANGE_VIEW({ view: itemKey as ProjectsView }))
        }
      >
        <ProjectList
          {...listProps}
          itemKey='search'
          headerText={t('common.search')}
          itemIcon='FabricFolderSearch'
          items={state.projects} />
        <ProjectList
          {...listProps}
          itemKey='my'
          headerText={t('projects.myProjectsText')}
          itemIcon='FabricUserFolder'
          items={state.projects.filter((p) => !!p.outlookCategory)} />
        <ProjectForm
          itemKey='new'
          headerText={t('projects.createNewText')}
          itemIcon='AddTo'
          permission={PermissionScope.MANAGE_PROJECTS}
        />
      </TabContainer>
      {state.selected && <ProjectDetails />}
    </ProjectsContext.Provider>
  )
}
