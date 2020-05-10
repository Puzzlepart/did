import List from 'components/List';
import resource from 'i18n';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import * as React from 'react';
import { withDefaultProps } from 'with-default-props';
import columns from './columns';
import { IProjectListProps } from './IProjectListProps';



/**
 * @category ProjectList
 */
const ProjectList = (props: IProjectListProps) => {
    const [items, setItems] = React.useState([...props.items]);

    const onToggleInactive = (checked?: boolean) => {
        setItems([...props.items].filter(project => checked ? true : !project.inactive));
    }

    React.useEffect(() => setItems([...props.items].filter(p => !p.inactive)), [props.items]);

    return (
        <List
            {...props}
            items={items}
            columns={columns(props.hideColumns)}
            groups={props.groups}
            commandBar={{
                items: [
                    {
                        key: 'TOGGLE_INACTIVE',
                        onRender: () => (
                            <Checkbox
                                styles={{ root: { margin: '6px 0 0 8px' } }}
                                label={resource('COMMON.TOGGLE_INACTIVE_TEXT')}
                                onChange={(_event, checked) => onToggleInactive(checked)} />
                        ),
                    }
                ],
                farItems: []
            }} />
    );
}

export default withDefaultProps(ProjectList, { hideColumns: [] })
