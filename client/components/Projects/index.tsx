import { useQuery } from '@apollo/react-hooks';
import { SelectionMode } from 'common/components/List';
import { CreateProjectForm } from 'components/Projects/CreateProjectForm';
import { getValueTyped as value } from 'helpers';
import { IOutlookCategory, IProject } from 'interfaces';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import * as React from 'react';
import { useState } from 'react';
import _ from 'underscore';
import { getHash } from 'utils/getHash';
import { GET_PROJECTS, IGetProjectsEntries } from './GET_PROJECTS';
import { ProjectDetails } from './ProjectDetails';
import ProjectList from './ProjectList';
import resource from 'i18n';

/**
 * @category Projects
 */
function getPath(): string[] {
    let [, path] = document.location.hash.substring(1).split('=');
    return (path || '').split('/');
}

/**
 * @category Projects
 */
export const Projects = () => {
    const [selected, setSelected] = useState<IProject>(null);
    const { loading, error, data } = useQuery<IGetProjectsEntries>(GET_PROJECTS, { variables: { sortBy: 'name' }, fetchPolicy: 'cache-first' });

    const outlookCategories = value<IOutlookCategory[]>(data, 'outlookCategories', []);
    const projects = value<IProject[]>(data, 'projects', []).map(p => ({ ...p, outlookCategory: _.find(outlookCategories, c => c.displayName === p.key) }))

    const path = getPath();
    const onLinkClick = (item: PivotItem) => document.location.hash = `#path=${item.props.itemID}`;

    if (getHash()) {
        let [_selected] = projects.filter(c => c.id === getHash());
        if (_selected && !selected) setSelected(_selected);
    }

    return (
        <Pivot
            styles={{ itemContainer: { paddingTop: 10 } }}
            onLinkClick={onLinkClick}
            defaultSelectedKey={path[0]}>
            <PivotItem itemID='search' itemKey='search' headerText={resource('COMMON.SEARCH_TEXT')} itemIcon='FabricFolderSearch'>
                {error && <MessageBar messageBarType={MessageBarType.error}>{resource('COMMON.GENERIC_ERROR_TEXT')}</MessageBar>}
                {!error && (
                    <ProjectList
                        enableShimmer={loading}
                        items={projects}
                        searchBox={{ placeholder: resource('COMMON.SEARCH_PLACEHOLDER') }}
                        selection={{ mode: SelectionMode.single, onChanged: selected => setSelected(selected) }}
                        height={selected && 400} />
                )}
                {selected && <ProjectDetails project={selected} />}
            </PivotItem>
            <PivotItem itemID='myprojects' itemKey='myprojects' headerText={resource('PROJECTS.MY_PROJECTS_TEXT')} itemIcon='FabricUserFolder'>
                <MessageBar styles={{ root: { marginBottom: 12 } }} messageBarIconProps={{ iconName: 'OutlookLogoInverse' }}>{resource('PROJECTS.OUTLOOK_CATEGORY_INFO_TEXT')}</MessageBar>
                {error && <MessageBar messageBarType={MessageBarType.error}>{resource('COMMON.GENERIC_ERROR_TEXT')}</MessageBar>}
                {!error && (
                    <ProjectList
                        enableShimmer={loading}
                        items={projects.filter(p => !!p.outlookCategory)}
                        searchBox={{ placeholder: resource('PROJECTS.MY_PROJECTS_SEARCH_PLACEHOLDER') }}
                        selection={{ mode: SelectionMode.single, onChanged: selected => setSelected(selected) }}
                        height={selected && 400}
                        groups={{ fieldName: 'customer.name' }}
                        hideColumns={['customer']} />
                )}
                {selected && <ProjectDetails project={selected} />}
            </PivotItem>
            <PivotItem itemID='new' itemKey='new' headerText={resource('COMMON.CREATE_NEW_TEXT')} itemIcon='AddTo'>
                <CreateProjectForm />
            </PivotItem>
        </Pivot >
    );
}

export { ProjectList, GET_PROJECTS };