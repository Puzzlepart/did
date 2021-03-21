/* eslint-disable tsdoc/syntax */
import { TabContainer } from 'components/TabContainer'
import React from 'react'
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
export const Projects: React.FC = () => {
  const { state, dispatch, listProps, t, context } = useProjects()

  return (
    <ProjectsContext.Provider value={context}>
      <TabContainer
        selectedKey={state.view}
        onLinkClick={({ props }) =>
          dispatch(CHANGE_VIEW({ view: props.itemKey as ProjectsView }))
        }>
        <ProjectList
          {...listProps}
          itemKey='search'
          headerText={t('common.search')}
          itemIcon='FabricFolderSearch'
          items={state.projects}>
          {state.selected && <ProjectDetails />}
        </ProjectList>
        <ProjectList
          {...listProps}
          itemKey='my'
          headerText={t('projects.myProjectsText')}
          itemIcon='FabricUserFolder'
          items={state.projects.filter((p) => !!p.outlookCategory)}>
          {state.selected && <ProjectDetails />}
        </ProjectList>
        <ProjectForm
          itemKey='new'
          headerText={t('projects.createNewText')}
          itemIcon='AddTo'
          permission={PermissionScope.MANAGE_PROJECTS}
        />
      </TabContainer>
    </ProjectsContext.Provider>
  )
}
