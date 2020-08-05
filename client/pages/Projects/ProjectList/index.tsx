import List from 'components/List'
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { withDefaultProps } from 'with-default-props'
import columns from './columns'
import { IProjectListProps } from './IProjectListProps'

/**
 * @category ProjectList
 */
const ProjectList = (props: IProjectListProps) => {
    const { t } = useTranslation(['projects', 'common'])
    const [items, setItems] = useState([...props.items])

    const onToggleInactive = (checked?: boolean) => {
        setItems([...props.items].filter(project => checked ? true : !project.inactive))
    }

    useEffect(() => setItems([...props.items].filter(p => !p.inactive)), [props.items])

    return (
        <List
            {...props}
            items={items}
            columns={columns(props.hideColumns, t)}
            groups={props.groups}
            selection={props.selection}
            commandBar={{
                items: [
                    {
                        key: 'TOGGLE_INACTIVE',
                        onRender: () => (
                            <Checkbox
                                styles={{ root: { margin: '6px 0 0 8px' } }}
                                label={t('toggleInactiveText', { ns: 'common' })}
                                onChange={(_event, checked) => onToggleInactive(checked)} />
                        ),
                    }
                ],
                farItems: []
            }} />
    )
}

export default withDefaultProps(ProjectList, { hideColumns: [] })
