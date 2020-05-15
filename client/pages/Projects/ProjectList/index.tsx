import List from 'components/List';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { withDefaultProps } from 'with-default-props';
import columns from './columns';
import { IProjectListProps } from './IProjectListProps';

/**
 * @category ProjectList
 */
const ProjectList = (props: IProjectListProps) => {
    const { t } = useTranslation(['PROJECTS', 'COMMON']);
    const [items, setItems] = React.useState([...props.items]);

    const onToggleInactive = (checked?: boolean) => {
        setItems([...props.items].filter(project => checked ? true : !project.inactive));
    }

    React.useEffect(() => setItems([...props.items].filter(p => !p.inactive)), [props.items]);

    return (
        <List
            {...props}
            items={items}
            columns={columns(props.hideColumns, t)}
            groups={props.groups}
            commandBar={{
                items: [
                    {
                        key: 'TOGGLE_INACTIVE',
                        onRender: () => (
                            <Checkbox
                                styles={{ root: { margin: '6px 0 0 8px' } }}
                                label={t('TOGGLE_INACTIVE_TEXT', { ns: 'COMMON' })}
                                onChange={(_event, checked) => onToggleInactive(checked)} />
                        ),
                    }
                ],
                farItems: []
            }} />
    );
}

export default withDefaultProps(ProjectList, { hideColumns: [] })
