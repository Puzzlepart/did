import { TabContainer } from 'components/TabContainer'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { PermissionScope } from 'security'
import { ProjectsContext } from './context'
import { ProjectDetails } from './ProjectDetails'
import { ProjectForm } from './ProjectForm'
import { ProjectList } from './ProjectList'
import { CHANGE_VIEW } from './reducer/actions'
import { ProjectsView } from './types'
import { useProjects } from './useProjects'

/**
 * @category Function Component
 */
export const Projects: FC = () => {
  const { t } = useTranslation()
  const { listProps, context, renderDetails } = useProjects()

  return (
    <ProjectsContext.Provider value={context}>
      {renderDetails ? (
        <ProjectDetails />
      ) : (
        <TabContainer
          hidden={!!context.state.selected}
          defaultSelectedKey={context.state.view}
          onTabChanged={(itemKey) =>
            context.dispatch(CHANGE_VIEW({ view: itemKey as ProjectsView }))
          }
        >
          <ProjectList
            {...listProps}
            itemKey='search'
            headerText={t('common.search')}
            itemIcon='FabricFolderSearch'
            items={context.state.projects}
          />
          <ProjectList
            {...listProps}
            itemKey='my'
            headerText={t('projects.myProjectsText')}
            itemIcon='FabricUserFolder'
            items={context.state.projects.filter((p) => !!p.outlookCategory)}
          />
          <ProjectForm
            itemKey='new'
            headerText={t('projects.createNewText')}
            itemIcon='AddTo'
            permission={PermissionScope.MANAGE_PROJECTS}
          />
        </TabContainer>
      )}
    </ProjectsContext.Provider>
  )
}
