import { EntityLabel } from 'components/EntityLabel';
import resource from 'i18n';
import { IProject } from 'interfaces';
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { generateColumn as col } from 'utils/generateColumn';


/**
 * Generate column definitions based on parameters specified
 * 
 * @param {string[]} hideColumns Columns to hide
 * 
 * @category ProjectList
 */
export default (hideColumns: string[]): IColumn[] => ([
    col(
        'icon',
        '',
        { maxWidth: 35, minWidth: 35 },
        (project: IProject) => {
            if (project.inactive) {
                return <Icon title={resource('PROJECTS.PROJECT_INACTIVE_TEXT')} iconName='Warning' styles={{ root: { fontSize: 16, color: '#ffbf00' } }} />;
            }
            return <Icon iconName={project.icon || 'Page'} styles={{ root: { fontSize: 16 } }} />;
        },
    ),
    col('key', resource('COMMON.KEY_LABEL'), { maxWidth: 120 }),
    col(
        'name',
        resource('COMMON.NAME_LABEL'),
        { maxWidth: 220 },
        (project: IProject) => <Link to={`/projects/${project.id}`}>{project.name}</Link>
    ),
    col(
        'customer',
        'Customer',
        { maxWidth: 220 },
        (project: IProject) => {
            if (!project.customer) return null;
            return <Link to={`/customers/${project.customer.id}`}>{project.customer.name}</Link>;
        }
    ),
    col(
        'labels',
        '',
        {},
        (project: IProject) => project.labels.map((label, idx) => (
            <EntityLabel key={idx} {...label} />
        )),
    )
].filter(col => hideColumns.indexOf(col.key) === -1))