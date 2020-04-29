import List from 'common/components/List';
import resource from 'i18n';
import { IProject } from 'interfaces';
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import * as React from 'react';
import { generateColumn as col } from 'utils/generateColumn';
import { withDefaultProps } from 'with-default-props';
import { IProjectListProps } from './IProjectListProps';


/**
 * Generate column definitions based on parameters specified
 * 
 * @param {boolean} renderLink Render link
 * @param {string[]} hideColumns Columns to hide
 */
export const ProjectListColumns = (renderLink: boolean, hideColumns: string[]): IColumn[] => ([
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
    col('key', 'Key', { maxWidth: 120 }),
    col(
        'name',
        'Name',
        { maxWidth: 180 },
        (project: IProject) => renderLink ? <a href={`/projects#${project.id}`}>{project.name}</a> : project.name
    ),
    col(
        'customer',
        'Customer',
        {},
        (project: IProject) => {
            if (!project.customer) return null;
            return renderLink ? <a href={`/customers#${project.customer.id}`}>{project.customer.name}</a> : project.customer.name;
        }
    )
].filter(col => hideColumns.indexOf(col.key) === -1))

/**
 * @component ProjectList
 */
const ProjectList = (props: IProjectListProps) => {
    const [items, setItems] = React.useState([...props.items]);

    const onToggleInactive = (_event: React.MouseEvent<HTMLElement, MouseEvent>, checked?: boolean) => {
        setItems([...props.items].filter(p => checked ? true : !p.inactive));
    }

    React.useEffect(() => setItems([...props.items].filter(p => !p.inactive)), [props.items]);

    return (
        <List
            {...props}
            items={items}
            columns={ProjectListColumns(props.renderLink, props.hideColumns)}
            groups={props.groups}
            commandBar={{
                items: [
                    {
                        key: 'TOGGLE_INACTIVE',
                        onRender: () => (
                            <Toggle
                                styles={{ root: { margin: '6px 0 0 8px' } }}
                                offText={'Hide inactive'}
                                onText={'Show inactive'}
                                onChange={onToggleInactive} />
                        ),
                    }
                ],
                farItems: []
            }} />
    );
}

export default withDefaultProps(ProjectList, { hideColumns: [] })
