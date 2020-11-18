import { useQuery } from '@apollo/client'
import { AppContext } from 'AppContext'
import { UserMessage } from 'components/UserMessage'
import { PERMISSION } from 'config/security/permissions'
import { MessageBarType, Pivot, PivotItem, SelectionMode } from 'office-ui-fabric'
import { ProjectForm } from 'pages/Projects/ProjectForm'
import React, { FunctionComponent, useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'
import { Project } from 'types'
import { find } from 'underscore'
import { IProjectsContext, ProjectsContext } from './context'
import { ProjectDetails } from './ProjectDetails'
import ProjectList from './ProjectList'
import $projects from './projects.gql'
import { IProjectsParams, ProjectsQueryResult } from './types'

export const Projects: FunctionComponent = () => {
  const { t } = useTranslation()
  const { user } = useContext(AppContext)
  const history = useHistory()
  const params = useParams<IProjectsParams>()
  const [selected, setSelected] = useState<Project>(null)
  const { loading, error, data, refetch } = useQuery<ProjectsQueryResult>(
    $projects,
    {
      variables: { sortBy: 'name' },
      fetchPolicy: 'cache-and-network'
    }
  )

  const context: IProjectsContext = useMemo(
    () => ({
      outlookCategories: data?.outlookCategories || [],
      projects: (data?.projects || []).map((p) => ({
        ...p,
        outlookCategory: find(data?.outlookCategories || [], (c) => c.displayName === p.id)
      })),
      refetch,
      setSelected
    }),
    [data]
  )

  useEffect(() => {
    const _selected = find(context.projects, (p) => p.id === (params.key || '').toUpperCase())
    if (_selected) setSelected(_selected)
  }, [params.key, context.projects])

  function onPivotClick({ props }: PivotItem) {
    setSelected(null)
    history.push(`/projects/${props.itemKey}`)
  }

  return (
    <ProjectsContext.Provider value={context}>
      <Pivot
        selectedKey={params.view || 'search'}
        onLinkClick={onPivotClick}
        styles={{ itemContainer: { paddingTop: 10 } }}>
        <PivotItem itemID='search' itemKey='search' headerText={t('common.search')} itemIcon='FabricFolderSearch'>
          <UserMessage hidden={!error} type={MessageBarType.error} text={t('common.genericErrorText')} />
          <div hidden={!!error}>
            <ProjectList
              enableShimmer={loading}
              items={context.projects}
              searchBox={{
                placeholder: t('common.searchPlaceholder'),
                onChange: () => setSelected(null)
              }}
              selection={{
                mode: SelectionMode.single,
                onChanged: (selected) => {
                  selected &&
                    history.push(['/projects', params.view || 'search', selected.id].filter((p) => p).join('/'))
                  setSelected(selected)
                }
              }}
              height={selected && 400}
            />
            {selected && <ProjectDetails project={selected} />}
          </div>
        </PivotItem>
        <PivotItem itemID='my' itemKey='my' headerText={t('projects.myProjectsText')} itemIcon='FabricUserFolder'>
          <UserMessage hidden={!error} type={MessageBarType.error} text={t('common.genericErrorText')} />
          <div hidden={!!error}>
            <UserMessage
              containerStyle={{ marginBottom: 12 }}
              iconName='OutlookLogoInverse'
              text={t('projects.outlookCategoryInfoText')}
            />
            <ProjectList
              enableShimmer={loading}
              items={context.projects.filter((p) => !!p.outlookCategory)}
              searchBox={{
                placeholder: t('projects.myProjectsSearchPlaceholder'),
                onChange: () => setSelected(null)
              }}
              selection={{
                mode: SelectionMode.single,
                onChanged: (selected) => setSelected(selected)
              }}
              height={selected && 400}
              groups={{ fieldName: 'customer.name' }}
              hideColumns={['customer']}
            />
            {selected && <ProjectDetails project={selected} />}
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
