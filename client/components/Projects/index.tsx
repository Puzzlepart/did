import { useQuery } from '@apollo/react-hooks';
import { SelectionMode } from 'components/List';
import { CreateProjectForm } from 'components/Projects/CreateProjectForm';
import { getValueTyped as value } from 'helpers';
import { IProject } from 'interfaces';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import * as React from 'react';
import { useState } from 'react';
import { GET_PROJECTS, IGetProjectsEntries } from './GET_PROJECTS';
import { ProjectDetails } from './ProjectDetails';
import { ProjectList } from './ProjectList';
import { getHash } from 'utils/getHash';

function getPath(): string[] {
    let [, path] = document.location.hash.substring(1).split('=');
    return (path || '').split('/');
}

export const Projects = () => {
    const [selected, setSelected] = useState<IProject>(null);
    const { loading, error, data } = useQuery<IGetProjectsEntries>(GET_PROJECTS, { variables: { sortBy: 'name' }, fetchPolicy: 'cache-first' });

    let projects = value<IProject[]>(data, 'projects', []);

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
                        height={300}
                        enableShimmer={loading}
                        items={projects}
                        searchBox={{ placeholder: 'Search...' }}
                        selection={{ mode: SelectionMode.single, onChanged: selected => setSelected(selected) }} />
                )}
                {selected && <ProjectDetails project={selected} />}
            </PivotItem>
            <PivotItem itemID='new' itemKey='new' headerText='Create new' itemIcon='AddTo'>
                <CreateProjectForm />
            </PivotItem>
        </Pivot >
    );
}