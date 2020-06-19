import { useQuery } from '@apollo/react-hooks'
import { AppContext } from 'AppContext'
import { UserMessage } from 'components/UserMessage'
import { manageProjects } from 'config/security/permissions'
import { value } from 'helpers'
import { IOutlookCategory, IProject } from 'interfaces'
import { SelectionMode } from 'office-ui-fabric-react/lib/DetailsList'
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot'
import { CreateProjectForm } from 'pages/Projects/CreateProjectForm'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'
import { contains, find } from 'underscore'
import { ProjectDetails } from './ProjectDetails'
import ProjectList from './ProjectList'
import { GET_PROJECTS, IGetProjectsData, IProjectsParams } from './types'

/**
 * @category Projects
 */
export const Projects = () => {
    const { t } = useTranslation(['projects', 'common'])
    const history = useHistory()
    const { user } = useContext(AppContext)
    const params = useParams<IProjectsParams>()
    const [selected, setSelected] = useState<IProject>(null)
    const { loading, error, data } = useQuery<IGetProjectsData>(GET_PROJECTS, { variables: { sortBy: 'name' }, fetchPolicy: 'cache-first' })

    const outlookCategories = value<IOutlookCategory[]>(data, 'outlookCategories', [])
    const projects = value<IProject[]>(data, 'projects', []).map(p => ({
        ...p, outlookCategory: find(outlookCategories, c => c.displayName === p.key),
    }))

    useEffect(() => {
        if (!selected && params.key) {
            const _selected = find(projects, p => p.id === params.key.toUpperCase())
            setSelected(_selected)
        }
    }, [params.key, projects])

    function onChangeTab({ props }: PivotItem) {
        setSelected(null)
        history.push(`/projects/${props.itemKey}`)
    }

    return (
        <Pivot
            defaultSelectedKey={params.view}
            onLinkClick={onChangeTab}
            styles={{ itemContainer: { paddingTop: 10 } }}>
            <PivotItem
                itemID='search'
                itemKey='search'
                headerText={t('search', { ns: 'common' })}
                itemIcon='FabricFolderSearch'>
                {error
                    ? <UserMessage type={MessageBarType.error} text={t('genericErrorText')} />
                    : (
                        <>
                            <ProjectList
                                enableShimmer={loading}
                                items={projects}
                                searchBox={{ placeholder: t('searchPlaceholder') }}
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
                headerText={t('myProjectsText')}
                itemIcon='FabricUserFolder'>
                {error
                    ? <UserMessage
                        type={MessageBarType.error}
                        text={t('genericErrorText', { ns: 'common' })} />
                    : (
                        <>
                            <UserMessage
                                containerStyle={{ marginBottom: 12 }}
                                iconName='OutlookLogoInverse'
                                text={t('outlookCategoryInfoText')} />
                            <ProjectList
                                enableShimmer={loading}
                                items={projects.filter(p => !!p.outlookCategory)}
                                searchBox={{ placeholder: t('myProjectsSearchPlaceholder') }}
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
            {contains(user.role.permissions, manageProjects) && (
                <PivotItem
                    itemID='new'
                    itemKey='new'
                    headerText={t('createNewText', { ns: 'common' })}
                    itemIcon='AddTo'>
                    <CreateProjectForm />
                </PivotItem>
            )}
        </Pivot >
    )
}

export { ProjectList, GET_PROJECTS }

