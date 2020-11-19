import { useQuery } from '@apollo/client'
import { AppContext } from 'AppContext'
import { UserMessage } from 'components/UserMessage'
import { PERMISSION } from 'config/security/permissions'
import { MessageBarType, Pivot, PivotItem, SelectionMode } from 'office-ui-fabric'
import { ProjectForm } from 'pages/Projects/ProjectForm'
import React, { FunctionComponent, useContext, useEffect, useMemo, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'
import { contains } from 'underscore'
import { IProjectsContext, ProjectsContext } from './context'
import { ProjectDetails } from './ProjectDetails'
import ProjectList from './ProjectList'
import { IProjectListProps } from './ProjectList/types'
import $projects from './projects.gql'
import reducer from './reducer'
import { IProjectsParams, IProjectsState, ProjectsQueryResult, ProjectsView } from './types'

/**
 * Initialize state
 *
 * @param {IProjectsParams} params Params
 */
const initState = (params: IProjectsParams): IProjectsState => ({
  view: contains(['search', 'my', 'new'], params.view) ? params.view : 'search',
  detailsTab: params.detailsTab,
  projects: [],
  outlookCategories: []
})

export const Projects: FunctionComponent = () => {
  const { t } = useTranslation()
  const { user } = useContext(AppContext)
  const history = useHistory()
  const params = useParams<IProjectsParams>()
  const [state, dispatch] = useReducer(reducer(history), initState(params))
  const query = useQuery<ProjectsQueryResult>($projects, {
    variables: { sortBy: 'name' },
    fetchPolicy: 'cache-and-network'
  })

  useEffect(() => dispatch({ type: 'DATA_UPDATED', query, params }), [query])

  const context = useMemo<IProjectsContext>(
    () => ({
      state,
      dispatch,
      refetch: query.refetch
    }),
    [state]
  )

  const listProps = useMemo<IProjectListProps>(
    () => ({
      enableShimmer: query.loading,
      searchBox: {
        placeholder:
          state.view === 'my'
            ? t('projects.myProjectsSearchPlaceholder')
            : t('common.searchPlaceholder'),
        onChange: () => dispatch({ type: 'SET_SELECTED_PROJECT', project: null })
      },
      selection: {
        mode: SelectionMode.single,
        onChanged: (selected) => {
          dispatch({ type: 'SET_SELECTED_PROJECT', project: selected })
        }
      },
      height: state.selected && 400
    }),
    [state]
  )

  return (
    <ProjectsContext.Provider value={context}>
      <Pivot
        selectedKey={state.view}
        onLinkClick={({ props }) =>
          dispatch({
            type: 'CHANGE_VIEW',
            view: props.itemKey as ProjectsView
          })
        }
        styles={{ itemContainer: { paddingTop: 10 } }}>
        <PivotItem
          itemID='search'
          itemKey='search'
          headerText={t('common.search')}
          itemIcon='FabricFolderSearch'>
          <UserMessage
            hidden={!query.error}
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
            hidden={!query.error}
            type={MessageBarType.error}
            text={t('common.genericErrorText')}
          />
          <UserMessage
            containerStyle={{ marginBottom: 12 }}
            iconName='OutlookLogoInverse'
            text={t('projects.outlookCategoryInfoText')}
          />
          <ProjectList {...listProps} items={state.projects.filter((p) => !!p.outlookCategory)} />
          {state.selected && <ProjectDetails />}
        </PivotItem>
        {user.hasPermission(PERMISSION.MANAGE_PROJECTS) && (
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

export { ProjectList, ProjectDetails, ProjectForm }
