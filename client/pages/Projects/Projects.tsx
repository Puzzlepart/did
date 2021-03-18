/* eslint-disable tsdoc/syntax */
import { UserMessage } from 'components/UserMessage'
import { usePermissions } from 'hooks'
import { MessageBarType, Pivot, PivotItem } from 'office-ui-fabric-react'
import React, { FunctionComponent } from 'react'
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
export const Projects: FunctionComponent = () => {
  const { hasPermission } = usePermissions()
  const { state, dispatch, listProps, t, context } = useProjects()

  return (
    <ProjectsContext.Provider value={context}>
      <Pivot
        selectedKey={state.view}
        onLinkClick={({ props }) =>
          dispatch(CHANGE_VIEW({ view: props.itemKey as ProjectsView }))
        }
        styles={{ itemContainer: { paddingTop: 10 } }}>
        <PivotItem
          itemID='search'
          itemKey='search'
          headerText={t('common.search')}
          itemIcon='FabricFolderSearch'>
          <UserMessage
            hidden={!state.error}
            type={MessageBarType.error}
            text={t('common.genericErrorText')}
          />
          <ProjectList {...listProps} items={state.projects} />
          {state.selected && <ProjectDetails />}
        </PivotItem>
        <PivotItem
          itemID='my'
          itemKey='my'
          headerText={t('projects.myProjectsText')}
          itemIcon='FabricUserFolder'>
          <UserMessage
            hidden={!state.error}
            type={MessageBarType.error}
            text={t('common.genericErrorText')}
          />
          <UserMessage
            containerStyle={{ marginBottom: 12 }}
            iconName='OutlookLogoInverse'
            text={t('projects.outlookCategoryInfoText')}
          />
          <ProjectList
            {...listProps}
            items={state.projects.filter((p) => !!p.outlookCategory)}
          />
          {state.selected && <ProjectDetails />}
        </PivotItem>
        {hasPermission(PermissionScope.MANAGE_PROJECTS) && (
          <PivotItem
            itemID='new'
            itemKey='new'
            headerText={t('projects.createNewText')}
            itemIcon='AddTo'>
            <ProjectForm />
          </PivotItem>
        )}
      </Pivot>
    </ProjectsContext.Provider>
  )
}
