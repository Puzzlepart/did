import { useQuery } from '@apollo/react-hooks';
import { SelectionMode } from 'components/List';
import { getValueTyped as value } from 'helpers';
import { IProject } from 'interfaces';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import * as React from 'react';
import { useState } from 'react';
import { getHash } from 'utils/getHash';
import { GET_PROJECTS, IGetProjectsEntries } from './GET_PROJECTS';
import { ProjectDetails } from './ProjectDetails';
import { ProjectList } from './ProjectList';
import { CreateProjectForm } from 'components/Projects/CreateProjectForm';

/**
 * @component Projects
 * @description 
 */
export const Projects = () => {
    const [selected, setSelected] = useState<IProject>(null);
    const { loading, error, data } = useQuery<IGetProjectsEntries>(GET_PROJECTS, { variables: { sortBy: 'name' }, fetchPolicy: 'cache-first' });

    let projects = value<IProject[]>(data, 'projects', []);

    if (getHash()) {
        let [_selected] = projects.filter(c => c.id === getHash());
        if (_selected && !selected) setSelected(_selected);
    }

    return (
        <Pivot styles={{ itemContainer: { paddingTop: 10 } }}>
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