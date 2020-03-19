import { useQuery } from '@apollo/react-hooks';
import { SelectionMode } from 'components/List';
import { CreateProjectForm } from 'components/Projects/CreateProjectForm';
import { getValueTyped as value } from 'helpers';
import { IProject, IOutlookCategory } from 'interfaces';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import * as React from 'react';
import { useState } from 'react';
import { GET_PROJECTS, IGetProjectsEntries } from './GET_PROJECTS';
import { ProjectDetails } from './ProjectDetails';
import { ProjectList } from './ProjectList';
import { getHash } from 'utils/getHash';
import _ from 'underscore';

function getPath(): string[] {
    let [, path] = document.location.hash.substring(1).split('=');
    return (path || '').split('/');
}

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
            <PivotItem itemID='search' itemKey='search' headerText='Search' itemIcon='FabricFolderSearch'>
                {error && <MessageBar messageBarType={MessageBarType.error}>An error occured.</MessageBar>}
                {!error && (
                    <ProjectList
                        enableShimmer={loading}
                        items={projects}
                        searchBox={{ placeholder: 'Search...' }}
                        selection={{ mode: SelectionMode.single, onChanged: selected => setSelected(selected) }}
                        height={selected && 400} />
                )}
                {selected && <ProjectDetails project={selected} />}
            </PivotItem>
            <PivotItem itemID='myprojects' itemKey='myprojects' headerText='My projects' itemIcon='FabricUserFolder'>
                <MessageBar styles={{ root: { marginBottom: 12 } }} messageBarIconProps={{ iconName: 'OutlookLogoInverse' }}>Here you can see the projects that have a corresponding category in Outlook.</MessageBar>
                {error && <MessageBar messageBarType={MessageBarType.error}>An error occured.</MessageBar>}
                {!error && (
                    <ProjectList
                        enableShimmer={loading}
                        items={projects.filter(p => !!p.outlookCategory)}
                        searchBox={{ placeholder: 'Search my projects...' }}
                        selection={{ mode: SelectionMode.single, onChanged: selected => setSelected(selected) }}
                        height={selected && 400}
                        groups={{ fieldName: 'customer.name' }}
                        hideColumns={['customer']} />
                )}
                {selected && <ProjectDetails project={selected} />}
            </PivotItem>
            <PivotItem itemID='new' itemKey='new' headerText='Create new' itemIcon='AddTo'>
                <CreateProjectForm />
            </PivotItem>
        </Pivot >
    );
}