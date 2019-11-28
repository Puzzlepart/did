import { ConstrainMode, DetailsListLayoutMode, IColumn, IDetailsHeaderProps, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { ScrollablePane, ScrollbarVisibility } from 'office-ui-fabric-react/lib/ScrollablePane';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { ShimmeredDetailsList } from 'office-ui-fabric-react/lib/ShimmeredDetailsList';
import { Sticky, StickyPositionType } from 'office-ui-fabric-react/lib/Sticky';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { IRenderFunction } from 'office-ui-fabric-react/lib/Utilities';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { IProjectListProps } from './IProjectListProps';

export const ProjectList = ({ projects, search, selection, enableShimmer, height, renderLink }: IProjectListProps) => {
    let searchTimeout: any;
    let [filteredProjects, setProjects] = useState(projects);

    useEffect(() => setProjects(projects), [projects]);

    /**
     * Handles a search
     * 
     * Filters the project by looking for matches in key or name
     * 
     * @param {any} _event Event (not used)
     * @param {string} searchTerm The new search term
     */
    const onSearch = (_event: any, searchTerm: string) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            setProjects(projects.filter(p => [p.name, p.key].join('').toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1));
        }, 250);
    }

    const onRenderDetailsHeader = (props: IDetailsHeaderProps, render: IRenderFunction<IDetailsHeaderProps>) => {
        return (
            <Sticky stickyPosition={StickyPositionType.Header} isScrollSynced={true}>
                {search && <SearchBox {...search} onChange={onSearch} />}
                {render(props)}
            </Sticky>
        );
    }

    const columns: IColumn[] = [
        {
            key: 'icon',
            fieldName: 'icon',
            name: '',
            minWidth: 100,
            maxWidth: 100,
            onRender: item => {
                return <Icon iconName={item.icon || 'Page'} styles={{ root: { fontSize: 16 } }} />;
            }
        },
        {
            key: 'key',
            fieldName: 'key',
            name: 'Key',
            minWidth: 100,
            maxWidth: 100,
        },
        {
            key: 'name',
            fieldName: 'name',
            name: 'Name',
            minWidth: 100,
            onRender: item => renderLink ? <a href={`/projects?key=${item.key}`}>{item.name}</a> : item.name,
        }
    ];

    return (
        <div style={{ position: 'relative', height }}>
            <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto} styles={{ contentContainer: { overflowX: 'hidden' } }}>
                <ShimmeredDetailsList
                    enableShimmer={enableShimmer}
                    selection={selection}
                    columns={columns}
                    items={filteredProjects}
                    selectionMode={selection ? SelectionMode.single : SelectionMode.none}
                    constrainMode={ConstrainMode.horizontalConstrained}
                    layoutMode={DetailsListLayoutMode.justified}
                    onRenderDetailsHeader={onRenderDetailsHeader} />
            </ScrollablePane>
        </div>
    );

}
