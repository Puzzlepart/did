import { TabContainer } from 'components/TabContainer'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { PermissionScope } from 'security'
import { ProjectsContext } from './context'
import { ProjectDetails } from './ProjectDetails'
import { ProjectForm } from './ProjectForm'
import { ProjectList } from './ProjectList'
import { CHANGE_TAB } from './reducer/actions'
import { ProjectsTab } from './types'
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
          defaultSelectedKey={context.state.currentTab}
          onTabChanged={(tab: ProjectsTab) =>
            context.dispatch(CHANGE_TAB({ tab }))
          }
        >
          <ProjectList
            {...listProps}
            itemKey='s'
            headerText={t('common.search')}
            items={context.state.projects}
          />
          <ProjectList
            {...listProps}
            itemKey='m'
            headerText={t('projects.myProjectsText')}
            items={context.state.projects.filter((p) => !!p.outlookCategory)}
          />
          <ProjectForm
            itemKey='new'
            headerText={t('projects.createNewText')}
            permission={PermissionScope.MANAGE_PROJECTS}
          />
        </TabContainer>
      )}
    </ProjectsContext.Provider>
  )
}
