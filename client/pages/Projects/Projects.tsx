import { useQuery } from '@apollo/react-hooks';
import { UserMessage } from 'components/UserMessage';
import { value as value } from 'helpers';
import { IOutlookCategory, IProject } from 'interfaces';
import { SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { CreateProjectForm } from 'pages/Projects/CreateProjectForm';
import * as React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import _ from 'underscore';
import { ProjectDetails } from './ProjectDetails';
import ProjectList from './ProjectList';
import { GET_PROJECTS, IGetProjectsData } from './types';

/**
 * @category Projects
 */
export const Projects = () => {
    const { t } = useTranslation(['COMMON', 'PROJECTS']);
    const params = useParams<{ key: string }>();
    const [selected, setSelected] = useState<IProject>(null);
    const { loading, error, data } = useQuery<IGetProjectsData>(GET_PROJECTS, { variables: { sortBy: 'name' }, fetchPolicy: 'cache-first' });

    const outlookCategories = value<IOutlookCategory[]>(data, 'outlookCategories', []);
    const projects = value<IProject[]>(data, 'projects', []).map(p => ({ ...p, outlookCategory: _.find(outlookCategories, c => c.displayName === p.key) }))

    React.useEffect(() => {
        if (!selected && params.key) {
            const _selected = _.find(projects, p => p.id === params.key.toUpperCase());
            setSelected(_selected);
        }
    }, [params.key, projects]);

    return (
        <Pivot styles={{ itemContainer: { paddingTop: 10 } }}>
            <PivotItem
                itemID='search'
                itemKey='search'
                headerText={t('SEARCH_TEXT')}
                itemIcon='FabricFolderSearch'>
                {error
                    ? <UserMessage type={MessageBarType.error} text={t('GENERIC_ERROR_TEXT')} />
                    : (
                        <>
                            <ProjectList
                                enableShimmer={loading}
                                items={projects}
                                searchBox={{ placeholder: t('SEARCH_PLACEHOLDER') }}
                                selection={{
                                    mode: SelectionMode.single,
                                    onChanged: selected => setSelected(selected),
                                }}
                                height={selected && 400} />
                            {selected && <ProjectDetails project={selected} />}
                        </>
                    )}
            </PivotItem>
            <PivotItem
                itemID='myprojects'
                itemKey='myprojects'
                headerText={t('MY_PROJECTS_TEXT')}
                itemIcon='FabricUserFolder'>
                {error
                    ? <UserMessage type={MessageBarType.error} text={t('GENERIC_ERROR_TEXT')} />
                    : (
                        <>
                            <UserMessage containerStyle={{ marginBottom: 12 }} iconName='OutlookLogoInverse' text={t('OUTLOOK_CATEGORY_INFO_TEXT')} />
                            <ProjectList
                                enableShimmer={loading}
                                items={projects.filter(p => !!p.outlookCategory)}
                                searchBox={{ placeholder: t('MY_PROJECTS_SEARCH_PLACEHOLDER') }}
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
            <PivotItem
                itemID='new'
                itemKey='new'
                headerText={t('CREATE_NEW_TEXT')}
                itemIcon='AddTo'>
                <CreateProjectForm />
            </PivotItem>
        </Pivot >
    );
}

export { ProjectList, GET_PROJECTS };

