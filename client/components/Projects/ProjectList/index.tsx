import { IColumn, List } from 'components/List';
import { IProject } from 'interfaces';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import * as React from 'react';
import { generateColumn as col } from 'utils/generateColumn';
import { IProjectListProps } from './IProjectListProps';
import { EntityLabel } from 'components/EntityLabel';

/**
 * @component ProjectList
 * @description 
 */
export const ProjectList = (props: IProjectListProps) => {
    const columns: IColumn[] = [
        col(
            'icon',
            '',
            { maxWidth: 35, minWidth: 35 },
            (project: IProject) => <Icon iconName={project.icon || 'Page'} styles={{ root: { fontSize: 16 } }} />,
        ),
        col('key', 'Key', { maxWidth: 120 }),
        col(
            'name',
            'Name',
            { maxWidth: 180 },
            (project: IProject) => props.renderLink ? <a href={`/projects#${project.id}`}>{project.name}</a> : project.name
        ),
        col(
            'customer',
            'Customer',
            { maxWidth: 150 },
            (project: IProject) => {
                if (!project.customer) return null;
                return props.renderLink ? <a href={`/customers#${project.customer.id}`}>{project.customer.name}</a> : project.customer.name;
            }
        ),
        col(
            'labels',
            '',
            {},
            (project: IProject) => {
                if (!project.labels) return null;
                return project.labels.map(label => <EntityLabel {...label} />)
            }
        )
    ];

    return <List {...props} columns={columns} />;

}
