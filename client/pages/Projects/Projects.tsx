import { useQuery } from '@apollo/react-hooks'
import { AppContext } from 'AppContext'
import { UserMessage } from 'components/UserMessage'
import { manageProjects } from 'config/security/permissions'
import { IProject } from 'types'
import { SelectionMode } from 'office-ui-fabric-react/lib/DetailsList'
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot'
import { ProjectForm } from 'pages/Projects/ProjectForm'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'
import { find } from 'underscore'
import GET_PROJECTS from './GET_PROJECTS'
import { ProjectDetails } from './ProjectDetails'
import ProjectList from './ProjectList'
import { ProjectsContext } from './ProjectsContext'
import { IProjectsParams } from './types'

/**
 * @category Projects
 */
export const Projects = () => {
    const { t } = useTranslation()
    const { hasPermission } = useContext(AppContext)
    const history = useHistory()
    const params = useParams<IProjectsParams>()
    const [selected, setSelected] = useState<IProject>(null)
    const { loading, error, data, refetch } = useQuery<{ projects: any[]; outlookCategories: any[] }>(
        GET_PROJECTS,
        {
            variables: { sortBy: 'name' },
            fetchPolicy: 'cache-and-network'
        })

    const outlookCategories = useMemo(() => data?.outlookCategories || [], [data])

    const projects = useMemo(() => (data?.projects || []).map(p => ({
        ...p, outlookCategory: find(outlookCategories, c => c.displayName === p.id),
    })), [data])

    useEffect(() => {
        const _selected = find(projects, p => p.id === (params.key || '').toUpperCase())
        if (_selected) setSelected(_selected)
    }, [params.key, projects])

    function onPivotClick({ props: { itemKey } }: PivotItem) {
        setSelected(null)
        history.push(`/projects/${itemKey}`)
    }

    return (
        <ProjectsContext.Provider value={{ refetch }}>
            <Pivot
                selectedKey={params.view || 'search'}
                onLinkClick={onPivotClick}
                styles={{ itemContainer: { paddingTop: 10 } }}>
                <PivotItem
                    itemID='search'
                    itemKey='search'
                    headerText={t('common.search')}
                    itemIcon='FabricFolderSearch'>
                    {error
                        ? <UserMessage type={MessageBarType.error} text={t('common.genericErrorText')} />
                        : (
                            <>
                                <ProjectList
                                    enableShimmer={loading}
                                    items={projects}
                                    searchBox={{ placeholder: t('common.searchPlaceholder') }}
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
                            </>
                        )}
                </PivotItem>
                <PivotItem
                    itemID='my'
                    itemKey='my'
                    headerText={t('projects.myProjectsText')}
                    itemIcon='FabricUserFolder'>
                    {error
                        ? <UserMessage
                            type={MessageBarType.error}
                            text={t('common.genericErrorText')} />
                        : (
                            <>
                                <UserMessage
                                    containerStyle={{ marginBottom: 12 }}
                                    iconName='OutlookLogoInverse'
                                    text={t('projects.outlookCategoryInfoText')} />
                                <ProjectList
                                    enableShimmer={loading}
                                    items={projects.filter(p => !!p.outlookCategory)}
                                    searchBox={{ placeholder: t('projects.myProjectsSearchPlaceholder') }}
                                    selection={{
                                        mode: SelectionMode.single,
                                        onChanged: selected => setSelected(selected),
                                    }}
                                    height={selected && 400}
                                    groups={{ fieldName: 'customer.name' }}
                                    hideColumns={['customer']} />
                                {selected && <ProjectDetails project={selected} />}
                            </>
                        )}
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

export { ProjectList, GET_PROJECTS }

