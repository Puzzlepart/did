import { useQuery } from '@apollo/client'
import { AppContext } from 'AppContext'
import { UserMessage } from 'components/UserMessage'
import { manageProjects } from 'config/security/permissions'
import { SelectionMode } from 'office-ui-fabric-react/lib/DetailsList'
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot'
import { ProjectForm } from 'pages/Projects/ProjectForm'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'
import { OutlookCategory, Project } from 'types'
import { find } from 'underscore'
import { IProjectsContext, ProjectsContext } from './context'
import { GET_PROJECTS } from './graphql'
import { ProjectDetails } from './ProjectDetails'
import ProjectList from './ProjectList'
import { IProjectsParams } from './types'

export const Projects: React.FunctionComponent = () => {
    const { t } = useTranslation()
    const { hasPermission } = useContext(AppContext)
    const history = useHistory()
    const params = useParams<IProjectsParams>()
    const [selected, setSelected] = useState<Project>(null)
    const { loading, error, data, refetch } = useQuery<{ projects: Project[]; outlookCategories: OutlookCategory[] }>(
        GET_PROJECTS,
        {
            variables: { sortBy: 'name' },
            fetchPolicy: 'cache-and-network'
        })
        
    const context: IProjectsContext = useMemo(() => ({
        outlookCategories: data?.outlookCategories || [],
        projects: (data?.projects || []).map(p => ({
            ...p, 
            outlookCategory: find(data?.outlookCategories || [], c => c.displayName === p.id),
        })),
        refetch,
        setSelected,
    }), [data])

    useEffect(() => {
        const _selected = find(context.projects, p => p.id === (params.key || '').toUpperCase())
        if (_selected) setSelected(_selected)
    }, [params.key, context.projects])

    function onPivotClick({ props: { itemKey } }: PivotItem) {
        setSelected(null)
        history.push(`/projects/${itemKey}`)
    }

    return (
        <ProjectsContext.Provider value={context}>
            <Pivot
                selectedKey={params.view || 'search'}
                onLinkClick={onPivotClick}
                styles={{ itemContainer: { paddingTop: 10 } }}>
                <PivotItem
                    itemID='search'
                    itemKey='search'
                    headerText={t('common.search')}
                    itemIcon='FabricFolderSearch'>
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
                                onChanged: selected => {
                                    selected && history.push([
                                        '/projects',
                                        params.view || 'search',
                                        selected.id
                                    ].filter(p => p).join('/'))
                                    setSelected(selected)
                                },
                            }}
                            height={selected && 400} />
                        {selected && <ProjectDetails project={selected} />}
                    </div>
                </PivotItem>
                <PivotItem
                    itemID='my'
                    itemKey='my'
                    headerText={t('projects.myProjectsText')}
                    itemIcon='FabricUserFolder'>
                    <UserMessage hidden={!error} type={MessageBarType.error} text={t('common.genericErrorText')} />
                    <div hidden={!!error}>
                        <UserMessage
                            containerStyle={{ marginBottom: 12 }}
                            iconName='OutlookLogoInverse'
                            text={t('projects.outlookCategoryInfoText')} />
                        <ProjectList
                            enableShimmer={loading}
                            items={context.projects.filter(p => !!p.outlookCategory)}
                            searchBox={{
                                placeholder: t('projects.myProjectsSearchPlaceholder'),
                                onChange: () => setSelected(null)
                            }}
                            selection={{
                                mode: SelectionMode.single,
                                onChanged: selected => setSelected(selected),
                            }}
                            height={selected && 400}
                            groups={{ fieldName: 'customer.name' }}
                            hideColumns={['customer']} />
                        {selected && <ProjectDetails project={selected} />}
                    </div>
                </PivotItem>
                {hasPermission(manageProjects) && (
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
