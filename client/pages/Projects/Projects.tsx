import { useQuery } from '@apollo/client'
import { AppContext } from 'AppContext'
import { UserMessage } from 'components/UserMessage'
import { PERMISSION } from 'config/security/permissions'
import { MessageBarType, Pivot, PivotItem, SelectionMode } from 'office-ui-fabric'
import { ProjectForm } from 'pages/Projects/ProjectForm'
import React, { FunctionComponent, useContext, useEffect, useMemo, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'
import { find } from 'underscore'
import { IProjectsContext, ProjectsContext } from './context'
import { ProjectDetails } from './ProjectDetails'
import ProjectList from './ProjectList'
import $projects from './projects.gql'
import reducer from './reducer'
import { IProjectsParams, ProjectsQueryResult, ProjectsView } from './types'

export const Projects: FunctionComponent = () => {
  const { t } = useTranslation()
  const { user } = useContext(AppContext)
  const history = useHistory()
  const params = useParams<IProjectsParams>()
  const [state, dispatch] = useReducer(reducer, {
    view: params.view,
    projects: [],
    outlookCategories: []
  })
  const query = useQuery<ProjectsQueryResult>(
    $projects,
    {
      variables: { sortBy: 'name' },
      fetchPolicy: 'cache-and-network'
    }
  )

  useEffect(() => dispatch({ type: 'DATA_UPDATED', query }), [query])

  const context: IProjectsContext = useMemo(
    () => ({
      state,
      dispatch,
      refetch: query.refetch,
    }),
    [state]
  )

  useEffect(() => {
    const _selected = find(state.projects, (p) => p.id === (params.key || '').toUpperCase())
    if (_selected) {
      dispatch({ type: 'SET_SELECTED_PROJECT', project: _selected })
    }
  }, [params.key, state.projects])

  return (
    <ProjectsContext.Provider value={context}>
      <Pivot
        selectedKey={state.view}
        onLinkClick={(item) => dispatch({
          type: 'CHANGE_VIEW',
          view: item.props.itemKey as ProjectsView,
          history
        })}
        styles={{ itemContainer: { paddingTop: 10 } }}>
        <PivotItem itemID='search' itemKey='search' headerText={t('common.search')} itemIcon='FabricFolderSearch'>
          <UserMessage hidden={!query.error} type={MessageBarType.error} text={t('common.genericErrorText')} />
          <div hidden={!!query.error}>
            <ProjectList
              enableShimmer={query.loading}
              items={state.projects}
              searchBox={{
                placeholder: t('common.searchPlaceholder'),
                onChange: () => dispatch({ type: 'SET_SELECTED_PROJECT', project: null })
              }}
              selection={{
                mode: SelectionMode.single,
                onChanged: (selected) => {
                  selected &&
                    history.push(['/projects', params.view || 'search', selected.id].filter((p) => p).join('/'))
                  dispatch({ type: 'SET_SELECTED_PROJECT', project: selected })
                }
              }}
              height={state.selected && 400}
            />
            {state.selected && <ProjectDetails />}
          </div>
        </PivotItem>
        <PivotItem itemID='my' itemKey='my' headerText={t('projects.myProjectsText')} itemIcon='FabricUserFolder'>
          <UserMessage hidden={!query.error} type={MessageBarType.error} text={t('common.genericErrorText')} />
          <div hidden={!!query.error}>
            <UserMessage
              containerStyle={{ marginBottom: 12 }}
              iconName='OutlookLogoInverse'
              text={t('projects.outlookCategoryInfoText')}
            />
            <ProjectList
              enableShimmer={query.loading}
              items={state.projects.filter((p) => !!p.outlookCategory)}
              searchBox={{
                placeholder: t('projects.myProjectsSearchPlaceholder'),
                onChange: () => dispatch({ type: 'SET_SELECTED_PROJECT', project: null })
              }}
              selection={{
                mode: SelectionMode.single,
                onChanged: (selected) => dispatch({ type: 'SET_SELECTED_PROJECT', project: selected })
              }}
              height={state.selected && 400}
              groups={{ fieldName: 'customer.name' }}
              hideColumns={['customer']}
            />
            {state.selected && <ProjectDetails />}
          </div>
        </PivotItem>
        {user.hasPermission(PERMISSION.MANAGE_PROJECTS) && (
          <PivotItem itemID='new' itemKey='new' headerText={t('projects.createNewText')} itemIcon='AddTo'>
            <ProjectForm />
          </PivotItem>
        )}
      </Pivot>
    </ProjectsContext.Provider>
  )
}

export { ProjectList, ProjectDetails, ProjectForm }
